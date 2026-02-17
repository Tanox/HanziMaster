/**
 * app/components/InstallPWA.tsx v0.7.1
 */
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

interface InstallPWAProps {
  installLabel: string;
}

const InstallPWA: React.FC<InstallPWAProps> = ({ installLabel }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled(true);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <button onClick={handleInstallClick} className="p-3 md:p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation flex items-center gap-2 animate-fade-in" title={installLabel}>
      <Download size={20} />
      <span className="hidden md:inline text-sm font-medium">{installLabel}</span>
    </button>
  );
};

export default InstallPWA;