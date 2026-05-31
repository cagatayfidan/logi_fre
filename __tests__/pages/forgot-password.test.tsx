import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ForgotPasswordPage from '@/app/auth/forgot-password/page';

describe('ForgotPasswordPage', () => {
  it('renders the forgot password heading', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText('Forgot password?')).toBeDefined();
  });

  it('renders email input and submit button', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByText('Send Reset Link')).toBeDefined();
  });

  it('renders sign in link', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText('Sign In')).toBeDefined();
  });
});
