"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Check, X, Send, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMoveById, getOfferById, isOfferExpired, getTimeUntil } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired: { label: "Expired", variant: "secondary" },
}

export default function OfferDetailPage() {
  const params = useParams()
  const move = getMoveById(params.id as string)
  const offer = getOfferById(params.offerId as string)
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false)
  const [counterDialogOpen, setCounterDialogOpen] = useState(false)
  const [counterPrice, setCounterPrice] = useState(offer ? offer.price - 25 : 0)
  const [counterMessage, setCounterMessage] = useState("")
  const [messages, setMessages] = useState(offer?.messages ?? [])
  const [expiryTime, setExpiryTime] = useState({ days: 0, hours: 0, minutes: 0 })
  const expired = offer ? isOfferExpired(offer) : false
  const [counterSent, setCounterSent] = useState(false)

  useEffect(() => {
    if (offer?.expiresAt && !expired) {
      const update = () => {
        const t = getTimeUntil(offer.expiresAt!)
        setExpiryTime({ days: t.days, hours: t.hours, minutes: t.minutes })
      }
      update()
      const interval = setInterval(update, 60000)
      return () => clearInterval(interval)
    }
  }, [offer, expired])

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

  const handleCounterOffer = () => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      senderName: "John Doe",
      text: counterMessage || `Counter offer: $${counterPrice.toFixed(2)}`,
      price: counterPrice,
      createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, newMsg])
    setCounterSent(true)
    setCounterDialogOpen(false)
    setCounterPrice(offer.price - 25)
    setCounterMessage("")
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
        <div>
          <h1 className="text-2xl font-bold">Offer from {offer.transporterName}</h1>
          {offer.expiresAt && !expired && (
            <div className="mt-1 flex items-center gap-1 text-sm text-amber-600">
              <Clock className="size-3.5" />
              <span>
                Expires in {expiryTime.days > 0 ? `${expiryTime.days}d ` : ""}
                {expiryTime.hours}h {expiryTime.minutes}m
              </span>
            </div>
          )}
        </div>
        <Badge variant={statusConfig[expired ? "expired" : offer.status].variant}>
          {expired ? "Expired" : statusConfig[offer.status].label}
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

        {messages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Negotiation History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-80">
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const isShipper = msg.senderId === "user-1"
                    return (
                      <div key={msg.id} className={`flex ${isShipper ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            isShipper ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-xs font-medium opacity-80">{msg.senderName}</p>
                          <p className="mt-0.5">{msg.text}</p>
                          {msg.price && (
                            <p className="mt-1 text-xs font-semibold">${msg.price.toFixed(2)}</p>
                          )}
                          <p className="mt-0.5 text-[10px] opacity-60">{msg.createdAt}</p>
                        </div>
                      </div>
                    )
                  })}
                  {counterSent && (
                    <div className="rounded-lg bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
                      Waiting for transporter response...
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {offer.status === "pending" && !expired && (
          <div className="flex flex-col gap-3">
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
            <Dialog open={counterDialogOpen} onOpenChange={setCounterDialogOpen}>
              <DialogTrigger render={<Button variant="outline" className="w-full" />}>
                <Send className="mr-2 size-4" data-icon="inline-start" />
                Counter Offer
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Counter Offer</DialogTitle>
                  <DialogDescription>
                    Respond to {offer.transporterName}&apos;s offer of ${offer.price.toFixed(2)}.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="counterPrice">Your Price</Label>
                    <Input
                      id="counterPrice"
                      type="number"
                      value={counterPrice}
                      onChange={(e) => setCounterPrice(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="counterMessage">Message (optional)</Label>
                    <Textarea
                      id="counterMessage"
                      placeholder="Add a note to your counter offer..."
                      value={counterMessage}
                      onChange={(e) => setCounterMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setCounterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCounterOffer}>
                    Send Counter Offer
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
