// app/components/ChallengeModal.tsx v1.3.0

'use client';

import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import { UILabels } from '../types';
import { fetchHanziData } from '../services/hanziService';

import Leaderboard, { Score } from './Leaderboard';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: string;
  labels: UILabels;
  onSubmitScore: (score: number) => void;
  scores: Score[];
  onClearScores: () => void;
}

const CHALLENGE_DURATION = 30; // 30 seconds per character

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, character, labels, onSubmitScore, scores, onClearScores }) => {
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const timeLeftRef = useRef(CHALLENGE_DURATION);
  const writerRef = useRef<HanziWriter | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const handleTimeUp = React.useCallback(() => {
    // Logic when time runs out
    alert(labels.timeUp || 'Time is up!');
    onSubmitScore(0); // Submit a score of 0
    onClose();
  }, [labels.timeUp, onSubmitScore, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(CHALLENGE_DURATION);
      timeLeftRef.current = CHALLENGE_DURATION;
      
      if (targetRef.current) {
        targetRef.current.innerHTML = '';
        writerRef.current = HanziWriter.create(targetRef.current, character, {
          width: 200,
          height: 200,
          padding: 5,
          showOutline: true,
          strokeColor: '#166534',
          radicalColor: '#4d7c0f',
          delayBetweenStrokes: 200,
          strokeAnimationSpeed: 1,
          charDataLoader: (char: string, onComplete: (data: any) => void) => {
            fetchHanziData(char).then(data => {
              if (data) {
                onComplete(data);
              } else {
                alert('Failed to load character data.');
                onClose();
              }
            });
          }
        });
        
        writerRef.current.quiz({
          onComplete: (summary) => {
            const mistakes = summary.totalMistakes;
            // Simplified scoring: Base 1000, minus 50 per mistake, plus 20 per second left
            const score = Math.max(0, 1000 - (mistakes * 50)) + (timeLeftRef.current * 20);
            onSubmitScore(score);
            alert(`Challenge Complete! Score: ${score}`);
            onClose();
          }
        });
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
          writerRef.current = null;
        }
      };
    }
  }, [isOpen, character, handleTimeUp, onClose, onSubmitScore]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-sm w-full my-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-white">{labels.writingChallenge || 'Writing Challenge'}</h2>
        <div className="flex justify-center items-center my-4">
          <div ref={targetRef} id="challenge-writer-target"></div>
        </div>
        <div className="text-center text-4xl font-bold my-4 text-slate-700 dark:text-slate-300">{timeLeft}s</div>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-6">{labels.challengeInstruction || 'Write the character above!'}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold">{labels.cancelBtn || 'Give Up'}</button>
        </div>
        
        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
          <Leaderboard scores={scores} labels={labels} onClearScores={onClearScores} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
