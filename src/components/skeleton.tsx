'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'circle';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const variantStyles = {
    default: 'rounded-md',
    card: 'rounded-[20px]',
    text: 'rounded-md',
    avatar: 'rounded-full',
    circle: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-muted dark:bg-foreground/10',
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}

/* Pre-built skeleton patterns */
export function SkeletonCard() {
  return (
    <div className="bg-muted/50 dark:bg-foreground/5 rounded-[20px] p-6 border border-border space-y-4" aria-hidden="true">
      <Skeleton variant="circle" className="w-14 h-14 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5 mx-auto" />
    </div>
  );
}

export function SkeletonCharacterGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-muted dark:bg-card aspect-square rounded-3xl border border-border animate-pulse" />
      ))}
    </div>
  );
}

export function SkeletonStats({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-3 gap-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-background dark:bg-foreground/5 rounded-[20px] p-6 border border-border space-y-4">
          <Skeleton variant="circle" className="w-14 h-14 mx-auto" />
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  );
}
