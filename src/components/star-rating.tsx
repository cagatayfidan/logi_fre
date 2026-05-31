"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md"
}

export function StarRating({ value, onChange, readonly = false, size = "sm" }: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const dimension = size === "sm" ? "size-4" : "size-5"

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(star)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-colors`}
        >
          <Star
            className={`${dimension} ${
              star <= (hover || value)
                ? "fill-amber-500 text-amber-500"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
