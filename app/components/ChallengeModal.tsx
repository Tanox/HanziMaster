// app/components/ChallengeModal.tsx v1.2.1

import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import { UILabels } from '../types';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: string;
  labels: UILabels;
  onSubmitScore: (score: number) => void;
}

const CHALLENGE_DURATION = 30; // 30 seconds per character

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, character, labels, onSubmitScore }) => {
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const writerRef = useRef<HanziWriter | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(CHALLENGE_DURATION);
      if (targetRef.current) {
        writerRef.current = HanziWriter.create(targetRef.current, character, {
          width: 200,
          height: 200,
          padding: 5,
          showOutline: true,
          strokeColor: '#166534',
          radicalColor: '#4d7c0f',
          delayBetweenStrokes: 200,
          strokeAnimationSpeed: 1,
        });
        writerRef.current.quiz();
      }

      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        if (writerRef.current) {
          // writerRef.current.target.innerHTML = '';
          writerRef.current = null;
        }
      };
    }
  }, [isOpen, character]);

  const handleTimeUp = () => {
    // Logic when time runs out
    alert(labels.timeUp || 'Time is up!');
    onSubmitScore(0); // Submit a score of 0
    onClose();
  };

  const handleSubmit = () => {
    if (!writerRef.current) return;

    writerRef.current.quiz({
      onComplete: (summary) => {
        const mistakes = summary.totalMistakes;
        const accuracy = Math.max(0, 1 - (mistakes / summary.character.strokes.length));
        const score = Math.round(accuracy * 5000) + (timeLeft * 100);
        onSubmitScore(score);
        alert(`Score: ${score}`);
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-white">{labels.writingChallenge || 'Writing Challenge'}</h2>
        <div className="flex justify-center items-center my-4">
          <div ref={targetRef} id="challenge-writer-target"></div>
        </div>
        <div className="text-center text-4xl font-bold my-4 text-slate-700 dark:text-slate-300">{timeLeft}s</div>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{labels.challengeInstruction || 'Write the character above!'}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold">{labels.cancelBtn || 'Cancel'}</button>
          <button onClick={handleSubmit} className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold">{labels.submitBtn || 'Submit'}</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
