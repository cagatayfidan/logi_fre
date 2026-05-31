import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoveDetailPage from '@/app/moves/[id]/page';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'MR-001' }),
  useRouter: () => ({ push: vi.fn() }),
}));

describe('MoveDetailPage', () => {
  it('renders the move title', () => {
    render(<MoveDetailPage />);
    expect(screen.getByText('Home → Apartment')).toBeDefined();
  });

  it('renders Edit button for active moves', () => {
    render(<MoveDetailPage />);
    expect(screen.getByText('Edit')).toBeDefined();
  });

  it('renders Cancel Request button for active moves', () => {
    render(<MoveDetailPage />);
    expect(screen.getByText('Cancel Request')).toBeDefined();
  });
});
