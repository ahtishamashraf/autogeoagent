/**
 * Analytics events.
 *
 * No provider is hardcoded and no measurement ID is invented. Events are
 * pushed to `window.dataLayer` (Google Tag Manager) and forwarded to `gtag`
 * when a GA4 tag is present, so wiring up a provider later needs no code
 * changes here.
 *
 * Set NEXT_PUBLIC_GA_ID to load GA4 (see components/system/Analytics.js).
 *
 * Events the site emits:
 *   signup_click, login_click, pricing_cta, pricing_toggle,
 *   feature_cta, contact_submit, scene_navigate
 */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {
    // Analytics must never break a user interaction.
  }
}

/** Classifies an outbound application link so CTAs report consistently. */
export const appLinkEvent = (href = '') => {
  if (href.includes('/signup')) return 'signup_click';
  if (href.includes('/login')) return 'login_click';
  return null;
};
