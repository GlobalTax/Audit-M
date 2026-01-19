// Analytics event tracking hook with GTM integration
import { hashEmail } from '@/lib/hashUtils';

// Google Ads Configuration
const GOOGLE_ADS_ID = 'AW-561508636';
const CONVERSION_LABELS = {
  contact_form: 'PLACEHOLDER_CONTACT', // Replace with actual label from Google Ads
  resource_download: 'PLACEHOLDER_DOWNLOAD', // Replace with actual label from Google Ads
  newsletter: 'PLACEHOLDER_NEWSLETTER', // Replace with actual label from Google Ads
};

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

  /**
   * Track form field focus for conversion optimization
   */
  const trackFormFieldFocus = (formName: string, fieldName: string) => {
    trackEvent('form_field_focus_global_nrro', {
      form_name: formName,
      field_name: fieldName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track form abandonment
   */
  const trackFormAbandon = (formName: string, lastField: string, fieldsCompleted: number) => {
    trackEvent('form_abandon_global_nrro', {
      form_name: formName,
      last_field: lastField,
      fields_completed: fieldsCompleted,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track when a form enters the viewport
   */
  const trackScrollToForm = (formName: string) => {
    trackEvent('scroll_to_form_global_nrro', {
      form_name: formName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track time on page milestones
   */
  const trackTimeOnPage = (seconds: number, pagePath: string) => {
    trackEvent('time_on_page_global_nrro', {
      seconds,
      page_path: pagePath,
      timestamp: new Date().toISOString(),
    });
  };

  // ============================================
  // Google Ads Conversion Tracking Functions
  // ============================================

  /**
   * Track Google Ads conversion with Enhanced Conversions
   * @param conversionType - Type of conversion (contact_form, resource_download, newsletter)
   * @param value - Optional conversion value in EUR
   * @param userData - Optional user data for Enhanced Conversions
   */
  const trackGoogleAdsConversion = async (
    conversionType: 'contact_form' | 'resource_download' | 'newsletter',
    value?: number,
    userData?: { email?: string }
  ) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const conversionLabel = CONVERSION_LABELS[conversionType];
    const conversionId = `${GOOGLE_ADS_ID}/${conversionLabel}`;

    const conversionData: Record<string, any> = {
      send_to: conversionId,
      value: value || 0,
      currency: 'EUR',
    };

    // Enhanced Conversions: add hashed email
    if (userData?.email) {
      try {
        const hashedEmail = await hashEmail(userData.email);
        conversionData.user_data = {
          sha256_email_address: hashedEmail,
        };
      } catch (error) {
        console.error('[Analytics] Error hashing email for Enhanced Conversions:', error);
      }
    }

    window.gtag('event', 'conversion', conversionData);
    
    // Also push to dataLayer for GTM
    window.dataLayer?.push({
      event: `gads_conversion_${conversionType}_global_nrro`,
      conversion_id: conversionId,
      conversion_value: value || 0,
      conversion_currency: 'EUR',
    });

    console.log('[Analytics] Google Ads Conversion:', conversionType, conversionData);
  };

  /**
   * Track contact form conversion in Google Ads
   * @param email - User email for Enhanced Conversions
   * @param serviceInterest - Service the user is interested in
   */
  const trackContactFormConversion = async (email: string, serviceInterest: string) => {
    // Track in Google Ads with €100 value
    await trackGoogleAdsConversion('contact_form', 100, { email });
    
    // Also track in GA4
    trackGlobalContactFormSubmission({ serviceInterest, countryRegion: '' });
  };

  /**
   * Track resource download conversion (Playbook, Checklist, Calculator, Quiz)
   * @param email - User email for Enhanced Conversions
   * @param resourceType - Type of resource downloaded
   */
  const trackResourceDownloadConversion = async (
    email: string, 
    resourceType: 'playbook' | 'checklist' | 'calculator' | 'quiz' | 'other'
  ) => {
    // Track in Google Ads with €50 value
    await trackGoogleAdsConversion('resource_download', 50, { email });
    
    // Also track in GA4
    trackEvent('resource_download_conversion_global_nrro', {
      resource_type: resourceType,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track newsletter signup conversion
   * @param email - User email for Enhanced Conversions
   */
  const trackNewsletterConversion = async (email: string) => {
    // Track in Google Ads with €25 value
    await trackGoogleAdsConversion('newsletter', 25, { email });
    
    // Also track in GA4
    trackEvent('newsletter_signup_conversion_global_nrro', {
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
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
    trackFormFieldFocus,
    trackFormAbandon,
    trackScrollToForm,
    trackTimeOnPage,
    // Google Ads Conversion functions
    trackGoogleAdsConversion,
    trackContactFormConversion,
    trackResourceDownloadConversion,
    trackNewsletterConversion,
  };
};
