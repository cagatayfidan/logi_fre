"use client"

import Link from "next/link"
import { ArrowLeft, Headset } from "lucide-react"
import { useState, useCallback } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useData } from "@/lib/use-data"
import { fetchAdminTickets, resolveTicket as apiResolveTicket } from "@/lib/api/admin"
import { toast } from "sonner"

interface TicketRow {
  id: string
  user?: string
  subject?: string
  message?: string
  status: string
  createdAt: string
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  open: { label: "Open", variant: "destructive" },
  in_progress: { label: "In Progress", variant: "default" },
  resolved: { label: "Resolved", variant: "secondary" },
  closed: { label: "Closed", variant: "outline" },
}

export default function AdminTicketsPage() {
  const [filter, setFilter] = useState<string>("all")
  const { data: ticketsData, loading, error } = useData(
    () => fetchAdminTickets(1, 100),
    { tickets: [], total: 0, page: 1, totalPages: 0 },
  )

  const [localTickets, setLocalTickets] = useState<TicketRow[] | null>(null)
  const tickets = (localTickets ?? ticketsData.tickets ?? []) as TicketRow[]

  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter)
  const openCount = tickets.filter((t) => t.status === "open").length

  const handleResolve = useCallback(async (id: string) => {
    setLocalTickets((prev) => (prev || (ticketsData.tickets as TicketRow[] || [])).map((t) => (t.id === id ? { ...t, status: "resolved" } : t)))
    try {
      await apiResolveTicket(id, { status: "resolved" })
      toast.success("Ticket resolved")
    } catch {
      setLocalTickets(null)
      toast.error("Failed to resolve ticket")
    }
  }, [ticketsData.tickets])

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link
          href="/admin"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <Headset className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Support Ticket Queue</h1>
          {openCount > 0 && (
            <Badge variant="destructive">{openCount} open</Badge>
          )}
        </div>

        {loading && <p className="py-4 text-center text-muted-foreground">Loading tickets...</p>}
        {error && <p className="py-4 text-center text-destructive">Failed to load tickets.</p>}
        {!loading && !error && (
          <>
            <div className="mb-4 flex gap-2">
              {["all", "open", "in_progress", "resolved"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              {filtered.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">No tickets found.</p>
              ) : (
                filtered.map((ticket) => {
                  const cfg = statusConfig[ticket.status]
                  return (
                    <Card key={ticket.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{ticket.subject}</p>
                              <Badge variant={cfg.variant}>{cfg.label}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {ticket.user} — {ticket.id}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{ticket.message}</p>
                            <p className="text-xs text-muted-foreground">{ticket.createdAt}</p>
                          </div>
                          {(ticket.status === "open" || ticket.status === "in_progress") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResolve(ticket.id)}
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
