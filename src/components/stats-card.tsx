// src/components/stats-card.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ label, value, icon, className }: StatsCardProps) {
  return (
    <Card 
      className={cn(
        "bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300 ease-out",
        className
      )}
      role="group"
      aria-label={`${label}: ${value}`}
    >
      <CardContent className="p-4 sm:p-6 flex items-center gap-4">
        <div
          className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ease-out hover:scale-105"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight"
            aria-label={value}
          >
            {value}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
