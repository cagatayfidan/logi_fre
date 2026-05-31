import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/empty-state';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState
        title="No moves yet"
        description="Post your first move to get started"
      />
    );
    expect(screen.getByText('No moves yet')).toBeDefined();
    expect(screen.getByText('Post your first move to get started')).toBeDefined();
  });

  it('renders default icon', () => {
    const { container } = render(
      <EmptyState
        title="No moves yet"
        description="Post your first move to get started"
      />
    );
    const icon = container.querySelector('.text-4xl');
    expect(icon?.textContent).toBe('📦');
  });

  it('renders custom icon', () => {
    const { container } = render(
      <EmptyState
        icon="🚚"
        title="No moves yet"
        description="Post your first move to get started"
      />
    );
    const icon = container.querySelector('.text-4xl');
    expect(icon?.textContent).toBe('🚚');
  });

  it('renders action element', () => {
    render(
      <EmptyState
        title="No moves yet"
        description="Post your first move to get started"
        action={<button>Create Move</button>}
      />
    );
    expect(screen.getByText('Create Move')).toBeDefined();
  });
});
