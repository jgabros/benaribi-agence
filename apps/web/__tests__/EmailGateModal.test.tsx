import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/hubspot/client', () => ({
  captureLeadEmail: vi.fn(),
}));

vi.mock('@/lib/analytics/events', () => ({
  fireLeadMagnetDownload: vi.fn(),
}));

import { EmailGateModal } from '@/components/shared/EmailGateModal';
import { captureLeadEmail } from '@/lib/hubspot/client';
import { fireLeadMagnetDownload } from '@/lib/analytics/events';

const flushAsync = () => new Promise<void>((r) => setTimeout(r, 0));
const mockOnClose = vi.fn();

describe('EmailGateModal', () => {
  beforeEach(() => {
    vi.mocked(captureLeadEmail).mockClear();
    vi.mocked(fireLeadMagnetDownload).mockClear();
    mockOnClose.mockClear();
  });

  it('does NOT call captureLeadEmail on invalid (non-email) submission', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <EmailGateModal source="calculator" pdfPath="/guide.pdf" onClose={mockOnClose} />
    );

    await user.type(container.querySelector('#gate-email')!, 'not-an-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    await flushAsync();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    }, { timeout: 2_000 });

    expect(captureLeadEmail).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('triggers PDF download and fires analytics on valid email + HubSpot success', async () => {
    vi.mocked(captureLeadEmail).mockResolvedValue(undefined);
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <EmailGateModal source="calculator" pdfPath="/guide.pdf" onClose={mockOnClose} />
    );

    await user.type(container.querySelector('#gate-email')!, 'user@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    await flushAsync();

    await waitFor(() => {
      expect(captureLeadEmail).toHaveBeenCalledOnce();
    }, { timeout: 3_000 });

    expect(captureLeadEmail).toHaveBeenCalledWith({
      email: 'user@example.com',
      lead_source: 'calculator',
    });
    expect(fireLeadMagnetDownload).toHaveBeenCalledOnce();
    expect(fireLeadMagnetDownload).toHaveBeenCalledWith('calculator');
    expect(anchorClick).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();

    anchorClick.mockRestore();
  });

  it('still triggers PDF download even when captureLeadEmail swallows errors', async () => {
    vi.mocked(captureLeadEmail).mockResolvedValue(undefined);
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <EmailGateModal source="resources" pdfPath="/guide.pdf" onClose={mockOnClose} />
    );

    await user.type(container.querySelector('#gate-email')!, 'user@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    await flushAsync();

    await waitFor(() => {
      expect(anchorClick).toHaveBeenCalled();
    }, { timeout: 3_000 });

    expect(fireLeadMagnetDownload).toHaveBeenCalledWith('resources');

    anchorClick.mockRestore();
  });
});
