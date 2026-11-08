// src/components/practice/__tests__/quiz-dialog.test.tsx v5.2.44
import { useState, type ComponentProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/components/locale-provider';
import { useProgress } from '@/hooks/use-progress';
import { translations } from '@/lib/i18n';
import type { CharacterQuiz } from '../practice-assets';
import { QuizDialog } from '../quiz-dialog';

type QuizProps = ComponentProps<typeof QuizDialog>;

const en = translations.en;
const quizChar: CharacterQuiz = {
  id: 1,
  hanzi: '一',
  pinyin: 'yī',
  translationKey: 'learn.one',
  meaningKey: 'practice.meanings.one',
};
const OPTIONS = ['一', '二', '三', '人', '大', '小', '口', '日'];

beforeAll(() => {
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
    character: quizChar,
    selectedAnswer: '',
    answered: false,
    onAnswer: vi.fn(),
    onNext: vi.fn(),
    ...overrides,
  };
  const view = render(
    <LocaleProvider defaultLocale="en">
      <QuizDialog {...props} />
    </LocaleProvider>
  );
  return { props, ...view };
}

const optionButtons = () =>
  OPTIONS.map((char) => screen.getByRole('radio', { name: new RegExp(char) }) as HTMLButtonElement);

describe('practice QuizDialog · 渲染与交互', () => {
  it('renders the title, prompt character, pinyin and meaning', () => {
    renderDialog();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(en.practice.quizTitle)).toBeInTheDocument();
    expect(screen.getByText(quizChar.pinyin)).toBeInTheDocument();
    expect(screen.getByText(en.practice.meanings.one)).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    renderDialog({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all eight candidate characters', () => {
    renderDialog();
    expect(optionButtons()).toHaveLength(8);
  });

  it('forwards the chosen character to onAnswer', () => {
    const { props } = renderDialog();
    fireEvent.click(screen.getByRole('radio', { name: '三' }));
    expect(props.onAnswer).toHaveBeenCalledWith('三');
  });

  it('disables every option once answered', () => {
    renderDialog({ answered: true, selectedAnswer: '一' });
    expect(optionButtons().every((button) => button.disabled)).toBe(true);
  });

  it('shows the correct feedback for the right answer', () => {
    renderDialog({ answered: true, selectedAnswer: quizChar.hanzi });
    expect(screen.getByText(en.practice.correct)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: quizChar.hanzi }).className).toContain('bg-vermilion-500');
  });

  it('shows the wrong feedback for an incorrect answer', () => {
    renderDialog({ answered: true, selectedAnswer: '二' });
    expect(screen.getByText(en.practice.wrong)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '二' }).className).toContain('bg-destructive');
  });

  it('hides feedback while unanswered', () => {
    renderDialog({ answered: false, selectedAnswer: '二' });
    expect(screen.queryByText(en.practice.correct)).not.toBeInTheDocument();
    expect(screen.queryByText(en.practice.wrong)).not.toBeInTheDocument();
  });

  it('advances and closes through the footer buttons', () => {
    const { props } = renderDialog();
    fireEvent.click(screen.getByRole('button', { name: en.practice.nextQuestion }));
    expect(props.onNext).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: en.common.cancel }));
    expect(props.onOpenChange).toHaveBeenCalledWith(false);
    const close = document.querySelector('[data-slot="dialog-close"]') as HTMLButtonElement;
    fireEvent.click(close);
    expect(props.onOpenChange).toHaveBeenCalledTimes(2);
  });
});

// 复刻 practice/page.tsx 的 handleQuizAnswer，验证正确率统计与进度回写
function QuizHarness() {
  const { recordQuizResult, getAccuracy } = useProgress();
  const [selected, setSelected] = useState('');
  const [answered, setAnswered] = useState(false);
  return (
    <>
      <span data-testid="accuracy">{getAccuracy()}</span>
      <QuizDialog
        open
        onOpenChange={vi.fn()}
        character={quizChar}
        selectedAnswer={selected}
        answered={answered}
        onAnswer={(hanzi) => {
          if (answered) return;
          setSelected(hanzi);
          recordQuizResult(quizChar.id, hanzi === quizChar.hanzi);
          setAnswered(true);
        }}
        onNext={() => {
          setSelected('');
          setAnswered(false);
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

describe('practice QuizDialog · 得分回写', () => {
  it('records a correct selection as 100% accuracy', () => {
    renderHarness();
    fireEvent.click(screen.getByRole('radio', { name: quizChar.hanzi }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('100');
    expect(screen.getByText(en.practice.correct)).toBeInTheDocument();
    expect(window.localStorage.getItem('hanzi-master-progress')).toContain('"correct":true');
  });

  it('records a wrong selection as 0% accuracy', () => {
    renderHarness();
    fireEvent.click(screen.getByRole('radio', { name: '二' }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('0');
    expect(screen.getByText(en.practice.wrong)).toBeInTheDocument();
  });

  it('ignores a second click while answered', () => {
    renderHarness();
    fireEvent.click(screen.getByRole('radio', { name: quizChar.hanzi }));
    fireEvent.click(screen.getByRole('radio', { name: '二' }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('100');
    expect(screen.getByText(en.practice.correct)).toBeInTheDocument();
  });

  it('accumulates 50% accuracy across two questions', () => {
    renderHarness();
    fireEvent.click(screen.getByRole('radio', { name: '二' }));
    fireEvent.click(screen.getByRole('button', { name: en.practice.nextQuestion }));
    expect(screen.queryByText(en.practice.wrong)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: quizChar.hanzi }));
    expect(screen.getByTestId('accuracy')).toHaveTextContent('50');
  });
});
