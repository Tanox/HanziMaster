import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-2.5 text-base transition-[border-color,box-shadow] duration-300 ease-out outline-none file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink-700 dark:file:text-ink-200 placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:border-vermilion-500 focus:ring-2 focus:ring-vermilion-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-ink-300 dark:disabled:border-ink-600 disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
