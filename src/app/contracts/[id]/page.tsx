"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Package2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getContractById, getMoveById, getOfferById } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

export default function ContractDetailPage() {
  const params = useParams()
  const contract = getContractById(params.id as string)

  if (!contract) {
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <p className="py-12 text-center text-muted-foreground">Contract not found</p>
      </div>
    )
  }

  const move = getMoveById(contract.moveId)
  const offer = getOfferById(contract.offerId)

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href="/dashboard"
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contract #{contract.id}</h1>
          <p className="text-sm text-muted-foreground">{move?.title ?? contract.moveId}</p>
        </div>
        <Badge variant={statusConfig[contract.status].variant}>
          {statusConfig[contract.status].label}
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-muted-foreground" />
              Move Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">From:</span> {move?.origin ?? "—"}
            </p>
            <p>
              <span className="font-medium">To:</span> {move?.destination ?? "—"}
            </p>
            <p>
              <span className="font-medium">Date:</span> {move?.pickupDate ?? "—"}
            </p>
            <p>
              <span className="font-medium">Items:</span> {move?.items.length ?? "—"} ({move?.totalWeight ?? "—"}kg)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipper</span>
              <span className="font-medium">{contract.shipperName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transporter</span>
              <span className="font-medium">{contract.transporterName}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Agreed Price</span>
              <span>${contract.agreedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Created</span>
              <span>{contract.createdAt}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Circle className="mt-0.5 size-4 fill-primary text-primary" />
                <div>
                  <p className="text-sm font-medium">Pending Pickup</p>
                  <p className="text-xs text-muted-foreground">Waiting for pickup to begin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Circle className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-xs text-muted-foreground">Move in progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Circle className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-xs text-muted-foreground">Move completed</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Timeline updates will be available in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
