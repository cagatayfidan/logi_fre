import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VerifyEmailPage from '@/app/auth/verify-email/page';

describe('VerifyEmailPage', () => {
  it('renders the email verification heading', () => {
    render(<VerifyEmailPage />);
    expect(screen.getByText('Check your email')).toBeDefined();
  });

  it('renders the 6 code input fields', () => {
    render(<VerifyEmailPage />);
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`code-${i}`);
      expect(input).not.toBeNull();
    }
  });

  it('renders the verify button', () => {
    render(<VerifyEmailPage />);
    expect(screen.getByText('Verify Email')).toBeDefined();
  });

  it('renders resend functionality', () => {
    render(<VerifyEmailPage />);
    expect(screen.getByText(/Resend code in/)).toBeDefined();
  });
});
