import { useState, useEffect, useCallback } from "react";

interface UseExitIntentOptions {
  threshold?: number;
  delay?: number;
  storageKey?: string;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const {
    threshold = 50,
    delay = 1000,
    storageKey = "exit_intent_shown",
  } = options;

  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const checkAlreadyShown = useCallback(() => {
    const shown = sessionStorage.getItem(storageKey);
    return shown === "true";
  }, [storageKey]);

  const markAsShown = useCallback(() => {
    sessionStorage.setItem(storageKey, "true");
  }, [storageKey]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    markAsShown();
  }, [markAsShown]);

  useEffect(() => {
    if (checkAlreadyShown() || hasTriggered) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= threshold && !hasTriggered) {
        timeoutId = setTimeout(() => {
          setShowPopup(true);
          setHasTriggered(true);
          markAsShown();
        }, 100);
      }
    };

    // Delay before enabling exit intent detection
    const enableTimeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, delay);

    return () => {
      clearTimeout(enableTimeout);
      clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [threshold, delay, checkAlreadyShown, hasTriggered, markAsShown]);

  return { showPopup, closePopup };
};
