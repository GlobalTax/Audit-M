import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewsletterPopup } from '@/hooks/useNewsletterPopup';
import { useAnalytics } from '@/hooks/useAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export const NewsletterPopup = () => {
  const { isOpen, closePopup, markAsSubscribed } = useNewsletterPopup();
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.from('newsletter_subscriptions').insert([{
        email,
        consent: true,
        source_page: window.location.pathname,
        source_site: 'int' as const,
      }]);

      if (dbError && !dbError.message.includes('duplicate')) {
        throw dbError;
      }

      trackEvent('newsletter_subscribed_global_nrro', {
        source: 'popup',
        page_path: window.location.pathname,
      });

      setIsSuccess(true);
      markAsSubscribed();

      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closePopup}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-md bg-background border border-border rounded-xl shadow-2xl p-6"
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">You're subscribed!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for joining our newsletter.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-xs font-mono uppercase tracking-wide text-primary">
                    Stay Informed
                  </span>
                  <h3 className="text-xl font-normal mt-2">
                    Get Expert Insights
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    Join 2,000+ professionals receiving our weekly updates on international tax, legal, and business advisory.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Subscribe <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Unsubscribe anytime. We respect your privacy.
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
