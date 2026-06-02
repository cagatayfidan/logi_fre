"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin, Clock, Truck, PackageCheck, ClipboardList, AlertCircle, Loader2 } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/empty-state"
import { fetchContracts, fetchUpcomingContracts } from "@/lib/api/contracts"
import { fetchMoves, type MoveRequest } from "@/lib/api/moves"
import { useAuth } from "@/lib/auth-context"

interface ScheduleEvent {
  id: string
  type: "move" | "pickup" | "delivery"
  title: string
  date: string
  time: string
  location: string
  role: "shipper" | "transporter"
  status: string
  contractId: string
}

const eventIcons = {
  pickup: Truck,
  delivery: PackageCheck,
  move: ClipboardList,
} as const

const statusColors: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Pending", variant: "outline" },
  pending_checkin: { label: "Pending", variant: "outline" },
  checked_in: { label: "Checked In", variant: "default" },
  in_transit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "secondary" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

function ScheduleCard({ event }: { event: ScheduleEvent }) {
  const Icon = eventIcons[event.type]
  const statusConfig = statusColors[event.status] ?? statusColors.cancelled
  const isPast = new Date(event.date) < new Date(new Date().toDateString())

  return (
    <Link href={`/contracts/${event.contractId}`}>
      <Card className={`transition-colors hover:border-primary/30 ${isPast && event.status !== "completed" && event.status !== "cancelled" ? "border-amber-500/50" : ""}`}>
        <CardContent className="flex items-start gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
              </div>
              <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {event.location}
              </span>
            </div>
            {isPast && event.status !== "completed" && event.status !== "cancelled" && (
              <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                <AlertCircle className="size-3" />
                <span>Past due — take action</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function SchedulePage() {
  const { user } = useAuth()
  const [contracts, setContracts] = useState<any[]>([])
  const [movesMap, setMovesMap] = useState<Record<string, MoveRequest>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [allContracts, upcomingContracts, allMoves] = await Promise.all([
          fetchContracts(),
          fetchUpcomingContracts(),
          fetchMoves(),
        ])
        if (cancelled) return
        const ids = new Set<string>()
        const merged = [...allContracts, ...upcomingContracts].filter((c) => {
          if (ids.has(c.id)) return false
          ids.add(c.id)
          return true
        })
        setContracts(merged)
        const map: Record<string, MoveRequest> = {}
        for (const m of allMoves) map[m.id] = m
        setMovesMap(map)
      } catch {
        if (!cancelled) setError("Failed to load schedule.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const events = useMemo<ScheduleEvent[]>(() => {
    const result: ScheduleEvent[] = []
    for (const contract of contracts) {
      const move = movesMap[contract.moveId]
      if (!move) continue
      const role = "shipper"
      result.push({
        id: `pickup-${contract.id}`,
        type: "pickup",
        title: move.title,
        date: move.pickupDate,
        time: `${move.pickupTimeStart} - ${move.pickupTimeEnd}`,
        location: move.origin,
        role,
        status: contract.status,
        contractId: contract.id,
      })
      result.push({
        id: `delivery-${contract.id}`,
        type: "delivery",
        title: move.title,
        date: move.deliveryDate,
        time: `${move.deliveryTimeStart} - ${move.deliveryTimeEnd}`,
        location: move.destination,
        role,
        status: contract.status,
        contractId: contract.id,
      })
    }
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return result
  }, [contracts, movesMap])

  const today = new Date().toDateString()
  const sorted = useMemo(() => {
    const upcoming = events.filter((e) => {
      const d = new Date(e.date)
      return d.getTime() >= new Date(today).getTime() && e.status !== "cancelled" && e.status !== "completed"
    })
    const past = events.filter((e) => {
      const d = new Date(e.date)
      return d.getTime() < new Date(today).getTime() || e.status === "completed" || e.status === "cancelled"
    })
    return { upcoming, past }
  }, [events, today])

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user?.role} userName={user?.name} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">Schedule</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <p className="py-12 text-center text-sm text-destructive">{error}</p>
        ) : events.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No scheduled moves"
            description="Your schedule will appear here once you have active contracts."
          />
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Upcoming
              </h2>
              {sorted.upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming events.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {sorted.upcoming.map((event) => (
                    <ScheduleCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Past
              </h2>
              {sorted.past.length === 0 ? (
                <p className="text-sm text-muted-foreground">No past events.</p>
              ) : (
                <div className="flex flex-col gap-3 opacity-60">
                  {sorted.past.map((event) => (
                    <ScheduleCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
