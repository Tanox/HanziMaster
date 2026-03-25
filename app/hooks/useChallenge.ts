// app/hooks/useChallenge.ts v2.1.2
import { useState } from 'react';
import { Score } from '../components/Leaderboard';
import { COMMON_CHARS } from '../constants/commonChars';
import { useLocalStorage } from './useLocalStorage';

export const useChallenge = () => {
  const [scores, setScores] = useLocalStorage<Score[]>('leaderboardScores', []);
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);
  const [challengeCharacter, setChallengeCharacter] = useState<string>('');

  const startChallenge = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const char = COMMON_CHARS[randomIndex];
    setChallengeCharacter(char);
    setIsChallengeActive(true);
  };

  const endChallenge = () => {
    setIsChallengeActive(false);
  };

  const submitScore = (score: number) => {
    const newScore: Score = {
      character: challengeCharacter,
      score,
      timestamp: Date.now(),
    };
    setScores(prevScores => [...prevScores, newScore]);
  };

  const clearScores = () => {
    setScores([]);
  };

  return {
    state: {
      scores,
      isChallengeActive,
      challengeCharacter,
    },
    actions: {
      startChallenge,
      endChallenge,
      submitScore,
      clearScores,
    },
  };
};
