// app/components/auth/AuthForm.tsx v2.1.2
import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { UILabels } from '../../types';

interface AuthFormProps {
  mode: 'login' | 'register';
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  labels: UILabels;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  onSubmit,
  labels,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
          {labels.email}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
          {labels.password}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-medium ml-1 animate-shake">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {mode === 'login' ? labels.signIn : labels.signUp}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
};
