// src/components/nav-link.tsx v3.0.0
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
        'px-4 py-2.5 rounded-xl font-medium transition-all duration-200 relative group',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      {children}
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full" />
      )}
    </Link>
  );
}
