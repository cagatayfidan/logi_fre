"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMoveById, getOffersByMoveId } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
}

export default function OffersPage() {
  const params = useParams()
  const move = getMoveById(params.id as string)
  const offers = getOffersByMoveId(params.id as string)
  const [sort, setSort] = useState("price-asc")

  const sorted = [...offers].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    if (sort === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sort === "rating") return b.transporterRating - a.transporterRating
    return 0
  })

  if (!move) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Move not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href={`/moves/${move.id}`}
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Move Detail
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Offers for {move.id}</h1>
          <p className="text-sm text-muted-foreground">{move.title}</p>
        </div>
        <Select value={sort} onValueChange={(val) => val && setSort(val)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="date">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No offers yet.</p>
        ) : (
          sorted.map((offer) => (
            <Card key={offer.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {offer.transporterName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium">{offer.transporterName}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span>
                          {offer.transporterRating} ({offer.transporterReviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-bold">${offer.price.toFixed(2)}</p>
                    <Badge variant={statusConfig[offer.status].variant}>
                      {statusConfig[offer.status].label}
                    </Badge>
                  </div>
                </div>
                <Link href={`/moves/${move.id}/offers/${offer.id}`} className={buttonVariants({ variant: "outline", size: "default" }) + " mt-3 w-full text-center"}>
                  View Offer
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
