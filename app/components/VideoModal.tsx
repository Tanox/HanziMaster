// app/components/VideoModal.tsx
'use client';

import React from 'react';
import { X, Video } from 'lucide-react';
import { UILabels } from '../types';
import VeoVideoGenerator from './VeoVideoGenerator';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  char: string;
  labels: UILabels;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, char, labels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600">
               <Video size={20} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">{labels.generateVideo}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><X size={24} /></button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <span className="text-6xl font-hanzi text-slate-800 dark:text-slate-100">{char}</span>
          </div>
          <VeoVideoGenerator char={char} labels={labels} />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
