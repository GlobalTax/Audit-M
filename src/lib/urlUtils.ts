/**
 * URL utilities for consistent domain handling
 */

export const BASE_DOMAIN = 'https://audit.nrro.es';

/**
 * Normalizes a URL to ensure it has the correct domain.
 * Handles cases where URL already includes domain or is just a path.
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return BASE_DOMAIN;
  
  // If it already has a full domain, return as-is
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }
  
  // If it's just a path, add the domain
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${BASE_DOMAIN}${path}`;
};

/**
 * Extracts the path from a URL (without the domain)
 */
export const getPathFromUrl = (url: string): string => {
  if (!url) return '/';
  
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    // If not a valid URL, assume it's already a path
    return url.startsWith('/') ? url : `/${url}`;
  }
};
