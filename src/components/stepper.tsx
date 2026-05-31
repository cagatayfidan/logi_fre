"use client"

import { cn } from "@/lib/utils"

interface Step {
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const stepNumber = index + 1

        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "border-2 border-primary bg-primary/10 text-primary",
                  !isCompleted && !isCurrent && "border border-border text-muted-foreground"
                )}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={cn(
                  "mt-1.5 text-xs",
                  isCurrent && "font-medium text-primary",
                  isCompleted && "text-muted-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 mt-[-1.5rem] h-px flex-1",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
