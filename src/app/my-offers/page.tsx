"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, CheckCircle, XCircle, Clock } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { mockOffers, getMoveById, isOfferExpired } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  accepted: { label: "Accepted", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired: { label: "Expired", variant: "secondary" },
}

export default function MyOffersPage() {
  const [activeTab, setActiveTab] = useState("pending")

  const transporterOffers = mockOffers.filter((o) => o.transporterId === "user-2")
  const filtered = transporterOffers.filter((o) => o.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="transporter" userName="Mike Transporter" />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">My Offers</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filtered.length === 0 ? (
              <EmptyState
                icon="📋"
                title={`No ${activeTab} offers`}
                description={
                  activeTab === "pending"
                    ? "You haven't made any offers yet. Browse available moves to get started."
                    : `You don't have any ${activeTab} offers.`
                }
                action={
                  activeTab === "pending" ? (
                    <Link href="/moves" className={buttonVariants({ variant: "default", size: "default" })}>
                      Browse Moves
                    </Link>
                  ) : undefined
                }
              />
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((offer) => {
                  const move = getMoveById(offer.moveId)
                  return (
                    <Card key={offer.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="size-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {move?.title ?? offer.moveId}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Your offer: ${offer.price.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              <span>Submitted: {offer.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {offer.expiresAt && !isOfferExpired(offer) && (
                              <div className="flex items-center gap-1 text-xs text-amber-600">
                                <Clock className="size-3" />
                                <span>Expires soon</span>
                              </div>
                            )}
                            <Badge variant={statusConfig[isOfferExpired(offer) ? "expired" : offer.status].variant}>
                              {isOfferExpired(offer) ? "Expired" : statusConfig[offer.status].label}
                            </Badge>
                            {offer.status === "accepted" ? (
                              <Link href={`/contracts/C-${offer.moveId === "MR-002" ? "001" : "002"}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                View Contract →
                              </Link>
                            ) : (
                              <Link href={`/moves/${offer.moveId}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                                View Details
                              </Link>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
