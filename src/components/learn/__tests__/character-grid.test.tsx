// src/components/learn/__tests__/character-grid.test.tsx v5.2.31
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LocaleProvider } from '@/components/locale-provider';
import { CharacterGrid } from '../character-grid';
import { characters } from '@/lib/characters';

const renderGrid = (onSelect: (id: number) => void) =>
  render(
    <LocaleProvider defaultLocale="en">
      <CharacterGrid selectedId={characters[0].id} onSelect={onSelect} />
    </LocaleProvider>
  );

describe('CharacterGrid', () => {
  it('should render all characters as selectable options', () => {
    renderGrid(vi.fn());
    expect(screen.getAllByRole('option')).toHaveLength(characters.length);
  });

  it('should mark the selected option with aria-selected', () => {
    renderGrid(vi.fn());
    expect(screen.getByRole('option', { selected: true })).toHaveAccessibleName(
      `${characters[0].hanzi}, ${characters[0].pinyin}`
    );
  });

  it('should call onSelect with the clicked character id', () => {
    const onSelect = vi.fn();
    renderGrid(onSelect);
    const target = characters[1];
    fireEvent.click(screen.getByRole('option', { name: `${target.hanzi}, ${target.pinyin}` }));
    expect(onSelect).toHaveBeenCalledWith(target.id);
  });
});
