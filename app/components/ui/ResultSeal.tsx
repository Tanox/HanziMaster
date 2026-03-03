// app/components/ui/ResultSeal.tsx v1.3.8
import React from 'react';
import { Grade, PracticeResult, CharacterAnalysis } from '../../types';

interface ResultSealProps {
  result: PracticeResult;
  labels: {
    gradeExquisite: string;
    gradeMasterful: string;
    gradeProficient: string;
    gradePoor: string;
    shareAction: string;
  };
  analysis?: CharacterAnalysis | null;
}

const ResultSeal: React.FC<ResultSealProps> = ({ result, labels, analysis }) => {
  const gradeLabel = {
      [Grade.EXQUISITE]: labels.gradeExquisite || '神品',
      [Grade.MASTERFUL]: labels.gradeMasterful || '妙品',
      [Grade.PROFICIENT]: labels.gradeProficient || '能品',
      [Grade.POOR]: labels.gradePoor || '须努力',
  }[result.grade];

  return (
      <div id="result-seal-overlay" className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative animate-stamp">
              {/* Traditional Vermilion Seal Design */}
              <div className="w-32 h-32 border-[6px] border-vermilion-600 rounded-xl flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] shadow-2xl overflow-hidden transform -rotate-12">
                 <div className="absolute inset-0 bg-vermilion-600 opacity-[0.03] bg-texture-paper"></div>
                 <span className="text-4xl font-hanzi font-bold text-vermilion-600 leading-none mb-1">{gradeLabel}</span>
                 <div className="w-20 h-px bg-vermilion-400 opacity-40 my-1"></div>
                 <span className="text-xl font-sans font-black text-vermilion-500">{result.score}</span>
              </div>
              {/* Seal Splatter Shadow Effect */}
              <div className="absolute -inset-4 bg-vermilion-600/5 blur-2xl rounded-full -z-10"></div>
          </div>
      </div>
  );
};

export default ResultSeal;
