// src/components/ui/skeleton.tsx v5.2.5
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-xl bg-ink-100 dark:bg-ink-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
