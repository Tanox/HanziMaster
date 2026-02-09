import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface InstallPWAProps {
  installLabel: string;
}

const InstallPWA: React.FC<InstallPWAProps> = ({ installLabel }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Handler for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Handler for detecting if the app was successfully installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Initial check: if running in standalone mode, we are already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  // Don't render if already installed or no prompt available
  if (isInstalled || !deferredPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="p-3 md:p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation flex items-center gap-2 animate-fade-in"
      title={installLabel}
      aria-label={installLabel}
    >
      <Download size={20} />
      <span className="hidden md:inline text-sm font-medium">{installLabel}</span>
    </button>
  );
};

export default InstallPWA;