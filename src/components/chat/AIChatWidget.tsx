import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ChatMarkdownRenderer } from "./ChatMarkdownRenderer";
import { ChatActionButtons, extractActionButtons } from "./ChatActionButtons";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "How much does it cost to set up an SL?",
  "Compare SL vs SA for me",
  "Calculate Beckham Law savings for €100,000 salary",
  "What documents do I need for NIE?",
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { trackEvent } = useAnalytics();

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I'm your NRRO assistant with **real-time data access**. I can:\n\n• Calculate setup costs and timelines\n• Compare legal structures (SL, SA, Branch, Subsidiary)\n• Estimate Beckham Law tax savings\n• Explain NIE requirements\n\nWhat would you like to know?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Show email capture after 3 user messages
  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length >= 3 && !showEmailCapture && !email) {
      setShowEmailCapture(true);
    }
  }, [messages, showEmailCapture, email]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent("chatbot_opened_global_nrro", { location: "floating_widget" });
  };

  const handleClose = () => {
    setIsOpen(false);
    trackEvent("chatbot_closed_global_nrro", { 
      messages_count: messages.length,
      email_captured: !!email 
    });
  };

  const streamChat = useCallback(
    async (userMessage: string) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      let assistantContent = "";
      const assistantId = `assistant-${Date.now()}`;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              messages: [...messages, userMsg].map((m) => ({
                role: m.role,
                content: m.content,
              })),
            }),
          }
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Too many requests. Please wait a moment and try again.");
          }
          if (response.status === 402) {
            throw new Error("Service temporarily unavailable. Please try again later.");
          }
          throw new Error("Failed to get response");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        // Add empty assistant message
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineIndex).trim();
            buffer = buffer.slice(newlineIndex + 1);

            if (line.startsWith(":") || line === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: assistantContent } : m
                  )
                );
              }
            } catch {
              // Incomplete JSON, continue
            }
          }
        }

        trackEvent("chatbot_message_global_nrro", {
          user_message: userMessage.slice(0, 100),
          response_length: assistantContent.length,
          had_data: assistantContent.includes("€") || assistantContent.includes("|"),
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Sorry, something went wrong. Please try again.";
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== assistantId),
          {
            id: assistantId,
            role: "assistant",
            content: errorMessage,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, trackEvent]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    streamChat(message);
  };

  const handleSuggestionClick = (question: string) => {
    trackEvent("chatbot_suggestion_click_global_nrro", { question });
    streamChat(question);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    trackEvent("chatbot_email_captured_global_nrro", { email });
    setShowEmailCapture(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm shadow-lg"
            >
              <span className="text-foreground">Ask me for real estimates!</span>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 border-8 border-transparent border-l-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">NRRO Expert Assistant</h3>
                  <p className="text-xs text-white/70">Real-time data & estimates</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => {
                  const actionButtons = message.role === "assistant" 
                    ? extractActionButtons(message.content) 
                    : [];
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <>
                            <ChatMarkdownRenderer content={message.content} />
                            {actionButtons.length > 0 && message.content.length > 50 && (
                              <ChatActionButtons actions={actionButtons} />
                            )}
                          </>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && messages[messages.length - 1]?.content === "" && (
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Calculating...</span>
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        onClick={() => handleSuggestionClick(question)}
                        className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-muted hover:border-primary/30"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                {/* Email Capture */}
                {showEmailCapture && !email && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-primary/20 bg-primary/5 p-3"
                  >
                    <p className="mb-2 text-sm font-medium">
                      💡 Get a personalized report with these estimates?
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 text-sm"
                      />
                      <Button type="submit" size="sm">
                        Send
                      </Button>
                    </form>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about costs, timelines, taxes..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Powered by AI with real NRRO data
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
