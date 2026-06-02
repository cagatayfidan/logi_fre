"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, MapPin, Calendar, Loader2 } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { fetchContracts } from "@/lib/api/contracts"
import { fetchMoves, type MoveRequest } from "@/lib/api/moves"
import { useData } from "@/lib/use-data"
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

const filters = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

const activeStatuses = ["pending_checkin", "checked_in", "in_transit", "delivered", "active"]

export default function ContractsPage() {
  const { user } = useAuth()
  const [activeFilter, setActiveFilter] = useState("all")
  const { data: apiContracts, loading, error } = useData(fetchContracts, [])
  const [movesMap, setMovesMap] = useState<Record<string, MoveRequest>>({})

  useEffect(() => {
    fetchMoves()
      .then((moves) => {
        const map: Record<string, MoveRequest> = {}
        for (const m of moves) map[m.id] = m
        setMovesMap(map)
      })
      .catch(() => {})
  }, [])

  const filtered = apiContracts.filter((c) => {
    if (activeFilter === "all") return true
    if (activeFilter === "active") return activeStatuses.includes(c.status)
    return c.status === activeFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user?.role} userName={user?.name} />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Contracts</h1>

        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="w-full">
            {filters.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="flex-1">
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeFilter} className="mt-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <p className="py-12 text-center text-sm text-destructive">Failed to load contracts.</p>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon="📋"
                title="No contracts yet"
                description="Contracts will appear here once an offer is accepted."
              />
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((contract) => {
                  const move = movesMap[contract.moveId]
                  return (
                    <Link key={contract.id} href={`/contracts/${contract.id}`}>
                      <Card className="transition-colors hover:border-primary/30">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <FileText className="size-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  Contract #{contract.id}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="size-4" />
                                <span>{move?.title ?? contract.moveId}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="size-4" />
                                <span>{move?.pickupDate ?? "—"}</span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{contract.transporterName}</span>
                                <span>${contract.agreedPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            <Badge variant={statusConfig[contract.status]?.variant ?? "outline"}>
                              {statusConfig[contract.status]?.label ?? contract.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
