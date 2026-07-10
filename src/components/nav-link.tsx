// src/components/nav-link.tsx v4.0.0
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
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-vermilion-500 rounded-full" />
      )}
    </Link>
  );
}
