import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-300 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-vermilion-500/30 active:not-aria-[haspopup]:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-vermilion-500 aria-invalid:ring-vermilion-500/20 dark:aria-invalid:border-vermilion-500/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-vermilion-500 text-white hover:bg-vermilion-600 hover:shadow-lg hover:-translate-y-0.5",
        outline:
          "border-ink-200 dark:border-ink-700 bg-transparent hover:bg-ink-50 dark:hover:bg-ink-900 text-ink-700 dark:text-ink-200 hover:text-ink-900 dark:hover:text-ink-50",
        secondary:
          "bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 hover:bg-ink-200 dark:hover:bg-ink-700",
        ghost:
          "hover:bg-ink-50 dark:hover:bg-ink-900/50 text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50",
        destructive:
          "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/30",
        link: "text-vermilion-500 underline-offset-4 hover:underline hover:text-vermilion-600",
      },
      size: {
        default:
          "h-10 gap-2 px-5",
        xs: "h-7 gap-1.5 rounded-lg px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-lg px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 rounded-2xl px-8 text-base",
        icon: "size-10 rounded-xl",
        "icon-xs":
          "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
