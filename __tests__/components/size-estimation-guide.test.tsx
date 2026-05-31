import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SizeEstimationGuide } from '@/components/size-estimation-guide';

describe('SizeEstimationGuide', () => {
  it('renders the heading', () => {
    render(<SizeEstimationGuide />);
    expect(screen.getByText('Size Estimation Guide')).toBeDefined();
  });

  it('renders all room presets', () => {
    render(<SizeEstimationGuide />);
    expect(screen.getByText('Studio / Dorm')).toBeDefined();
    expect(screen.getByText('1-Bedroom Apt')).toBeDefined();
    expect(screen.getByText('2-Bedroom Apt')).toBeDefined();
    expect(screen.getByText('3-Bedroom House')).toBeDefined();
    expect(screen.getByText('4+ Bedroom House')).toBeDefined();
  });

  it('shows volume badges for each preset', () => {
    render(<SizeEstimationGuide />);
    expect(screen.getByText('~5 m³')).toBeDefined();
    expect(screen.getByText('~10 m³')).toBeDefined();
    expect(screen.getByText('~20 m³')).toBeDefined();
    expect(screen.getByText('~30 m³')).toBeDefined();
    expect(screen.getByText('~45 m³')).toBeDefined();
  });

  it('shows vehicle recommendations', () => {
    render(<SizeEstimationGuide />);
    expect(screen.getByText('Small van')).toBeDefined();
    expect(screen.getByText('Medium truck')).toBeDefined();
    expect(screen.getByText('Large truck')).toBeDefined();
    expect(screen.getByText('Moving truck')).toBeDefined();
    expect(screen.getByText('Moving truck + trailer')).toBeDefined();
  });

  it('renders current volume when provided', () => {
    render(<SizeEstimationGuide currentVolume={15} />);
    expect(screen.getByText(/Estimated Volume/)).toBeDefined();
    expect(screen.getByText(/~15 m³/)).toBeDefined();
  });
});
