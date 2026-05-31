import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreateMovePage from '@/app/moves/create/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('CreateMovePage', () => {
  it('renders the page heading', () => {
    render(<CreateMovePage />);
    expect(screen.getByText('Post a Move')).toBeDefined();
  });

  it('renders the stepper with all 4 steps', () => {
    render(<CreateMovePage />);
    const addresses = screen.getAllByText('Addresses');
    expect(addresses.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Date')).toBeDefined();
    expect(screen.getByText('Items')).toBeDefined();
    expect(screen.getByText('Review')).toBeDefined();
  });

  it('renders pickup and drop-off location fields on step 0', () => {
    render(<CreateMovePage />);
    expect(screen.getByText('Pickup Location')).toBeDefined();
    expect(screen.getByText('Drop-off Location')).toBeDefined();
  });

  it('renders the Next button', () => {
    render(<CreateMovePage />);
    expect(screen.getByText('Next')).toBeDefined();
  });

  it('renders Back to Dashboard link', () => {
    render(<CreateMovePage />);
    expect(screen.getByText('Back to Dashboard')).toBeDefined();
  });
});
