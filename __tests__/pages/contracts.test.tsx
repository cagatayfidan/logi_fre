import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContractsPage from '@/app/contracts/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/contracts',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('ContractsPage', () => {
  it('renders the contracts heading', () => {
    render(<ContractsPage />);
    const headings = screen.getAllByText('Contracts');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders status filter tabs', () => {
    const { container } = render(<ContractsPage />);
    expect(screen.getByText('All')).toBeDefined();
    expect(screen.getByText('Active')).toBeDefined();
    const cancelledTabs = screen.getAllByText('Cancelled');
    expect(cancelledTabs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders contract list with prices', () => {
    render(<ContractsPage />);
    expect(screen.getByText('$800.00')).toBeDefined();
    expect(screen.getByText('$320.00')).toBeDefined();
    expect(screen.getByText('$450.00')).toBeDefined();
    expect(screen.getByText('$520.00')).toBeDefined();
  });

  it('renders contract transporter names', () => {
    render(<ContractsPage />);
    const mikeEntries = screen.getAllByText('Mike\'s Transport');
    expect(mikeEntries.length).toBeGreaterThanOrEqual(1);
    const fastMoveEntries = screen.getAllByText('FastMove Inc.');
    expect(fastMoveEntries.length).toBeGreaterThanOrEqual(1);
  });
});
