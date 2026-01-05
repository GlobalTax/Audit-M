import { useEffect, useRef, useCallback } from 'react';
import { useAnalytics } from './useAnalytics';

interface BlogAnalyticsParams {
  articleId: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  author: string;
  readTime: number;
}

interface TrafficSourceData {
  traffic_source: 'organic' | 'paid' | 'social' | 'email' | 'referral' | 'direct';
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string;
  is_landing_page: boolean;
}

const getTrafficSource = (): TrafficSourceData => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const referrer = document.referrer;
  
  let trafficSource: TrafficSourceData['traffic_source'] = 'direct';
  
  if (utmMedium === 'cpc' || utmMedium === 'ppc' || utmMedium === 'paid') {
    trafficSource = 'paid';
  } else if (utmMedium === 'email' || utmSource === 'newsletter') {
    trafficSource = 'email';
  } else if (utmMedium === 'social' || ['facebook', 'twitter', 'linkedin', 'instagram'].includes(utmSource || '')) {
    trafficSource = 'social';
  } else if (referrer) {
    const referrerHost = new URL(referrer).hostname;
    const currentHost = window.location.hostname;
    
    if (referrerHost !== currentHost) {
      if (['google', 'bing', 'yahoo', 'duckduckgo'].some(s => referrerHost.includes(s))) {
        trafficSource = 'organic';
      } else {
        trafficSource = 'referral';
      }
    }
  }

  return {
    traffic_source: trafficSource,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term'),
    referrer: referrer || '',
    is_landing_page: !referrer || !referrer.includes(window.location.hostname),
  };
};

export const useBlogAnalytics = (params: BlogAnalyticsParams) => {
  const { trackEvent } = useAnalytics();
  const startTimeRef = useRef<number>(0);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  const maxScrollRef = useRef<number>(0);
  const isTrackingRef = useRef<boolean>(false);
  const timeMilestonesRef = useRef<Set<string>>(new Set());

  const trackArticleView = useCallback(() => {
    const trafficSource = getTrafficSource();
    
    trackEvent('blog_article_view_global_nrro', {
      article_id: params.articleId,
      article_title: params.articleTitle,
      article_slug: params.articleSlug,
      article_category: params.category,
      article_author: params.author,
      article_read_time: params.readTime,
      ...trafficSource,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }, [params, trackEvent]);

  const trackScrollMilestone = useCallback((depth: number) => {
    if (scrollMilestonesRef.current.has(depth)) return;
    scrollMilestonesRef.current.add(depth);
    
    const timeElapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    
    trackEvent(`blog_scroll_${depth}_global_nrro`, {
      article_id: params.articleId,
      article_slug: params.articleSlug,
      scroll_depth: depth,
      time_elapsed_seconds: timeElapsed,
      timestamp: new Date().toISOString(),
    });

    // Check for read complete (100% scroll + enough time)
    if (depth === 100) {
      const minReadTime = Math.max(params.readTime * 30, 60); // At least 30 seconds per minute or 60s minimum
      if (timeElapsed >= minReadTime) {
        trackEvent('blog_read_complete_global_nrro', {
          article_id: params.articleId,
          article_slug: params.articleSlug,
          total_time_seconds: timeElapsed,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [params, trackEvent]);

  const trackTimeMilestone = useCallback((milestone: string, seconds: number) => {
    if (timeMilestonesRef.current.has(milestone)) return;
    timeMilestonesRef.current.add(milestone);
    
    trackEvent('blog_time_milestone_global_nrro', {
      article_id: params.articleId,
      article_slug: params.articleSlug,
      milestone,
      time_seconds: seconds,
      timestamp: new Date().toISOString(),
    });
  }, [params, trackEvent]);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercent = Math.round((scrolled / scrollHeight) * 100);
    
    maxScrollRef.current = Math.max(maxScrollRef.current, scrollPercent);

    // Track milestones at 25, 50, 75, 100
    [25, 50, 75, 100].forEach(milestone => {
      if (scrollPercent >= milestone) {
        trackScrollMilestone(milestone);
      }
    });
  }, [trackScrollMilestone]);

  const trackExit = useCallback(() => {
    if (!isTrackingRef.current) return;
    
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    
    trackEvent('blog_exit_global_nrro', {
      article_id: params.articleId,
      article_slug: params.articleSlug,
      time_spent_seconds: timeSpent,
      max_scroll_depth: maxScrollRef.current,
      timestamp: new Date().toISOString(),
    });
  }, [params, trackEvent]);

  const startTracking = useCallback(() => {
    if (isTrackingRef.current) return;
    
    isTrackingRef.current = true;
    startTimeRef.current = Date.now();
    scrollMilestonesRef.current.clear();
    timeMilestonesRef.current.clear();
    maxScrollRef.current = 0;

    // Track initial view
    trackArticleView();

    // Set up scroll tracking
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set up time milestones
    const timeMilestones = [
      { milestone: '30s', delay: 30000 },
      { milestone: '1min', delay: 60000 },
      { milestone: '2min', delay: 120000 },
      { milestone: '5min', delay: 300000 },
    ];

    const timeouts: NodeJS.Timeout[] = [];
    timeMilestones.forEach(({ milestone, delay }) => {
      const timeout = setTimeout(() => {
        trackTimeMilestone(milestone, delay / 1000);
      }, delay);
      timeouts.push(timeout);
    });

    // Track exit on page leave
    window.addEventListener('beforeunload', trackExit);
    window.addEventListener('pagehide', trackExit);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackExit);
      window.removeEventListener('pagehide', trackExit);
      timeouts.forEach(clearTimeout);
      trackExit();
      isTrackingRef.current = false;
    };
  }, [trackArticleView, handleScroll, trackTimeMilestone, trackExit]);

  const trackRelatedClick = useCallback((targetArticleId: string, targetArticleTitle: string, position: number) => {
    trackEvent('blog_related_click_global_nrro', {
      source_article_id: params.articleId,
      source_article_slug: params.articleSlug,
      target_article_id: targetArticleId,
      target_article_title: targetArticleTitle,
      position,
      time_on_page_seconds: Math.round((Date.now() - startTimeRef.current) / 1000),
      timestamp: new Date().toISOString(),
    });
  }, [params, trackEvent]);

  const trackCTAClick = useCallback((ctaType: string, ctaText: string) => {
    trackEvent('blog_cta_click_global_nrro', {
      article_id: params.articleId,
      article_slug: params.articleSlug,
      cta_type: ctaType,
      cta_text: ctaText,
      time_on_page_seconds: Math.round((Date.now() - startTimeRef.current) / 1000),
      max_scroll_depth: maxScrollRef.current,
      timestamp: new Date().toISOString(),
    });
  }, [params, trackEvent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isTrackingRef.current) {
        trackExit();
      }
    };
  }, [trackExit]);

  return {
    startTracking,
    trackRelatedClick,
    trackCTAClick,
  };
};
