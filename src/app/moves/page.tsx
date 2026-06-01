"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Calendar, Package2, DollarSign, Star, User } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockMoves, getReviewRatingProfile } from "@/lib/data"
import { StarRating } from "@/components/star-rating"

export default function AvailableMovesPage() {
  const [search, setSearch] = useState("")
  const [filterSize, setFilterSize] = useState("all")

  const filtered = mockMoves.filter((move) => {
    if (move.status !== "active") return false
    if (search && !move.title.toLowerCase().includes(search.toLowerCase()) &&
        !move.origin.toLowerCase().includes(search.toLowerCase()) &&
        !move.destination.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    if (filterSize === "small" && move.totalWeight > 200) return false
    if (filterSize === "medium" && (move.totalWeight < 200 || move.totalWeight > 600)) return false
    if (filterSize === "large" && move.totalWeight < 600) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="transporter" userName="Mike Transporter" />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Available Moves</h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterSize} onValueChange={(val) => val && setFilterSize(val)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Small (&lt;200kg)</SelectItem>
              <SelectItem value="medium">Medium (200-600kg)</SelectItem>
              <SelectItem value="large">Large (&gt;600kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No available moves matching your criteria.
            </p>
          ) : (
            filtered.map((move) => (
              <Card key={move.id} className="transition-colors hover:border-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{move.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>{move.pickupDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package2 className="size-4" />
                        <span>
                          {move.items.length} items ~{move.totalWeight}kg
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="size-4" />
                        <span>{move.shipperName}</span>
                        <StarRating value={Math.round(move.shipperRating)} readonly />
                        <span className="text-xs">({move.shipperReviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="size-4" />
                        <span>Offers: {move.offerCount}</span>
                      </div>
                    </div>
                    <Link href={`/moves/${move.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      View Details →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
