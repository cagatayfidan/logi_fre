"use client"

import Link from "next/link"
import { ArrowLeft, MessageSquare, Flag, EyeOff, Eye } from "lucide-react"
import { useState, useCallback } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { useData } from "@/lib/use-data"
import { apiGet, apiPost } from "@/lib/api-client"
import { toast } from "sonner"

interface AdminReview {
  id: string
  from: string
  to: string
  rating: number
  comment: string
  isFlagged: boolean
  isHidden: boolean
  createdAt: string
}

export default function AdminReviewsPage() {
  const [filter, setFilter] = useState<string>("all")
  const { data: reviews, loading, error } = useData(
    () => apiGet<AdminReview[]>("/api/reviews/flagged"),
    [],
  )

  const [localReviews, setLocalReviews] = useState<AdminReview[] | null>(null)
  const display = localReviews ?? reviews

  const filtered = display.filter((r) => {
    if (filter === "flagged") return r.isFlagged
    if (filter === "hidden") return r.isHidden
    return true
  })

  const toggleHidden = useCallback(async (id: string) => {
    setLocalReviews((prev) => (prev || reviews).map((r) => (r.id === id ? { ...r, isHidden: !r.isHidden } : r)))
    try {
      await apiPost(`/api/reviews/${id}/hide`)
    } catch {
      setLocalReviews((prev) => (prev || reviews).map((r) => (r.id === id ? { ...r, isHidden: !r.isHidden } : r)))
      toast.error("Failed to update review")
    }
  }, [reviews])

  const unflag = useCallback(async (id: string) => {
    setLocalReviews((prev) => (prev || reviews).map((r) => (r.id === id ? { ...r, isFlagged: false } : r)))
    try {
      await apiPost(`/api/reviews/${id}/unflag`)
    } catch {
      setLocalReviews((prev) => (prev || reviews).map((r) => (r.id === id ? { ...r, isFlagged: true } : r)))
      toast.error("Failed to unflag review")
    }
  }, [reviews])

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/admin" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
        <div className="mb-6 flex items-center gap-2">
          <MessageSquare className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Review Moderation</h1>
        </div>
        <div className="mb-4 flex gap-2">
          {["all", "flagged", "hidden"].map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{review.from} → {review.to}</p>
                      {review.isFlagged && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">Flagged</Badge>
                      )}
                      {review.isHidden && <Badge variant="secondary">Hidden</Badge>}
                    </div>
                    <StarRating value={review.rating} readonly />
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.createdAt}</p>
                  </div>
                  <div className="flex flex-col gap-1 ml-4">
                    <Button variant="outline" size="sm" onClick={() => toggleHidden(review.id)}>
                      {review.isHidden ? <Eye className="size-4 mr-1" /> : <EyeOff className="size-4 mr-1" />}
                      {review.isHidden ? "Unhide" : "Hide"}
                    </Button>
                    {review.isFlagged && (
                      <Button variant="outline" size="sm" onClick={() => unflag(review.id)}>
                        <Flag className="size-4 mr-1" />
                        Unflag
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
