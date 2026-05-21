import type { CalculatorSector } from '../calculator/calculate';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    lintrk: (...args: unknown[]) => void;
  }
}

export function fireLead(source: 'contact-form'): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { event_category: 'conversion', event_label: source });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID });
  }
}

export function fireLeadMagnetDownload(source: 'calculator' | 'resources'): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'LeadMagnetDownload', { event_category: 'conversion', event_label: source });
  }
}

export function fireCalculatorCompleted(sector: CalculatorSector): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'CalculatorCompleted', { event_category: 'engagement', event_label: sector });
  }
}
