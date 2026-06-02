"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Truck, PackageOpen, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { StarRating } from "@/components/star-rating"
import { useEffect, useState } from "react"
import { fetchRatingProfile, fetchReviewsByUser, type Review, type RatingProfile } from "@/lib/api/reviews"
import { fetchContracts } from "@/lib/api/contracts"

export default function TransporterProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [profile, setProfile] = useState<RatingProfile | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [completedMoves, setCompletedMoves] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchRatingProfile(userId),
      fetchReviewsByUser(userId),
      fetchContracts(),
    ])
      .then(([profileData, reviewsData, contracts]) => {
        setProfile(profileData)
        setReviews(reviewsData)
        setCompletedMoves(contracts.filter((c: { transporterId: string; status: string }) => c.transporterId === userId && c.status === "completed").length)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/moves"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Available Moves
        </Link>

        <Card className="mb-4">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-xl font-medium text-primary">
              T
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Transporter</h1>
              <p className="text-sm text-muted-foreground">Member since —</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <PackageOpen className="size-4" />
                <span>{completedMoves} completed moves</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {profile && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="size-4 text-muted-foreground" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.isPublic ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold">{profile.average}</span>
                    <div className="space-y-1">
                      <StarRating value={Math.round(profile.average)} readonly size="md" />
                      <p className="text-sm text-muted-foreground">Based on {profile.count} reviews</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = profile.distribution[star as keyof typeof profile.distribution] || 0
                      const pct = profile.count > 0 ? (count / profile.count) * 100 : 0
                      return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                          <span className="w-4 text-right text-muted-foreground">{star}</span>
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-amber-500 transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-6 text-xs text-muted-foreground">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center text-muted-foreground">
                  <p className="text-lg font-medium">Not enough reviews yet</p>
                  <p className="text-sm">Minimum 3 reviews required before rating is displayed publicly.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {review.from.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.from.name}</p>
                        <StarRating value={review.rating} readonly />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  )}
                  {review.reply && (
                    <div className="mt-2 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-medium text-muted-foreground">Owner replied{review.repliedAt ? ` (${review.repliedAt})` : ""}:</p>
                      <p className="mt-1 text-sm">{review.reply}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
