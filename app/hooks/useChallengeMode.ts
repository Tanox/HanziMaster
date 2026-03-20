import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Score } from '../components/Leaderboard';
import { COMMON_CHARS } from '../constants/commonChars';

export const useChallengeMode = () => {
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
    state: { scores, isChallengeActive, challengeCharacter },
    actions: { startChallenge, endChallenge, submitScore, clearScores }
  };
};
