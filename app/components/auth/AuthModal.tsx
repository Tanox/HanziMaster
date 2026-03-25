// app/components/auth/AuthModal.tsx v2.1.2
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UILabels } from '../../types';
import { auth } from '../../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { AuthForm } from './AuthForm';
import { SocialLoginButtons } from './SocialLoginButtons';
import { AuthHeader } from './AuthHeader';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  labels: UILabels;
  onSuccess?: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, labels, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFirebaseError = (err: any) => {
    console.error('Auth Error:', err);
    const code = err.code;
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/email-already-in-use':
        return 'Email already in use.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelled.';
      default:
        return 'Authentication failed. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!auth) {
      setError('Authentication is not configured. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set default display name for new users
        await updateProfile(userCredential.user, {
          displayName: email.split('@')[0]
        });
      }
      
      const user = userCredential.user;
      const userData = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL || undefined
      };
      
      if (onSuccess) onSuccess(userData);
      onClose();
    } catch (err: any) {
      setError(handleFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (providerType: 'google' | 'github') => {
    setIsLoading(true);
    setError('');
    
    if (!auth) {
      setError('Authentication is not configured. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      const provider = providerType === 'google' 
        ? new GoogleAuthProvider() 
        : new GithubAuthProvider();
        
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userData = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined
      };
      
      if (onSuccess) onSuccess(userData);
      onClose();
    } catch (err: any) {
      setError(handleFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="relative p-8">
            <AuthHeader mode={mode} labels={labels} onClose={onClose} />

            <AuthForm
              mode={mode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
              error={error}
              onSubmit={handleSubmit}
              labels={labels}
            />

            <div className="mt-6">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <span className="relative px-4 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              <SocialLoginButtons onSocialLogin={handleSocialLogin} isLoading={isLoading} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {mode === 'login' ? labels.noAccount : labels.hasAccount}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                >
                  {mode === 'login' ? labels.register : labels.login}
                </button>
              </p>
              
              <button
                onClick={onClose}
                className="mt-4 text-slate-400 dark:text-slate-500 text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {labels.guestMode}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
