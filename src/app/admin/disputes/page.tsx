"use client"

import Link from "next/link"
import { ArrowLeft, Scale } from "lucide-react"
import { useState } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Dispute {
  id: string
  contractId: string
  raisedBy: string
  role: string
  reason: string
  status: "open" | "under_review" | "resolved" | "dismissed"
  createdAt: string
  adminNote?: string
}

const mockDisputes: Dispute[] = [
  { id: "DSP-001", contractId: "C-001", raisedBy: "John Doe", role: "shipper", reason: "Transporter arrived 3 hours late and damaged some furniture.", status: "open", createdAt: "June 1, 2026" },
  { id: "DSP-002", contractId: "C-003", raisedBy: "Mike's Transport", role: "transporter", reason: "Shipper added extra items on move day without adjusting the price.", status: "under_review", createdAt: "May 30, 2026" },
  { id: "DSP-003", contractId: "C-002", raisedBy: "FastMove Inc.", role: "transporter", reason: "Shipper was not at the destination to receive items, caused 2hr wait.", status: "resolved", createdAt: "May 25, 2026", adminNote: "Resolved in favor of transporter. Shipper compensated for waiting time." },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  open: { label: "Open", variant: "destructive" },
  under_review: { label: "Under Review", variant: "default" },
  resolved: { label: "Resolved", variant: "secondary" },
  dismissed: { label: "Dismissed", variant: "outline" },
}

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(mockDisputes)
  const [filter, setFilter] = useState<string>("all")

  const filtered = filter === "all" ? disputes : disputes.filter((d) => d.status === filter)
  const openCount = disputes.filter((d) => d.status === "open").length

  function updateStatus(id: string, status: Dispute["status"]) {
    setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)))
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link href="/admin" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
        <div className="mb-6 flex items-center gap-2">
          <Scale className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Dispute Resolution</h1>
          {openCount > 0 && <Badge variant="destructive">{openCount} open</Badge>}
        </div>
        <div className="mb-4 flex gap-2">
          {["all", "open", "under_review", "resolved"].map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "All" : f === "under_review" ? "Under Review" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((dispute) => {
            const cfg = statusConfig[dispute.status]
            return (
              <Card key={dispute.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">#{dispute.contractId}</p>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                        <Badge variant="outline">{dispute.role}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{dispute.raisedBy} — {dispute.createdAt}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{dispute.reason}</p>
                      {dispute.adminNote && (
                        <div className="mt-2 rounded-lg bg-muted/50 p-2">
                          <p className="text-xs font-medium text-muted-foreground">Admin Note:</p>
                          <p className="text-sm">{dispute.adminNote}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 ml-4">
                      {dispute.status === "open" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(dispute.id, "under_review")}>
                          Mark Under Review
                        </Button>
                      )}
                      {dispute.status === "under_review" && (
                        <>
                          <Button size="sm" variant="default" onClick={() => updateStatus(dispute.id, "resolved")}>
                            Resolve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus(dispute.id, "dismissed")}>
                            Dismiss
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
