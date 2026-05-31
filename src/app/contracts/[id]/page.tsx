"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Package2, Circle, CheckCircle, XCircle, ShieldCheck, Star } from "lucide-react"
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
import {
  getContractById,
  getMoveById,
  getOfferById,
  contractTimelineSteps,
  getContractTimelineStepIndex,
  currentUser,
  getContractActionRole,
  getContractActionLabel,
  cancelContractReasons,
  ContractStatus,
} from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending_checkin: { label: "Pending Check-in", variant: "outline" },
  checked_in: { label: "Checked In", variant: "default" },
  in_transit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "secondary" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

const nextStatusMap: Record<string, ContractStatus> = {
  pending_checkin: "checked_in",
  checked_in: "in_transit",
  in_transit: "delivered",
  delivered: "completed",
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contract = getContractById(params.id as string)
  const [status, setStatus] = useState(contract?.status ?? "cancelled")
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [rating, setRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

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
  const stepIndex = getContractTimelineStepIndex(status)
  const actionRole = getContractActionRole(status)
  const actionLabel = getContractActionLabel(status)
  const isCancelled = status === "cancelled"
  const isCompleted = status === "completed"

  function handleAction() {
    const nextStatus = nextStatusMap[status]
    if (nextStatus) setStatus(nextStatus)
  }

  function handleCancelContract() {
    setStatus("cancelled")
    setCancelOpen(false)
    setCancelReason("")
  }

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
        <Badge variant={statusConfig[status].variant}>
          {statusConfig[status].label}
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
                {currentUser.id === contract.shipperId ? "Rate Transporter" : "Rate Shipper"}
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
                  disabled={rating === 0}
                  onClick={() => {
                    setReviewSubmitted(true)
                    setRating(rating)
                  }}
                >
                  Submit Rating
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReviewSubmitted(true)}
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
              <Button onClick={handleAction} className="w-full">
                <CheckCircle className="mr-2 size-4" data-icon="inline-start" />
                {actionLabel}
              </Button>
            )}
            {actionRole === "shipper" && (
              <Button onClick={handleAction} className="w-full">
                <CheckCircle className="mr-2 size-4" data-icon="inline-start" />
                {actionLabel}
              </Button>
            )}
            <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
              <DialogTrigger render={<Button variant="destructive" className="w-full" />}>
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
                  <Button variant="outline" onClick={() => setCancelOpen(false)}>
                    Keep Contract
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleCancelContract}
                    disabled={!cancelReason}
                  >
                    Yes, Cancel Contract
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
