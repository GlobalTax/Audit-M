import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'newsletter_popup_last_shown';
const COOLDOWN_DAYS = 7;
const SCROLL_THRESHOLD = 50; // 50%
const TIME_THRESHOLD = 60000; // 60 seconds

export const useNewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const shouldShowPopup = useCallback(() => {
    // Don't show on admin pages
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return false;
    }

    // Check if already subscribed
    if (localStorage.getItem('newsletter_subscribed') === 'true') {
      return false;
    }

    // Check cooldown
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < COOLDOWN_DAYS) {
        return false;
      }
    }

    return true;
  }, []);

  const triggerPopup = useCallback(() => {
    if (!hasTriggered && shouldShowPopup()) {
      setHasTriggered(true);
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  }, [hasTriggered, shouldShowPopup]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const markAsSubscribed = useCallback(() => {
    localStorage.setItem('newsletter_subscribed', 'true');
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!shouldShowPopup()) return;

    // Time-based trigger
    const timeoutId = setTimeout(() => {
      triggerPopup();
    }, TIME_THRESHOLD);

    // Scroll-based trigger
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= SCROLL_THRESHOLD) {
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldShowPopup, triggerPopup]);

  return {
    isOpen,
    closePopup,
    markAsSubscribed,
  };
};
