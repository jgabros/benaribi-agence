import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/calculator/calculate', () => ({
  calculateFiscalEstimate: vi.fn(() => ({
    tier: 'mid',
    exemptions: [
      { label: 'IS exemption — 5 years' },
      { label: 'Customs duties exemption' },
    ],
    costEstimateEUR: { min: 5_000, max: 15_000 },
    processTimelineWeeks: { min: 8, max: 16 },
    hasTreatyBonus: true,
  })),
}));

vi.mock('@/lib/analytics/events', () => ({
  fireCalculatorCompleted: vi.fn(),
}));

vi.mock('@/components/shared/EmailGateModal', () => ({
  EmailGateModal: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="email-gate-modal">
      <button type="button" onClick={onClose}>Close modal</button>
    </div>
  ),
}));

import { RoiCalculator } from '@/components/sections/investment/RoiCalculator';
import { calculateFiscalEstimate } from '@/lib/calculator/calculate';
import { fireCalculatorCompleted } from '@/lib/analytics/events';

/** Flush all pending microtasks and promise chains */
const flushAsync = () => new Promise<void>((r) => setTimeout(r, 0));

async function fillAndSubmit(container: HTMLElement) {
  const user = userEvent.setup({ delay: null });
  await user.type(container.querySelector('#calc-capital')!, '500000');
  fireEvent.change(container.querySelector('#calc-sector')!, { target: { value: 'industrial' } });
  await user.type(container.querySelector('#calc-country')!, 'France');
  await user.click(screen.getByRole('button', { name: /calculate/i }));
  await flushAsync();
}

describe('RoiCalculator', () => {
  beforeEach(() => {
    vi.mocked(calculateFiscalEstimate).mockClear();
    vi.mocked(fireCalculatorCompleted).mockClear();
  });

  it('shows results panel and fires analytics on valid submit', async () => {
    const { container } = render(<RoiCalculator />);

    await fillAndSubmit(container);

    await waitFor(() => {
      expect(calculateFiscalEstimate).toHaveBeenCalledOnce();
    }, { timeout: 3_000 });

    expect(calculateFiscalEstimate).toHaveBeenCalledWith({
      capitalEUR: 500_000,
      sector: 'industrial',
      countryOfOrigin: 'France',
    });
    expect(fireCalculatorCompleted).toHaveBeenCalledOnce();
    expect(fireCalculatorCompleted).toHaveBeenCalledWith('industrial');

    expect(screen.getByText('results.title')).toBeInTheDocument();
    expect(container.querySelector('#calc-capital')).not.toBeInTheDocument();
  });

  it('shows field errors and does NOT advance on empty submit', async () => {
    const { container } = render(<RoiCalculator />);

    const user = userEvent.setup({ delay: null });
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    await flushAsync();

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    }, { timeout: 2_000 });

    expect(calculateFiscalEstimate).not.toHaveBeenCalled();
    expect(fireCalculatorCompleted).not.toHaveBeenCalled();
    expect(screen.queryByText('results.title')).not.toBeInTheDocument();
  });

  it('opens EmailGateModal when download CTA is clicked', async () => {
    const { container } = render(<RoiCalculator />);

    await fillAndSubmit(container);

    await waitFor(() => {
      expect(screen.getByText('results.title')).toBeInTheDocument();
    }, { timeout: 3_000 });

    const downloadBtn = screen.getByRole('button', { name: /results\.downloadcta/i });
    const user = userEvent.setup({ delay: null });
    await user.click(downloadBtn);

    expect(screen.getByTestId('email-gate-modal')).toBeInTheDocument();
  });
});
