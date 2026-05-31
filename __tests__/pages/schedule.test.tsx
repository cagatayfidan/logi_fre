import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SchedulePage from '@/app/schedule/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/schedule',
  useRouter: () => ({ push: vi.fn() }),
}));

describe('SchedulePage', () => {
  it('renders the schedule heading', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Schedule')).toBeDefined();
  });

  it('renders upcoming and past sections', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Upcoming')).toBeDefined();
    expect(screen.getByText('Past')).toBeDefined();
  });

  it('renders schedule events with pickup/delivery times', () => {
    render(<SchedulePage />);
    const timeEntries = screen.getAllByText(/09:00|08:00|10:00|07:00/);
    expect(timeEntries.length).toBeGreaterThanOrEqual(1);
  });

  it('renders location names in schedule cards', () => {
    render(<SchedulePage />);
    expect(screen.getByText('123 Main St, New York, NY')).toBeDefined();
    expect(screen.getByText('789 Business Blvd, Manhattan, NY')).toBeDefined();
  });

  it('renders pickup and delivery labels', () => {
    render(<SchedulePage />);
    const pickups = screen.getAllByText('pickup');
    expect(pickups.length).toBeGreaterThanOrEqual(1);
    const deliveries = screen.getAllByText('delivery');
    expect(deliveries.length).toBeGreaterThanOrEqual(1);
  });
});
