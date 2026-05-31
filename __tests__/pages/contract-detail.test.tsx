import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContractDetailPage from '@/app/contracts/[id]/page';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'C-001' }),
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/contracts/C-001',
}));

describe('ContractDetailPage', () => {
  it('renders the contract heading', () => {
    render(<ContractDetailPage />);
    expect(screen.getByText('Contract #C-001')).toBeDefined();
  });

  it('renders all 5 timeline steps', () => {
    render(<ContractDetailPage />);
    const pendingCheckin = screen.getAllByText('Pending Check-in');
    expect(pendingCheckin.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Checked In')).toBeDefined();
    expect(screen.getByText('In Transit')).toBeDefined();
    expect(screen.getByText('Delivered')).toBeDefined();
    expect(screen.getByText('Completed')).toBeDefined();
  });

  it('renders the Check In action button for pending_checkin status', () => {
    render(<ContractDetailPage />);
    expect(screen.getByText('Check In')).toBeDefined();
  });

  it('renders Cancel Contract button', () => {
    render(<ContractDetailPage />);
    expect(screen.getByText('Cancel Contract')).toBeDefined();
  });

  it('renders move details and price', () => {
    render(<ContractDetailPage />);
    expect(screen.getByText('$800.00')).toBeDefined();
    expect(screen.getByText('Mike\'s Transport')).toBeDefined();
  });
});
