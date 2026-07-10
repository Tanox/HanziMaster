import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-1 text-xs font-semibold whitespace-nowrap transition-[background-color,border-color,transform] duration-200 ease-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-vermilion-500/30 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&>svg]:pointer-events-none [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-vermilion-500 text-white",
        secondary:
          "bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300",
        destructive:
          "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50",
        outline:
          "border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-900",
        ghost:
          "hover:bg-ink-50 dark:hover:bg-ink-900/50 text-ink-600 dark:text-ink-300",
        success: "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400",
        warning: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
        info: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
        link: "text-vermilion-500 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
