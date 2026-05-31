"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Clock, Scale, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMoveById, getOffersByMoveId, isOfferExpired } from "@/lib/data"
import type { Offer } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired: { label: "Expired", variant: "secondary" },
}

const statusFilters = ["all", "pending", "accepted", "expired", "rejected"] as const

function CompareDialog({ offers, onClose }: { offers: Offer[]; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogTitle>Compare Offers</DialogTitle>
        <DialogDescription>Side-by-side comparison of selected offers</DialogDescription>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium text-muted-foreground">Feature</th>
                {offers.map((o) => (
                  <th key={o.id} className="p-2 text-left font-medium">{o.transporterName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 text-muted-foreground">Price</td>
                {offers.map((o) => (
                  <td key={o.id} className="p-2 font-bold">${o.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 text-muted-foreground">Rating</td>
                {offers.map((o) => (
                  <td key={o.id} className="p-2">{o.transporterRating} <Star className="inline size-3.5 fill-amber-500 text-amber-500" /> ({o.transporterReviewCount})</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 text-muted-foreground">Insurance</td>
                {offers.map((o) => (
                  <td key={o.id} className="p-2">{o.insurance ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 text-muted-foreground">Loading Help</td>
                {offers.map((o) => (
                  <td key={o.id} className="p-2">{o.loadingHelp ? "Yes" : "No"}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 text-muted-foreground">Status</td>
                {offers.map((o) => (
                  <td key={o.id} className="p-2">
                    <Badge variant={statusConfig[isOfferExpired(o) ? "expired" : o.status].variant}>
                      {isOfferExpired(o) ? "Expired" : statusConfig[o.status].label}
                    </Badge>
                  </td>
                ))}
              </tr>
              {offers.some((o) => o.message) && (
                <tr>
                  <td className="p-2 text-muted-foreground">Message</td>
                  {offers.map((o) => (
                    <td key={o.id} className="p-2 text-xs max-w-48">{o.message || "—"}</td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <DialogClose render={<Button variant="outline" className="mt-2 w-full" />}>
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default function OffersPage() {
  const params = useParams()
  const move = getMoveById(params.id as string)
  const offers = getOffersByMoveId(params.id as string)
  const [sort, setSort] = useState("price-asc")
  const [statusTab, setStatusTab] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [compareOpen, setCompareOpen] = useState(false)

  const filtered = offers.filter((o) => {
    if (statusTab === "all") return true
    const effectiveStatus = isOfferExpired(o) ? "expired" : o.status
    return effectiveStatus === statusTab
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    if (sort === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sort === "rating") return b.transporterRating - a.transporterRating
    return 0
  })

  const toggleSelected = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const selectedOffers = offers.filter((o) => selectedIds.has(o.id))

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

      <div className="mb-4 flex items-center justify-between">
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

      <div className="mb-4 flex items-center justify-between">
        <Tabs value={statusTab} onValueChange={(val) => { setStatusTab(val); setSelectedIds(new Set()) }}>
          <TabsList>
            {statusFilters.map((f) => (
              <TabsTrigger key={f} value={f} className="capitalize">{f}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {selectedIds.size >= 2 && (
          <Button variant="outline" size="sm" onClick={() => setCompareOpen(true)}>
            <Scale className="mr-1 size-4" />
            Compare ({selectedIds.size})
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {sorted.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No offers match this filter.</p>
        ) : (
          sorted.map((offer) => {
            const expired = isOfferExpired(offer)
            const effectiveStatus = expired ? "expired" : offer.status
            return (
              <Card key={offer.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedIds.has(offer.id)}
                      onCheckedChange={() => toggleSelected(offer.id)}
                      className="mt-1"
                    />
                    <div className="flex flex-1 items-start justify-between">
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
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            {offer.insurance && <span>✅ Insured</span>}
                            {offer.loadingHelp && <span>💪 Loading help</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-lg font-bold">${offer.price.toFixed(2)}</p>
                        {offer.expiresAt && !expired && (
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Clock className="size-3" />
                            <span>Expires soon</span>
                          </div>
                        )}
                        <Badge variant={statusConfig[effectiveStatus].variant}>
                          {statusConfig[effectiveStatus].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/moves/${move.id}/offers/${offer.id}`}
                    className={buttonVariants({ variant: "outline", size: "default" }) + " mt-3 w-full text-center"}
                  >
                    View Offer
                  </Link>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {compareOpen && (
        <CompareDialog offers={selectedOffers} onClose={() => setCompareOpen(false)} />
      )}
    </div>
  )
}
