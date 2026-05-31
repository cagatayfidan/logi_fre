"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { getMoveById, getOfferById } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
}

export default function OfferDetailPage() {
  const params = useParams()
  const move = getMoveById(params.id as string)
  const offer = getOfferById(params.offerId as string)
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false)

  if (!move || !offer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Offer not found</p>
      </div>
    )
  }

  const handleAccept = () => {
    setAcceptDialogOpen(false)
    window.location.href = `/contracts/C-001`
  }

  const handleReject = () => {
    window.location.href = `/moves/${move.id}/offers`
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href={`/moves/${move.id}/offers`}
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Offers
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Offer from {offer.transporterName}</h1>
        <Badge variant={statusConfig[offer.status].variant}>
          {statusConfig[offer.status].label}
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transporter</CardTitle>
          </CardHeader>
          <CardContent className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary">
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
              <p className="text-sm text-muted-foreground">Member since {offer.memberSince}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Offer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Price</span>
              <span>${offer.price.toFixed(2)}</span>
            </div>
            <Separator />
            <div>
              <p className="mb-1 text-sm font-medium">Message:</p>
              <p className="text-sm text-muted-foreground">{offer.message}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Insurance: {offer.insurance ? "✓" : "✗"}</span>
              <span>Loading help: {offer.loadingHelp ? "✓" : "✗"}</span>
            </div>
          </CardContent>
        </Card>

        {offer.status === "pending" && (
          <div className="flex gap-3">
            <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
              <DialogTrigger render={<Button className="flex-1" />}>
                <Check className="mr-2 size-4" data-icon="inline-start" />
                Accept Offer
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Acceptance</DialogTitle>
                  <DialogDescription>
                    You are accepting ${offer.price.toFixed(2)} offer from {offer.transporterName}.
                    This will create a binding contract. Both parties must fulfill the terms.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setAcceptDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAccept}>Yes, Accept</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" className="flex-1" onClick={handleReject}>
              <X className="mr-2 size-4" data-icon="inline-start" />
              Reject Offer
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
