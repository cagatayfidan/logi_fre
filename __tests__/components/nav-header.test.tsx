import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavHeader } from '@/components/nav-header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('NavHeader', () => {
  it('renders the Haul brand name', () => {
    render(<NavHeader role="shipper" userName="John Doe" />);
    expect(screen.getByText('Haul')).toBeDefined();
  });

  it('renders shipper nav links when role is shipper', () => {
    render(<NavHeader role="shipper" userName="John Doe" />);
    expect(screen.getByText('My Moves')).toBeDefined();
    expect(screen.getByText('Contracts')).toBeDefined();
  });

  it('renders transporter nav links when role is transporter', () => {
    render(<NavHeader role="transporter" userName="Jane Doe" />);
    expect(screen.getByText('Available Moves')).toBeDefined();
    expect(screen.getByText('My Offers')).toBeDefined();
    expect(screen.getByText('Contracts')).toBeDefined();
  });

  it('renders user initials in avatar', () => {
    render(<NavHeader role="shipper" userName="John Doe" />);
    expect(screen.getByText('JD')).toBeDefined();
  });

  it('renders single initial for single name', () => {
    render(<NavHeader role="shipper" userName="John" />);
    expect(screen.getByText('J')).toBeDefined();
  });
});
