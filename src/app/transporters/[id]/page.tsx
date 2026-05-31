"use client"

import Link from "next/link"
import { ArrowLeft, Truck, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { StarRating } from "@/components/star-rating"

const mockTransporterProfile = {
  id: "user-2",
  name: "Mike's Transport",
  memberSince: "January 2025",
  completedMoves: 42,
  rating: {
    average: 4.3,
    count: 7,
    isPublic: true,
    distribution: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 4 },
  },
  reviews: [
    {
      id: "r1",
      from: "John D.",
      rating: 5,
      comment: "Excellent service, very careful with furniture.",
      reply: "Thank you for the kind words!",
      createdAt: "May 15, 2026",
    },
    {
      id: "r2",
      from: "Sarah K.",
      rating: 4,
      comment: "Good overall, slightly late but communicated well.",
      reply: null,
      createdAt: "May 2, 2026",
    },
    {
      id: "r3",
      from: "Ali M.",
      rating: 4,
      comment: "Professional and efficient.",
      reply: null,
      createdAt: "April 20, 2026",
    },
  ],
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function TransporterProfilePage() {
  const profile = mockTransporterProfile
  const { rating } = profile

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="shipper" userName="John Doe" />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Back link */}
        <Link
          href="/moves"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Moves
        </Link>

        {/* Profile header card */}
        <Card>
          <CardContent className="flex items-center gap-5 pt-6">
            <Avatar className="size-16 text-lg">
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">
                Member since {profile.memberSince}
              </p>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {profile.completedMoves} completed moves
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating summary card */}
        <Card>
          <CardHeader>
            <CardTitle>Ratings &amp; Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {rating.isPublic ? (
              <>
                {/* Average + stars */}
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-foreground">
                    {rating.average.toFixed(1)}
                  </span>
                  <div className="space-y-1">
                    <StarRating value={Math.round(rating.average)} readonly size="md" />
                    <p className="text-sm text-muted-foreground">
                      Based on {rating.count} reviews
                    </p>
                  </div>
                </div>

                {/* Star distribution */}
                <div className="space-y-2">
                  {([5, 4, 3, 2, 1] as const).map((star) => {
                    const count =
                      rating.distribution[star as keyof typeof rating.distribution] ?? 0
                    const pct = rating.count > 0 ? (count / rating.count) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-6 text-right text-muted-foreground">{star}</span>
                        <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-4 text-right text-muted-foreground">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                Not enough reviews yet (min. 3)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Reviews list */}
        {rating.isPublic && profile.reviews.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">All Reviews</h2>
            {profile.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-5 space-y-3">
                  {/* Reviewer header */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(review.from)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{review.from}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating value={review.rating} readonly size="sm" />
                      <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-foreground">{review.comment}</p>

                  {/* Reply */}
                  {review.reply && (
                    <div className="ml-4 pl-4 border-l-2 border-muted space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground">
                        Owner replied:
                      </p>
                      <p className="text-sm text-muted-foreground">{review.reply}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
