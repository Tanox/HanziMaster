// src/components/feature-card.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  titleKey: string;
  descKey: string;
  iconBg: string;
  textColor: string;
  icon: React.ReactNode;
  gradient?: string;
  className?: string;
}

export function FeatureCard({
  titleKey,
  descKey,
  iconBg,
  textColor,
  icon,
  gradient,
  className,
}: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300 ease-out group",
        gradient,
        className
      )}
    >
      <CardContent className="p-6 sm:p-8">
        <div
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ease-out",
            iconBg
          )}
          aria-hidden="true"
        >
          <div className={textColor}>{icon}</div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-900 dark:text-white tracking-tight">
          {titleKey}
        </h3>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          {descKey}
        </p>
      </CardContent>
    </Card>
  );
}
