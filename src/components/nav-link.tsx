// src/components/nav-link.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"

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
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        "touch-target px-4 py-2.5 rounded-full font-medium transition-all duration-200 ease-out relative inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
        isActive
          ? 'bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
      )}
    >
      {children}
    </Link>
  );
}
