// src/components/nav-link.tsx v5.2.31
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2.5 rounded-xl font-medium transition-[background-color,color,transform] duration-200 relative group ${
        isActive
          ? 'bg-vermilion-500/10 dark:bg-vermilion-500/20 text-vermilion-500 dark:text-vermilion-400'
          : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-ink-50'
      }`}
    >
      {children}
      {/* Active underline + hover reveal（平滑下划线动画） */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-vermilion-500 origin-left transition-transform duration-300 ease-out ${
          isActive
            ? 'scale-x-100'
            : 'scale-x-0 group-hover:scale-x-50 group-hover:bg-vermilion-500/40'
        }`}
      />
    </Link>
  );
}
