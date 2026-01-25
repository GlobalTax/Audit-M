/**
 * Simple class name merger utility
 * No external dependencies - pure JavaScript
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
