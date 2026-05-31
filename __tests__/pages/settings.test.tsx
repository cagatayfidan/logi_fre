import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/settings',
}));

describe('SettingsPage', () => {
  it('renders the Account Settings heading', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Account Settings')).toBeDefined();
  });

  describe('all 5 sections', () => {
    it('renders Profile section', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Profile')).toBeDefined();
    });

    it('renders Change Password section', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Change Password')).toBeDefined();
    });

    it('renders Notification Preferences section', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Notification Preferences')).toBeDefined();
    });

    it('renders Preferences section', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Preferences')).toBeDefined();
    });

    it('renders Danger Zone section', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Danger Zone')).toBeDefined();
    });
  });

  describe('profile form', () => {
    it('renders Full Name field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Full Name')).toBeDefined();
    });

    it('renders Email field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Email')).toBeDefined();
    });

    it('renders Phone Number field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Phone Number')).toBeDefined();
    });

    it('renders Address field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Address')).toBeDefined();
    });

    it('renders Save Changes button', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Save Changes')).toBeDefined();
    });
  });

  describe('change password fields', () => {
    it('renders Current Password field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Current Password')).toBeDefined();
    });

    it('renders New Password field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('New Password')).toBeDefined();
    });

    it('renders Confirm New Password field', () => {
      render(<SettingsPage />);
      expect(screen.getByLabelText('Confirm New Password')).toBeDefined();
    });

    it('renders Update Password button', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Update Password')).toBeDefined();
    });
  });

  describe('notification toggles', () => {
    it('renders Email Notifications toggle', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Email Notifications')).toBeDefined();
    });

    it('renders Push Notifications toggle', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Push Notifications')).toBeDefined();
    });

    it('renders Offer Alerts toggle', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Offer Alerts')).toBeDefined();
    });

    it('renders Contract Updates toggle', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Contract Updates')).toBeDefined();
    });
  });

  describe('preference selects', () => {
    it('renders Preferred Distance Unit', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Preferred Distance Unit')).toBeDefined();
    });

    it('renders Preferred Currency', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Preferred Currency')).toBeDefined();
    });

    it('renders Language', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Language')).toBeDefined();
    });

    it('renders Save Preferences button', () => {
      render(<SettingsPage />);
      expect(screen.getByText('Save Preferences')).toBeDefined();
    });
  });

  describe('danger zone', () => {
    it('renders Delete Account heading and button', () => {
      render(<SettingsPage />);
      const elements = screen.getAllByText('Delete Account');
      expect(elements.length).toBe(2);
    });

    it('renders destructive Delete Account button', () => {
      render(<SettingsPage />);
      const btn = screen.getByRole('button', { name: 'Delete Account' });
      expect(btn).toBeDefined();
    });
  });
});
