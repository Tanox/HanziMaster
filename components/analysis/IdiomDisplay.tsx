/**
 * HanziMaster v0.3.5
 */
import React from 'react';
import { ScrollText, Quote } from 'lucide-react';
import { IdiomAnalysis } from '../../types';
import PronunciationButton from '../PronunciationButton';
import ShareButton from '../ShareButton';
import { UILabels } from '../../locales/types';

interface IdiomDisplayProps {
  data: IdiomAnalysis;
  apiKey?: string;
  labels: UILabels;
}

const IdiomDisplay: React.FC<IdiomDisplayProps> = ({ data, apiKey, labels }) => {

  const shareText = `I just learned the idiom '${data.idiom}' (${data.pinyin}) on HanziMaster! It means "${data.meaning}". What a cool story! Check it out.`;
  const shareTitle = labels.shareTitleIdiom.replace('{idiom}', data.idiom);
  const shareUrl = `${window.location.origin}?char=${encodeURIComponent(data.idiom)}`;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50 shadow-sm animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/10 rounded-bl-full -mr-8 -mt-8"></div>
        
        <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded">
                            {labels.idiomTitle || 'Idiom'}
                        </span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-hanzi font-bold text-slate-800 dark:text-white mb-2">{data.idiom}</h2>
                     <div className="flex items-center gap-1 -ml-2">
                         <PronunciationButton text={data.idiom} size={20} apiKey={apiKey} />
                         <ShareButton
                           title={shareTitle}
                           text={shareText}
                           url={shareUrl}
                           labels={labels}
                           className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                         />
                         <span className="text-xl text-teal-600 dark:text-teal-400 font-medium tracking-wide ml-1">{data.pinyin}</span>
                     </div>
                </div>
                <div className="md:text-right max-w-lg">
                     <p className="text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        {data.meaning}
                     </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="space-y-2">
                     <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                         <ScrollText size={18} />
                         <h3 className="font-bold text-sm uppercase tracking-wide">{labels.idiomOrigin || labels.origin}</h3>
                     </div>
                     <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                         {data.origin}
                     </p>
                </div>
                <div className="space-y-2">
                     <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                         <Quote size={18} />
                         <h3 className="font-bold text-sm uppercase tracking-wide">{labels.idiomUsage || 'Usage'}</h3>
                     </div>
                     <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                         {data.usage}
                     </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default IdiomDisplay;
