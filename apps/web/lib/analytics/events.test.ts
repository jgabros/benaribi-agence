import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireLead, fireLeadMagnetDownload, fireCalculatorCompleted } from './events';

describe('analytics events — with window defined', () => {
  const mockGtag = vi.fn();
  const mockFbq = vi.fn();
  const mockLintrk = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('window', {
      gtag: mockGtag,
      fbq: mockFbq,
      lintrk: mockLintrk,
      location: { href: 'http://localhost/' },
    });
  });

  it('fireLead calls gtag with "generate_lead"', () => {
    fireLead('contact-form');
    expect(mockGtag).toHaveBeenCalledWith('event', 'generate_lead', expect.any(Object));
  });

  it('fireLead calls fbq with "Lead"', () => {
    fireLead('contact-form');
    expect(mockFbq).toHaveBeenCalledWith('track', 'Lead');
  });

  it('fireLeadMagnetDownload calls gtag with "LeadMagnetDownload"', () => {
    fireLeadMagnetDownload('calculator');
    expect(mockGtag).toHaveBeenCalledWith('event', 'LeadMagnetDownload', expect.any(Object));
  });

  it('fireCalculatorCompleted calls gtag with "CalculatorCompleted" and correct sector', () => {
    fireCalculatorCompleted('industrial');
    expect(mockGtag).toHaveBeenCalledWith('event', 'CalculatorCompleted', expect.objectContaining({ event_label: 'industrial' }));
  });
});

describe('analytics events — without window (SSG build safety)', () => {
  beforeEach(() => {
    vi.stubGlobal('window', undefined);
  });

  it('fireLead is a no-op', () => {
    expect(() => fireLead('contact-form')).not.toThrow();
  });

  it('fireLeadMagnetDownload is a no-op', () => {
    expect(() => fireLeadMagnetDownload('resources')).not.toThrow();
  });

  it('fireCalculatorCompleted is a no-op', () => {
    expect(() => fireCalculatorCompleted('residential')).not.toThrow();
  });
});
