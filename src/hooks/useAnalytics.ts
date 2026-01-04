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

  const trackContactClick = (
    contactType: 'phone' | 'email',
    contactValue: string,
    location: string
  ) => {
    trackEvent('contact_click', {
      contact_type: contactType,
      contact_value: contactValue,
      page_location: location,
      timestamp: new Date().toISOString(),
    });
  };

  const trackDownload = (
    fileType: 'cv' | 'csv' | 'excel' | 'pdf',
    fileName: string,
    location: string
  ) => {
    trackEvent('file_download', {
      file_type: fileType,
      file_name: fileName,
      page_location: location,
      timestamp: new Date().toISOString(),
    });
  };

  const trackScrollDepth = (
    depth: 25 | 50 | 75 | 90 | 100,
    pagePath: string
  ) => {
    trackEvent('scroll_depth', {
      scroll_percentage: depth,
      page_path: pagePath,
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track global contact form submission for int.nrro.es
   * Fires GA4 event: contact_form_submission_global_nrro
   */
  const trackGlobalContactFormSubmission = (formData: {
    serviceInterest: string;
    countryRegion: string;
  }) => {
    trackEvent('contact_form_submission_global_nrro', {
      form_name: 'global_contact_form',
      service_interest: formData.serviceInterest,
      country_region: formData.countryRegion,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track FAQ interaction for global.nrro.es
   * Fires GA4 event with pattern: faq_expand_{topic}_global_nrro
   */
  const trackFAQInteraction = (params: {
    eventName: string;
    faqQuestion: string;
    faqIndex: number;
    faqCategory: string;
  }) => {
    trackEvent(params.eventName, {
      faq_question: params.faqQuestion,
      faq_index: params.faqIndex,
      faq_category: params.faqCategory,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track CTA clicks on int.nrro.es international services pages
   * Fires GA4 events with pattern: cta_{action}_global_nrro
   */
  const trackInternationalCTAClick = (params: {
    eventName: string;
    ctaText: string;
    ctaPosition: 'hero' | 'service_card' | 'footer_cta' | 'inline';
    serviceType?: string;
    destinationUrl?: string;
  }) => {
    trackEvent(params.eventName, {
      cta_text: params.ctaText,
      cta_position: params.ctaPosition,
      service_type: params.serviceType || null,
      destination_url: params.destinationUrl || null,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track testimonial interactions for global.nrro.es
   * Fires GA4 events with pattern: testimonial_{action}_global_nrro
   */
  const trackTestimonialInteraction = (params: {
    eventName: string;
    testimonialAuthor: string;
    testimonialIndex: number;
    companyType: string;
    interactionType: 'view' | 'click' | 'expand' | 'collapse';
  }) => {
    trackEvent(params.eventName, {
      testimonial_author: params.testimonialAuthor,
      testimonial_index: params.testimonialIndex,
      company_type: params.companyType,
      interaction_type: params.interactionType,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track benefit block clicks on global.nrro.es
   * Fires GA4 events with pattern: benefit_click_{topic}_global_nrro
   */
  const trackBenefitClick = (params: {
    eventName: string;
    benefitTitle: string;
    benefitIndex: number;
    destinationUrl: string;
  }) => {
    trackEvent(params.eventName, {
      benefit_title: params.benefitTitle,
      benefit_index: params.benefitIndex,
      destination_url: params.destinationUrl,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof window !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track cookie consent changes for global.nrro.es
   * Fires GA4 event: cookie_consent_update_global_nrro
   */
  const trackConsentChange = (params: {
    consentType: 'accept_all' | 'reject_nonessential' | 'custom';
    analyticsConsent: boolean;
    marketingConsent: boolean;
    preferencesConsent: boolean;
  }) => {
    trackEvent('cookie_consent_change_global_nrro', {
      consent_type: params.consentType,
      analytics_consent: params.analyticsConsent,
      marketing_consent: params.marketingConsent,
      preferences_consent: params.preferencesConsent,
      page_location: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackEvent,
    trackCTAClick,
    trackPageView,
    trackFormSubmit,
    trackContactClick,
    trackDownload,
    trackScrollDepth,
    trackGlobalContactFormSubmission,
    trackFAQInteraction,
    trackInternationalCTAClick,
    trackTestimonialInteraction,
    trackBenefitClick,
    trackConsentChange,
  };
};
