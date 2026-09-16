import { useState } from 'react';

export interface LeadTracking {
  source_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
}

const EMPTY_TRACKING: LeadTracking = {
  source_page: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', gclid: '',
};

// Captures the page path and ad/campaign query params (utm_* + gclid) once,
// on first render — this is the arrival URL for a landing page (form sits on
// the same page the visitor landed on, no funnel navigation in between).
// SSR-safe: returns empty strings on the server, then the real values once
// this hydrates client-side.
export function useLeadTracking(): LeadTracking {
  const [tracking] = useState<LeadTracking>(() => {
    if (typeof window === 'undefined') return EMPTY_TRACKING;
    const params = new URLSearchParams(window.location.search);
    return {
      source_page: window.location.pathname,
      utm_source: params.get('utm_source') ?? '',
      utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '',
      utm_term: params.get('utm_term') ?? '',
      utm_content: params.get('utm_content') ?? '',
      gclid: params.get('gclid') ?? '',
    };
  });
  return tracking;
}
