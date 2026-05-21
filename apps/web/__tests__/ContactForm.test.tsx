import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/hubspot/client', () => ({
  submitContact: vi.fn(),
}));

vi.mock('@/lib/analytics/events', () => ({
  fireLead: vi.fn(),
}));

import { ContactForm } from '@/components/sections/contact/ContactForm';
import { submitContact } from '@/lib/hubspot/client';
import { fireLead } from '@/lib/analytics/events';

const flushAsync = () => new Promise<void>((r) => setTimeout(r, 0));

async function fillAndSubmit(container: HTMLElement) {
  const user = userEvent.setup({ delay: null });
  await user.type(container.querySelector('#cf-firstname')!, 'Jean');
  await user.type(container.querySelector('#cf-lastname')!, 'Dupont');
  await user.type(container.querySelector('#cf-email')!, 'jean@example.com');
  await user.type(container.querySelector('#cf-country')!, 'France');
  fireEvent.change(container.querySelector('#cf-service')!, { target: { value: 'residential' } });
  fireEvent.change(container.querySelector('#cf-budget')!, { target: { value: '100000-500000' } });
  await user.click(screen.getByRole('button', { name: /form\.submit/i }));
  await flushAsync();
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(submitContact).mockClear();
    vi.mocked(fireLead).mockClear();
  });

  it('shows confirmation and fires fireLead on successful submit', async () => {
    vi.mocked(submitContact).mockResolvedValue(undefined);
    const { container } = render(<ContactForm />);

    await fillAndSubmit(container);

    await waitFor(() => {
      expect(submitContact).toHaveBeenCalledOnce();
    }, { timeout: 3_000 });

    expect(submitContact).toHaveBeenCalledWith(
      expect.objectContaining({
        firstname: 'Jean',
        lastname: 'Dupont',
        email: 'jean@example.com',
        country: 'France',
        service_interest: 'residential',
        budget_range: '100000-500000',
      })
    );

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    }, { timeout: 3_000 });

    expect(fireLead).toHaveBeenCalledOnce();
    expect(fireLead).toHaveBeenCalledWith('contact-form');
    expect(container.querySelector('form')).not.toBeInTheDocument();
  });

  it('shows error banner and preserves field values when submitContact rejects', async () => {
    vi.mocked(submitContact).mockRejectedValue(new Error('HubSpot 429'));
    const { container } = render(<ContactForm />);

    await fillAndSubmit(container);

    await waitFor(() => {
      expect(submitContact).toHaveBeenCalledOnce();
    }, { timeout: 3_000 });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    }, { timeout: 3_000 });

    expect(fireLead).not.toHaveBeenCalled();
    expect((container.querySelector('#cf-firstname') as HTMLInputElement).value).toBe('Jean');
    expect((container.querySelector('#cf-email') as HTMLInputElement).value).toBe('jean@example.com');
  });

  it('shows per-field errors and does NOT call submitContact on empty submit', async () => {
    const { container } = render(<ContactForm />);

    const user = userEvent.setup({ delay: null });
    await user.click(screen.getByRole('button', { name: /form\.submit/i }));
    await flushAsync();

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    }, { timeout: 2_000 });

    expect(submitContact).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
