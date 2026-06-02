"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Package2, Circle, CheckCircle, XCircle, ShieldCheck, Star, Loader2 } from "lucide-react"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchContractById, checkIn, markInTransit, confirmDelivery, confirmReceipt, cancelContract, type Contract } from "@/lib/api/contracts"
import { fetchMoveById, type MoveRequest } from "@/lib/api/moves"
import { fetchOfferById, type Offer } from "@/lib/api/offers"
import { createReview } from "@/lib/api/reviews"
import { useAuth } from "@/lib/auth-context"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Pending Check-in", variant: "outline" },
  pending_checkin: { label: "Pending Check-in", variant: "outline" },
  checked_in: { label: "Checked In", variant: "default" },
  in_transit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "secondary" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

const contractTimelineSteps = [
  { key: "pending_checkin", label: "Pending Check-in" },
  { key: "checked_in", label: "Checked In" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
  { key: "completed", label: "Completed" },
] as const

function getContractTimelineStepIndex(status: string): number {
  const order = ["pending_checkin", "checked_in", "in_transit", "delivered", "completed"]
  if (status === "cancelled") return -1
  const idx = order.indexOf(status)
  return idx >= 0 ? idx : order.indexOf("active")
}

function getContractActionRole(status: string): "transporter" | "shipper" | null {
  if (status === "checked_in" || status === "in_transit" || status === "pending_checkin" || status === "active") return "transporter"
  if (status === "delivered") return "shipper"
  return null
}

function getContractActionLabel(status: string): string {
  const map: Record<string, string> = {
    active: "Check In",
    pending_checkin: "Check In",
    checked_in: "Mark In Transit",
    in_transit: "Confirm Delivery",
    delivered: "Confirm Receipt",
  }
  return map[status] || ""
}

const cancelContractReasons = [
  "Change of plans — no longer need the move",
  "Found a better offer",
  "Transporter is not responding",
  "Schedule conflict",
  "Other reason",
]

export default function ContractDetailPage() {
  const params = useParams()
  const { user, refresh } = useAuth()
  const [contract, setContract] = useState<Contract | null>(null)
  const [move, setMove] = useState<MoveRequest | null>(null)
  const [offer, setOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [rating, setRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [submittingReview, setSubmittingReview] = useState(false)

  const loadContract = useCallback(async () => {
    try {
      setLoading(true)
      setFetchError(null)
      const c = await fetchContractById(params.id as string)
      setContract(c)
      try {
        const [mv, of] = await Promise.all([
          fetchMoveById(c.moveId),
          fetchOfferById(c.offerId),
        ])
        setMove(mv)
        setOffer(of)
      } catch {
        // non-critical
      }
    } catch {
      setFetchError("Failed to load contract.")
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    loadContract()
  }, [loadContract])

  async function handleAction() {
    if (!contract) return
    setActionLoading(true)
    try {
      let updated: Contract
      switch (contract.status) {
        case "active":
          updated = await checkIn(contract.id)
          break
        case "checked_in":
          updated = await markInTransit(contract.id)
          break
        case "in_transit":
          updated = await confirmDelivery(contract.id)
          break
        case "delivered":
          updated = await confirmReceipt(contract.id)
          break
        default:
          return
      }
      setContract(updated)
      await refresh()
    } catch {
      // error handled by leaving state unchanged
    } finally {
      setActionLoading(false)
    }
  }

  async function handleCancelContract() {
    if (!contract || !cancelReason) return
    setActionLoading(true)
    try {
      const updated = await cancelContract(contract.id, cancelReason)
      setContract(updated)
      setCancelOpen(false)
      setCancelReason("")
      await refresh()
    } catch {
      // error
    } finally {
      setActionLoading(false)
    }
  }

  async function handleSubmitReview() {
    if (!contract || rating === 0) return
    setSubmittingReview(true)
    try {
      await createReview({ contractId: contract.id, rating, comment: reviewComment || undefined })
      setReviewSubmitted(true)
    } catch {
      // error
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-6">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (fetchError || !contract) {
    return (
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <p className="py-12 text-center text-muted-foreground">{fetchError ?? "Contract not found"}</p>
      </div>
    )
  }

  const status = contract.status
  const stepIndex = getContractTimelineStepIndex(status)
  const actionRole = getContractActionRole(status)
  const actionLabel = getContractActionLabel(status)
  const isCancelled = status === "cancelled"
  const isCompleted = status === "completed"

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-6">
      <Link
        href="/contracts"
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Contracts
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contract #{contract.id}</h1>
          <p className="text-sm text-muted-foreground">{move?.title ?? contract.moveId}</p>
        </div>
        <Badge variant={statusConfig[status]?.variant ?? "outline"}>
          {statusConfig[status]?.label ?? status}
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
              <span>${(contract.agreedPrice ?? contract.price ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Created</span>
              <span>{contract.createdAt}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-600" />
                Payment
              </span>
              <Badge variant={status === "completed" ? "default" : status === "cancelled" ? "destructive" : "outline"}>
                {status === "completed" ? "Released" : status === "cancelled" ? "Refunded" : "Escrow Hold"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractTimelineSteps.map((step, idx) => {
                const isActive = idx <= stepIndex
                const isLast = idx === stepIndex
                const icon = isActive ? CheckCircle : Circle
                const Icon = icon
                return (
                  <div key={step.key} className="flex items-start gap-3">
                    <Icon
                      className={`mt-0.5 size-5 ${
                        isActive ? "fill-primary text-primary" : "text-muted-foreground"
                      } ${isLast ? "animate-pulse" : ""}`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {idx === 0 && "Transporter has not checked in yet"}
                        {idx === 1 && "Transporter arrived at pickup location"}
                        {idx === 2 && "Move is in progress"}
                        {idx === 3 && "Goods have been delivered"}
                        {idx === 4 && "Move completed successfully"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            {isCancelled && (
              <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                This contract has been cancelled.
              </div>
            )}
          </CardContent>
        </Card>

        {isCompleted && !reviewSubmitted && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="size-4 text-muted-foreground" />
                {user?.id === contract.shipperId ? "Rate Transporter" : "Rate Shipper"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                How was your experience with {contract.transporterName}?
              </p>
              <StarRating value={rating} onChange={setRating} size="md" />
              <textarea
                placeholder="Share your experience (optional)"
                className="mt-3 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  disabled={rating === 0 || submittingReview}
                  onClick={handleSubmitReview}
                >
                  {submittingReview ? "Submitting..." : "Submit Rating"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReviewSubmitted(true)}
                  disabled={submittingReview}
                >
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isCompleted && reviewSubmitted && rating > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="size-5 fill-amber-500 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Rating submitted</p>
                  <StarRating value={rating} readonly />
                  {reviewComment && <p className="mt-1 text-xs text-muted-foreground">&ldquo;{reviewComment}&rdquo;</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!isCancelled && !isCompleted && (
          <div className="flex flex-col gap-3">
            {actionRole === "transporter" && (
              <Button onClick={handleAction} className="w-full" disabled={actionLoading}>
                {actionLoading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" data-icon="inline-start" />
                ) : (
                  <CheckCircle className="mr-2 size-4" data-icon="inline-start" />
                )}
                {actionLabel}
              </Button>
            )}
            {actionRole === "shipper" && (
              <Button onClick={handleAction} className="w-full" disabled={actionLoading}>
                {actionLoading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" data-icon="inline-start" />
                ) : (
                  <CheckCircle className="mr-2 size-4" data-icon="inline-start" />
                )}
                {actionLabel}
              </Button>
            )}
            <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
              <DialogTrigger render={<Button variant="destructive" className="w-full" disabled={actionLoading} />}>
                <XCircle className="mr-2 size-4" data-icon="inline-start" />
                Cancel Contract
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Contract</DialogTitle>
                  <DialogDescription>
                    This will cancel the contract with {contract.transporterName}.
                    Please select a reason for cancellation.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="cancelReason">Reason for cancellation</Label>
                  <Select value={cancelReason} onValueChange={(val) => val && setCancelReason(val)}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancelContractReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setCancelOpen(false)} disabled={actionLoading}>
                    Keep Contract
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleCancelContract}
                    disabled={!cancelReason || actionLoading}
                  >
                    {actionLoading ? "Cancelling..." : "Yes, Cancel Contract"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  )
}
