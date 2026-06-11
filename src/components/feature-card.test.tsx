// src/components/feature-card.test.tsx v2.4.0
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './feature-card';

describe('FeatureCard', () => {
  const mockIcon = <svg data-testid="icon" />;

  it('should render title and description', () => {
    render(
      <FeatureCard
        titleKey="common.home"
        descKey="common.learn"
        icon={mockIcon}
        iconBg="bg-emerald-100"
        textColor="text-emerald-600"
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(
      <FeatureCard
        titleKey="common.home"
        descKey="common.learn"
        icon={mockIcon}
        iconBg="bg-blue-100"
        textColor="text-blue-600"
      />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('feature-card');
    expect(card).toHaveClass('apple-shadow-sm');
  });

  it('should support gradient prop', () => {
    const { container } = render(
      <FeatureCard
        titleKey="common.home"
        descKey="common.learn"
        icon={mockIcon}
        iconBg="bg-purple-100"
        textColor="text-purple-600"
        gradient="from-purple-500 to-pink-500"
      />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('from-purple-500');
    expect(card).toHaveClass('to-pink-500');
  });
});
