import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/auth/login/page';

describe('LoginPage', () => {
  it('renders the login form title', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeDefined();
    expect(screen.getByText('Sign in to your account to continue')).toBeDefined();
  });

  it('renders email and password inputs', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
  });

  it('renders submit button', () => {
    render(<LoginPage />);
    expect(screen.getByText('Sign In')).toBeDefined();
  });

  it('renders sign up link', () => {
    render(<LoginPage />);
    expect(screen.getByText('Sign Up')).toBeDefined();
  });

  it('renders Haul brand', () => {
    render(<LoginPage />);
    const haulElements = screen.getAllByText('Haul');
    expect(haulElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Forgot password link', () => {
    render(<LoginPage />);
    expect(screen.getByText('Forgot password?')).toBeDefined();
  });
});
