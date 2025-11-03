// Analytics event tracking hook with GTM integration

export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Console log for development
    console.log("[Analytics]", eventName, properties);
    
    // Push to GTM dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...properties,
      });
    }
  };

  const trackCTAClick = (ctaName: string, location: string) => {
    trackEvent("cta_clicked", {
      cta_name: ctaName,
      page_location: location,
      timestamp: new Date().toISOString(),
    });
  };

  const trackPageView = (pageName: string) => {
    trackEvent("page_view", {
      page_name: pageName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
    trackEvent("form_submit", {
      form_name: formName,
      ...formData,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackEvent,
    trackCTAClick,
    trackPageView,
    trackFormSubmit,
  };
};
