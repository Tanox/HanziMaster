import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { SRSItem, UILabels } from '../../types';
import { Trophy, Target, Zap, Brain } from 'lucide-react';

interface ProgressStatsProps {
  srsData: Record<string, SRSItem>;
  totalLearned: number;
  labels: UILabels;
}

const COLORS = ['#94a3b8', '#38bdf8', '#4ade80', '#facc15']; // Slate, Sky, Green, Yellow

const ProgressStats: React.FC<ProgressStatsProps> = ({ srsData, totalLearned, labels }) => {
  const data = useMemo(() => {
    let newCount = 0;
    let apprenticeCount = 0;
    let guruCount = 0;
    let masterCount = 0;

    Object.values(srsData).forEach(item => {
      if (item.interval < 1) newCount++;
      else if (item.interval < 7) apprenticeCount++;
      else if (item.interval < 21) guruCount++;
      else masterCount++;
    });

    // If totalLearned > srsData size, the difference is likely "New" or untracked
    // But srsData should track all practiced items.
    
    return [
      { name: labels.statsNew || 'New', value: newCount },
      { name: labels.statsApprentice || 'Apprentice', value: apprenticeCount },
      { name: labels.statsGuru || 'Guru', value: guruCount },
      { name: labels.statsMaster || 'Master', value: masterCount },
    ].filter(d => d.value > 0);
  }, [srsData, labels]);

  if (totalLearned === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} />
          {labels.progressTitle || "Learning Progress"}
        </h3>
        <span className="text-sm text-slate-500 font-medium">
          {totalLearned} {labels.statsTotal || "Total Items"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }} 
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl flex flex-col justify-center items-center">
                <Target className="text-slate-400 mb-2" size={24} />
                <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                    {data.find(d => d.name === (labels.statsNew || 'New'))?.value || 0}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{labels.statsNew || 'New'}</span>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl flex flex-col justify-center items-center">
                <Zap className="text-sky-500 mb-2" size={24} />
                <span className="text-2xl font-bold text-sky-700 dark:text-sky-300">
                    {data.find(d => d.name === (labels.statsApprentice || 'Apprentice'))?.value || 0}
                </span>
                <span className="text-xs text-sky-600 dark:text-sky-400 uppercase tracking-wider">{labels.statsApprentice || 'Apprentice'}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl flex flex-col justify-center items-center">
                <Brain className="text-emerald-500 mb-2" size={24} />
                <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {data.find(d => d.name === (labels.statsGuru || 'Guru'))?.value || 0}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{labels.statsGuru || 'Guru'}</span>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex flex-col justify-center items-center">
                <Trophy className="text-yellow-500 mb-2" size={24} />
                <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                    {data.find(d => d.name === (labels.statsMaster || 'Master'))?.value || 0}
                </span>
                <span className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">{labels.statsMaster || 'Master'}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
