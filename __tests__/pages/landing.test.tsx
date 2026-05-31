import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

describe('LandingPage', () => {
  it('renders the hero heading', () => {
    render(<LandingPage />);
    expect(screen.getByText('Move Anything.')).toBeDefined();
    expect(screen.getByText('Anywhere.')).toBeDefined();
  });

  it('renders CTA buttons', () => {
    render(<LandingPage />);
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Get Started')).toBeDefined();
    expect(screen.getByText('Post a Move')).toBeDefined();
    expect(screen.getByText('Earn as Transporter')).toBeDefined();
  });

  it('renders How It Works section', () => {
    render(<LandingPage />);
    expect(screen.getByText('How It Works')).toBeDefined();
    expect(screen.getByText('1. Post Your Move')).toBeDefined();
    expect(screen.getByText('2. Get Offers')).toBeDefined();
    expect(screen.getByText('3. Move Happens')).toBeDefined();
  });

  it('renders footer with copyright', () => {
    render(<LandingPage />);
    expect(screen.getByText(/2026 Haul/)).toBeDefined();
  });
});
