"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Scale } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NavHeader } from "@/components/nav-header"

type DisputeStatus = "open" | "under_review" | "resolved" | "dismissed"

interface Dispute {
  id: string
  contractId: string
  raisedBy: string
  raisedByRole: string
  reason: string
  status: DisputeStatus
  adminNote: string | null
  createdAt: string
}

const mockDisputes: Dispute[] = [
  {
    id: "d-1",
    contractId: "C-003",
    raisedBy: "John Doe",
    raisedByRole: "shipper",
    reason: "Transporter did not show up on time and damaged my furniture.",
    status: "open",
    adminNote: null,
    createdAt: "June 1, 2026",
  },
  {
    id: "d-2",
    contractId: "C-002",
    raisedBy: "Mike's Transport",
    raisedByRole: "transporter",
    reason: "Shipper had far more items than listed — took 3 extra hours.",
    status: "under_review",
    adminNote: "Reviewing both parties' contract terms.",
    createdAt: "May 28, 2026",
  },
  {
    id: "d-3",
    contractId: "C-001",
    raisedBy: "Sarah K.",
    raisedByRole: "shipper",
    reason: "Items were not packed properly, several boxes damaged.",
    status: "resolved",
    adminNote: "Partial refund issued to shipper.",
    createdAt: "May 15, 2026",
  },
]

type FilterTab = "all" | DisputeStatus

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "under_review", label: "Under Review" },
  { key: "resolved", label: "Resolved" },
]

function statusBadge(status: DisputeStatus) {
  if (status === "open") return <Badge variant="destructive">Open</Badge>
  if (status === "under_review") return <Badge variant="default">Under Review</Badge>
  if (status === "resolved") return <Badge variant="secondary">Resolved</Badge>
  return <Badge variant="outline">Dismissed</Badge>
}

export default function DisputesPage() {
  const [statuses, setStatuses] = useState<Record<string, DisputeStatus>>(
    Object.fromEntries(mockDisputes.map((d) => [d.id, d.status])) as Record<string, DisputeStatus>,
  )
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const disputes = mockDisputes.map((d) => ({ ...d, status: statuses[d.id] }))

  const filtered =
    activeTab === "all" ? disputes : disputes.filter((d) => d.status === activeTab)

  const openCount = disputes.filter((d) => d.status === "open").length

  const updateStatus = (id: string, next: DisputeStatus) =>
    setStatuses((prev) => ({ ...prev, [id]: next }))

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Back link */}
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Admin Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-6 flex items-center gap-2">
          <Scale className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Dispute Resolution</h1>
          {openCount > 0 && (
            <Badge variant="destructive" className="ml-1">
              {openCount} open
            </Badge>
          )}
        </div>

        {/* Filter tabs */}
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dispute cards */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No disputes found for this filter.
            </p>
          )}
          {filtered.map((dispute) => (
            <Card key={dispute.id}>
              <CardContent className="p-5">
                {/* Header row */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Contract #{dispute.contractId}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm font-medium">{dispute.raisedBy}</span>
                    <Badge variant={dispute.raisedByRole === "transporter" ? "default" : "secondary"}>
                      {dispute.raisedByRole === "transporter" ? "Transporter" : "Shipper"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{dispute.createdAt}</span>
                  </div>
                  <div>{statusBadge(dispute.status)}</div>
                </div>

                {/* Reason */}
                <p className="mb-3 line-clamp-3 text-sm text-foreground">{dispute.reason}</p>

                {/* Admin note */}
                {dispute.adminNote && (
                  <div className="mb-3 rounded-md bg-muted px-3 py-2">
                    <p className="text-xs font-medium text-muted-foreground">Admin Note</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{dispute.adminNote}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2">
                  {dispute.status === "open" && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => updateStatus(dispute.id, "under_review")}
                    >
                      Mark Under Review
                    </Button>
                  )}
                  {dispute.status === "under_review" && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateStatus(dispute.id, "resolved")}
                      >
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(dispute.id, "dismissed")}
                      >
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
