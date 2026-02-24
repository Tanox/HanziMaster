// app/components/Leaderboard.tsx v1.2.1

import React from 'react';
import { UILabels } from '../types';

export interface Score {
  character: string;
  score: number;
  timestamp: number;
}

interface LeaderboardProps {
  scores: Score[];
  labels: UILabels;
  onClearScores: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores, labels, onClearScores }) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div id="leaderboard-section" className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{labels.leaderboard || 'Leaderboard'}</h3>
        {scores.length > 0 && (
          <button onClick={onClearScores} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">{labels.clearScores || 'Clear'}</button>
        )}
      </div>
      {sortedScores.length > 0 ? (
        <ol className="space-y-2">
          {sortedScores.map((score, index) => (
            <li key={score.timestamp} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <span className="font-semibold">{index + 1}.</span>
              <span className="font-hanzi text-2xl mx-4">{score.character}</span>
              <span className="font-bold text-emerald-600">{score.score}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-center py-4">{labels.noScores || 'No scores yet. Take a challenge!'}</p>
      )}
    </div>
  );
};

export default Leaderboard;
