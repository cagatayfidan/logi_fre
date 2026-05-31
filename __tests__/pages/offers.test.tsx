import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OffersPage from '@/app/moves/[id]/offers/page';

const mockUseParams = vi.fn(() => ({ id: 'MR-001' }))

vi.mock('next/navigation', () => ({
  useParams: () => mockUseParams(),
}))

describe('OffersPage', () => {
  it('renders the page title for the move', () => {
    render(<OffersPage />);
    expect(screen.getByText('Offers for MR-001')).toBeDefined();
  });

  it('renders status filter tabs', () => {
    render(<OffersPage />);
    expect(screen.getByText('all')).toBeDefined();
    expect(screen.getByText('pending')).toBeDefined();
    expect(screen.getByText('accepted')).toBeDefined();
    expect(screen.getByText('expired')).toBeDefined();
    expect(screen.getByText('rejected')).toBeDefined();
  });

  it('renders sort dropdown', () => {
    render(<OffersPage />);
    expect(screen.getByText('Sort by')).toBeDefined();
  });

  it('renders all offer cards', () => {
    render(<OffersPage />);
    expect(screen.getByText("Mike's Transport")).toBeDefined();
    expect(screen.getByText('FastMove Inc.')).toBeDefined();
    expect(screen.getByText('Budget Van Co.')).toBeDefined();
  });

  it('renders back link to move detail', () => {
    render(<OffersPage />);
    expect(screen.getByText('Back to Move Detail')).toBeDefined();
  });

  it('shows insurance and loading help indicators', () => {
    render(<OffersPage />);
    expect(screen.getByText('✅ Insured')).toBeDefined();
    expect(screen.getByText('💪 Loading help')).toBeDefined();
  });

  it('shows expired badge for expired offers', () => {
    render(<OffersPage />);
    expect(screen.getAllByText('Expired').length).toBeGreaterThanOrEqual(1);
  });

  it('shows empty state when no offers exist', () => {
    mockUseParams.mockReturnValueOnce({ id: 'MR-004' })
    render(<OffersPage />);
    expect(screen.getByText('No offers match this filter.')).toBeDefined();
  });
});
