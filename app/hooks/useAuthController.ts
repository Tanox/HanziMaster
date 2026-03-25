// app/hooks/useAuthController.ts v2.1.2
import { useState, useEffect } from 'react';
import { User } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuthController = () => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    state: {
      user,
      isAuthOpen,
    },
    actions: {
      setUser,
      setIsAuthOpen,
      handleLogout,
    },
  };
};
