// src/components/nav-link.tsx v3.0.0
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
      className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
        isActive
          ? 'bg-[#007aff]/10 dark:bg-[#5856d6]/20 text-[#007aff] dark:text-[#2997ff]'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {children}
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#007aff] dark:bg-[#5856d6] rounded-full" />
      )}
    </Link>
  );
}
