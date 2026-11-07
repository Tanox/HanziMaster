// src/components/learn/__tests__/quiz-dialog.test.tsx v5.2.36
import { useState, type ComponentProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/components/locale-provider';
import { useProgress } from '@/hooks/use-progress';
import { characters } from '@/lib/characters';
import { translations } from '@/lib/i18n';
import { QuizDialog } from '../quiz-dialog';

type QuizProps = ComponentProps<typeof QuizDialog>;

const en = translations.en;
const char = characters[0];

beforeAll(() => {
  // Radix Portal 在 jsdom 下探测 ResizeObserver，提供最小实现
  if (!('ResizeObserver' in globalThis)) {
    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    Object.defineProperty(globalThis, 'ResizeObserver', {
      value: MockResizeObserver,
      configurable: true,
    });
  }
});

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  document.cookie = 'hanzi-master-locale=; max-age=0; path=/';
});

function renderDialog(overrides: Partial<QuizProps> = {}) {
  const props: QuizProps = {
    open: true,
    onOpenChange: vi.fn(),
    character: char,
    value: '',
    onChange: vi.fn(),
    correct: null,
    onSubmit: vi.fn(),
    ...overrides,
  };
  const view = render(
    <LocaleProvider defaultLocale="en">
      <QuizDialog {...props} />
    </LocaleProvider>
  );
  return { props, ...view };
}

const input = () => screen.getByRole('textbox');
const closeButton = () =>
  document.querySelector('[data-slot="dialog-close"]') as HTMLButtonElement | null;

describe('learn QuizDialog · 渲染与交互', () => {
  it('renders the title, character and pinyin input when open', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(en.learn.quizTitle)).toBeInTheDocument();
    expect(screen.getByText(char.hanzi)).toBeInTheDocument();
    expect(input()).toHaveAttribute('aria-label', en.learn.pinyin);
  });

  it('renders nothing when closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the dialog usable without a selected character', () => {
    renderDialog({ character: null });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(input()).toBeInTheDocument();
  });

  it('forwards typed pinyin to onChange', () => {
    const { props } = renderDialog();
    fireEvent.change(input(), { target: { value: 'yī' } });
    expect(props.onChange).toHaveBeenCalledWith('yī');
  });

  it('submits on Enter', () => {
    const { props } = renderDialog({ value: 'yī' });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('submits via the submit button', () => {
    const { props } = renderDialog({ value: 'yī' });
    fireEvent.click(screen.getByRole('button', { name: en.common.submit }));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows the success feedback and styling for a correct answer', () => {
    renderDialog({ correct: true });
    expect(screen.getByText(en.learn.quizCorrect)).toBeInTheDocument();
    expect(input().className).toContain('border-vermilion-500');
  });

  it('shows the error feedback and styling for a wrong answer', () => {
    renderDialog({ correct: false });
    expect(screen.getByText(en.learn.quizIncorrect)).toBeInTheDocument();
    expect(input().className).toContain('border-destructive');
  });

  it('hides feedback while unanswered', () => {
    renderDialog({ correct: null });
    expect(screen.queryByText(en.learn.quizCorrect)).not.toBeInTheDocument();
    expect(screen.queryByText(en.learn.quizIncorrect)).not.toBeInTheDocument();
  });

  it('closes via cancel and the header close button', () => {
    const { props } = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: en.common.cancel }));
    expect(props.onOpenChange).toHaveBeenCalledWith(false);
    fireEvent.click(closeButton()!);
    expect(props.onOpenChange).toHaveBeenCalledTimes(2);
  });
});

// 复刻 learn/page.tsx 的提交逻辑，验证得分确实回写进度系统
function QuizHarness() {
  const { recordQuizResult, getAccuracy } = useProgress();
  const [value, setValue] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);
  return (
    <>
      <span data-testid="accuracy">{getAccuracy()}</span>
      <QuizDialog
        open
        onOpenChange={vi.fn()}
        character={char}
        value={value}
        onChange={(v) => {
          setValue(v);
          setCorrect(null);
        }}
        correct={correct}
        onSubmit={() => {
          const ok = value.toLowerCase() === char.pinyin.toLowerCase();
          setCorrect(ok);
          recordQuizResult(char.id, ok);
        }}
      />
    </>
  );
}

const renderHarness = () =>
  render(
    <LocaleProvider defaultLocale="en">
      <QuizHarness />
    </LocaleProvider>
  );

describe('learn QuizDialog · 得分回写', () => {
  it('records a correct answer as 100% accuracy', () => {
    renderHarness();
    expect(screen.getByTestId('accuracy')).toHaveTextContent('0');
    fireEvent.change(input(), { target: { value: char.pinyin } });
    fireEvent.click(screen.getByRole('button', { name: en.common.submit }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('100');
    expect(screen.getByText(en.learn.quizCorrect)).toBeInTheDocument();
    expect(window.localStorage.getItem('hanzi-master-progress')).toContain('"correct":true');
  });

  it('records a wrong answer as 0% accuracy', () => {
    renderHarness();
    fireEvent.change(input(), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: en.common.submit }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('0');
    expect(screen.getByText(en.learn.quizIncorrect)).toBeInTheDocument();
  });

  it('clears the previous feedback when the answer changes', () => {
    renderHarness();
    fireEvent.change(input(), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: en.common.submit }));
    expect(screen.getByText(en.learn.quizIncorrect)).toBeInTheDocument();
    fireEvent.change(input(), { target: { value: char.pinyin } });
    expect(screen.queryByText(en.learn.quizIncorrect)).not.toBeInTheDocument();
  });
});
