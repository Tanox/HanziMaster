// src/components/mobile-nav.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export function MobileNav({ isOpen, onClose, t }: MobileNavProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const links = [
    { href: '/', key: 'common.home' },
    { href: '/learn', key: 'common.learn' },
    { href: '/practice', key: 'common.practice' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-72 max-w-[85vw] bg-white dark:bg-slate-900 rounded-l-[24px] p-0">
        <SheetHeader className="p-5 border-b border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/30">
              <span className="text-white text-base font-bold hanzi-font">汉</span>
            </div>
            <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              HanziMaster
            </span>
          </div>
          <SheetTitle className="sr-only">
            {t('common.navigation') || 'Navigation menu'}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t('common.navigation') || 'Navigation menu'}
          </SheetDescription>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4" role="navigation">
          <ul className="flex flex-col gap-1.5" role="menubar">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "touch-target flex items-center px-4 py-3 rounded-full font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
                      isActive
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-5 border-t border-slate-200/80 dark:border-slate-700/80 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            HanziMaster v2.4.0
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
