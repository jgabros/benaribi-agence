import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContact, captureLeadEmail } from './client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('NEXT_PUBLIC_HUBSPOT_PORTAL_ID', 'test-portal');
  vi.stubEnv('NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_GUID', 'contact-guid');
  vi.stubEnv('NEXT_PUBLIC_HUBSPOT_LEAD_FORM_GUID', 'lead-guid');
});

const contactFields = {
  firstname: 'Marie',
  lastname: 'Dupont',
  email: 'marie@example.fr',
  country: 'France',
  service_interest: 'industrial' as const,
  budget_range: '500000-2000000',
};

describe('submitContact', () => {
  it('sends a payload with all 6 required field names', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await submitContact(contactFields);

    const [, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body as string);

    const fieldNames = body.fields.map((f: { name: string }) => f.name);
    expect(fieldNames).toContain('firstname');
    expect(fieldNames).toContain('lastname');
    expect(fieldNames).toContain('email');
    expect(fieldNames).toContain('country');
    expect(fieldNames).toContain('service_interest');
    expect(fieldNames).toContain('budget_range');
  });

  it('includes submittedAt as a number', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await submitContact(contactFields);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(typeof body.submittedAt).toBe('number');
  });

  it('rejects on HTTP 429', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ message: 'Rate limit exceeded' }),
    });
    await expect(submitContact(contactFields)).rejects.toThrow();
  });

  it('rejects on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network down'));
    await expect(submitContact(contactFields)).rejects.toThrow();
  });
});

describe('captureLeadEmail', () => {
  it('resolves silently even when fetch throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network down'));
    await expect(captureLeadEmail({ email: 'test@x.com', lead_source: 'calculator' })).resolves.toBeUndefined();
  });

  it('resolves silently on HTTP 500', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
    await expect(captureLeadEmail({ email: 'test@x.com', lead_source: 'resources' })).resolves.toBeUndefined();
  });
});
