"use client"

import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon = "📦", title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className
      )}
    >
      <span className="mb-4 text-4xl">{icon}</span>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  )
}
