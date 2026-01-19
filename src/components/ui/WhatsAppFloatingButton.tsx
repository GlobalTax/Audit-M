import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface ContextualMessage {
  pattern: RegExp;
  message: string;
}

const contextualMessages: ContextualMessage[] = [
  { pattern: /calculator|cost/, message: "Need help with your estimate?" },
  { pattern: /nie/, message: "Questions about NIE process?" },
  { pattern: /beckham/, message: "Ask about Beckham Law" },
  { pattern: /visa/, message: "Immigration questions?" },
  { pattern: /bank-account/, message: "Bank account help?" },
  { pattern: /payroll/, message: "Payroll questions?" },
  { pattern: /setup|company/, message: "Company setup help?" },
];

const getContextualMessage = (pathname: string): string => {
  for (const { pattern, message } of contextualMessages) {
    if (pattern.test(pathname)) {
      return message;
    }
  }
  return "Chat with us";
};

const getWhatsAppUrl = (pathname: string): string => {
  const baseUrl = "https://wa.me/34620273552";
  let text = "Hi, I'm interested in your international advisory services";
  
  if (pathname.includes("calculator")) {
    text = "Hi, I just used your setup calculator and have some questions";
  } else if (pathname.includes("nie")) {
    text = "Hi, I need help with the NIE application process";
  } else if (pathname.includes("beckham")) {
    text = "Hi, I'd like to know more about the Beckham Law regime";
  } else if (pathname.includes("visa")) {
    text = "Hi, I have questions about visa requirements for Spain";
  } else if (pathname.includes("bank-account")) {
    text = "Hi, I need help opening a business bank account in Spain";
  } else if (pathname.includes("payroll")) {
    text = "Hi, I'm interested in your payroll services";
  } else if (pathname.includes("setup") || pathname.includes("company")) {
    text = "Hi, I'd like to set up a company in Spain";
  }
  
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
};

export const WhatsAppFloatingButton = () => {
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const contextualMessage = getContextualMessage(location.pathname);
  const whatsAppUrl = getWhatsAppUrl(location.pathname);

  // Delay appearance by 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show tooltip briefly after button appears
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 3 seconds
        setTimeout(() => setShowTooltip(false), 3000);
      }, 1000);

      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  // Hide when sticky CTA is visible (check for sticky CTA element)
  useEffect(() => {
    const checkStickyCTA = () => {
      const stickyCTA = document.querySelector('[data-sticky-cta="true"]');
      if (stickyCTA) {
        const rect = stickyCTA.getBoundingClientRect();
        const isStickyCTAVisible = rect.top < window.innerHeight && rect.bottom > 0;
        // Don't hide completely, just reduce prominence on mobile when sticky CTA is visible
      }
    };

    window.addEventListener("scroll", checkStickyCTA);
    return () => window.removeEventListener("scroll", checkStickyCTA);
  }, []);

  const handleClick = () => {
    trackEvent("whatsapp_floating_click_global_nrro", {
      location: "floating_button",
      page: window.location.pathname,
      contextual_message: contextualMessage,
    });
  };

  if (!isVisible) return null;

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      
      {/* Pulse animation */}
      <span className="absolute -z-10 h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-30" />
      
      {/* Contextual tooltip - auto shows briefly, then on hover */}
      <span 
        className={`absolute right-16 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm text-background transition-opacity ${
          showTooltip ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {contextualMessage}
      </span>
    </a>
  );
};
