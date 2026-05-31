import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from '@/components/stepper';

describe('Stepper', () => {
  const steps = [
    { label: 'Address' },
    { label: 'Date' },
    { label: 'Items' },
    { label: 'Review' },
  ];

  it('renders all step labels', () => {
    render(<Stepper steps={steps} currentStep={0} />);
    steps.forEach(step => {
      expect(screen.getByText(step.label)).toBeDefined();
    });
  });

  it('marks completed steps with checkmark', () => {
    const { container } = render(<Stepper steps={steps} currentStep={2} />);
    const circles = container.querySelectorAll('.size-8');
    expect(circles[0].textContent).toBe('✓');
    expect(circles[1].textContent).toBe('✓');
    expect(circles[2].textContent).toBe('3');
    expect(circles[3].textContent).toBe('4');
  });

  it('shows numbers for non-completed steps', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    const circles = container.querySelectorAll('.size-8');
    expect(circles[0].textContent).toBe('1');
    expect(circles[1].textContent).toBe('2');
    expect(circles[2].textContent).toBe('3');
    expect(circles[3].textContent).toBe('4');
  });

  it('renders connector lines between steps', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    const connectors = container.querySelectorAll('.h-px');
    expect(connectors.length).toBe(steps.length - 1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stepper steps={steps} currentStep={0} className="custom-class" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('custom-class');
  });
});
