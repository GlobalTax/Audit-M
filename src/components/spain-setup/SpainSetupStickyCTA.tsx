import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, X } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface SpainSetupStickyCTAProps {
  primaryText?: string;
  primaryUrl?: string;
  whatsappUrl?: string;
  scrollThreshold?: number;
}

export const SpainSetupStickyCTA = ({
  primaryText = 'Schedule Consultation',
  primaryUrl = '/contact?service=spain-setup',
  whatsappUrl = 'https://wa.me/34931222888',
  scrollThreshold = 0.3
}: SpainSetupStickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = scrollY / (documentHeight - windowHeight);
      
      // Show after scrollThreshold (30%), hide near footer (last 200px)
      const nearFooter = scrollY + windowHeight > documentHeight - 200;
      const pastThreshold = scrollPercentage >= scrollThreshold;
      
      const shouldShow = pastThreshold && !nearFooter && !isDismissed;
      
      if (shouldShow && !isVisible) {
        setIsVisible(true);
        trackEvent('sticky_cta_view_global_nrro');
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, isVisible, scrollThreshold, trackEvent]);

  const handleDismiss = () => {
    setIsDismissed(true);
    trackEvent('sticky_cta_dismiss_global_nrro');
  };

  const handlePrimaryClick = () => {
    trackEvent('sticky_cta_click_global_nrro', { cta_type: 'consultation' });
  };

  const handleWhatsAppClick = () => {
    trackEvent('sticky_cta_click_global_nrro', { cta_type: 'whatsapp' });
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 py-3">
            <Button 
              asChild 
              size="lg"
              onClick={handlePrimaryClick}
            >
              <a href={primaryUrl} className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">{primaryText}</span>
                <span className="sm:hidden">Book Call</span>
              </a>
            </Button>
            
            <Button 
              asChild 
              variant="outline"
              size="lg"
              onClick={handleWhatsAppClick}
            >
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="hidden md:inline">WhatsApp Us</span>
              </a>
            </Button>

            <button
              onClick={handleDismiss}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
