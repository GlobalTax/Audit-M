import { MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const WhatsAppFloatingButton = () => {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent("whatsapp_floating_click_global_nrro", {
      location: "floating_button",
      page: window.location.pathname,
    });
  };

  return (
    <a
      href="https://wa.me/34620273552?text=Hi,%20I'm%20interested%20in%20your%20international%20advisory%20services"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
      
      {/* Pulse animation */}
      <span className="absolute -z-10 h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-30" />
      
      {/* Tooltip */}
      <span className="absolute right-16 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm text-background opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
};
