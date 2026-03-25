// app/components/auth/AuthHeader.tsx v2.1.2
import React from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { UILabels } from '../../types';

interface AuthHeaderProps {
  mode: 'login' | 'register';
  labels: UILabels;
  onClose: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ mode, labels, onClose }) => {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
      >
        <X size={20} />
      </button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl mb-4">
          {mode === 'login' ? <LogIn size={32} /> : <UserPlus size={32} />}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {mode === 'login' ? labels.login : labels.register}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {labels.authSubtitle}
        </p>
      </div>
    </>
  );
};
