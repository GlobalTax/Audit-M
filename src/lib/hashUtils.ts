/**
 * Hash utilities for Enhanced Conversions
 * Uses SHA-256 hashing for user data (required by Google Ads)
 */

/**
 * Hash an email address using SHA-256
 * @param email - The email address to hash
 * @returns The SHA-256 hash of the normalized email
 */
export async function hashEmail(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedEmail);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
