"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Star, Pencil, XCircle } from "lucide-react"
import { buttonVariants, Button } from "@/components/ui/button"
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
import { getMoveById } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
}

export default function MoveDetailPage() {
  const params = useParams()
  const router = useRouter()
  const move = getMoveById(params.id as string)
  const [cancelOpen, setCancelOpen] = useState(false)

  if (!move) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Move not found</p>
      </div>
    )
  }

  function handleCancel() {
    setCancelOpen(false)
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href="/dashboard"
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{move.title}</h1>
          <p className="text-sm text-muted-foreground">Move Request #{move.id}</p>
        </div>
        <Badge variant={statusConfig[move.status].variant}>{statusConfig[move.status].label}</Badge>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-muted-foreground" />
              Addresses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">From:</span> {move.origin}
            </p>
            <p>
              <span className="font-medium">To:</span> {move.destination}
            </p>
            <p className="text-muted-foreground">Distance: {move.distance}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="size-4 text-muted-foreground" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Pickup:</span> {move.pickupDate}, {move.pickupTimeStart}–
              {move.pickupTimeEnd}
            </p>
            <p>
              <span className="font-medium">Dropoff:</span> {move.deliveryDate}, {move.deliveryTimeStart}–
              {move.deliveryTimeEnd}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {move.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span>
                    • {item.name} (x{item.quantity})
                  </span>
                  <span className="text-muted-foreground">
                    {item.weight * item.quantity}kg
                    {item.fragile && " 🔸"}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm font-medium">
                <span>Total: {move.items.length} items</span>
                <span>
                  {move.totalWeight}kg / {move.estimatedVolume}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Shipper</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {move.shipperName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <Link
                href={`/shippers/${move.shipperId}`}
                className="text-sm font-medium hover:underline"
              >
                {move.shipperName}
              </Link>
              {move.shipperReviewCount >= 3 && (
                <Link
                  href={`/shippers/${move.shipperId}`}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  <span>
                    {move.shipperRating.toFixed(1)} ({move.shipperReviewCount} reviews)
                  </span>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {move.status === "active" && (
          <div className="flex gap-3">
            <Link href={`/moves/${move.id}/edit`} className={buttonVariants({ variant: "outline", size: "default" }) + " flex-1 text-center"}>
              <Pencil className="mr-2 size-4" data-icon="inline-start" />
              Edit
            </Link>
            <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
              <DialogTrigger render={<Button variant="destructive" className="flex-1" />}>
                <XCircle className="mr-2 size-4" data-icon="inline-start" />
                Cancel Request
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Move Request</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this move request? This action cannot be undone.
                    All offers associated with this move will be voided.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setCancelOpen(false)}>
                    Keep Request
                  </Button>
                  <Button variant="destructive" onClick={handleCancel}>
                    Yes, Cancel Move
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="flex gap-3">
          <Link href={`/moves/${move.id}/offers`} className={buttonVariants({ variant: "default", size: "default" }) + " flex-1 text-center"}>
            View Offers ({move.offerCount})
          </Link>
          <Link href="/moves" className={buttonVariants({ variant: "outline", size: "default" }) + " flex-1 text-center"}>
            Make an Offer
          </Link>
        </div>
      </div>
    </div>
  )
}
