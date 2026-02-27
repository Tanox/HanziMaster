import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { UI_LABELS } from '../../locales';

describe('Header', () => {
  const labels = UI_LABELS['en'];

  it('renders the app title', () => {
    render(
      <Header
        labels={labels}
        onOpenSettings={() => {}}
        isOffline={false}
        version="1.3.1"
        onStartChallenge={() => {}}
      />
    );

    const titleElement = screen.getByText(labels.appTitle);
    expect(titleElement).toBeInTheDocument();
  });
});
