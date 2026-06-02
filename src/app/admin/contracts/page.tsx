"use client"

import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/lib/use-data"
import { fetchAdminContracts } from "@/lib/api/admin"

interface ContractRow {
  id: string
  moveId?: string
  title?: string
  shipperName?: string
  transporterName?: string
  agreedPrice?: number
  status: string
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  checked_in: { label: "Checked In", variant: "default" },
  in_transit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "secondary" },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

const allStatuses = ["active", "checked_in", "in_transit", "delivered", "completed", "cancelled"] as const

export default function AdminContractsPage() {
  const { data: contractsData, loading, error } = useData(
    () => fetchAdminContracts(1, 100),
    { contracts: [], total: 0, page: 1, totalPages: 0 },
  )

  const contracts = (contractsData.contracts || []) as ContractRow[]

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/admin"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <FileText className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Contract Monitoring</h1>
        </div>

        {loading && <p className="py-4 text-center text-muted-foreground">Loading contracts...</p>}
        {error && <p className="py-4 text-center text-destructive">Failed to load contracts.</p>}

        {!loading && !error && allStatuses.map((status) => {
          const statusContracts = contracts.filter(
            (c) => status === "active"
              ? ["pending_checkin", "checked_in", "in_transit", "delivered"].includes(c.status)
              : c.status === status
          )
          if (statusContracts.length === 0) return null

          return (
            <div key={status} className="mb-6">
              <h2 className="mb-3 text-lg font-semibold capitalize flex items-center gap-2">
                {status === "active" ? "Active" : status}
                <Badge variant="outline">{statusContracts.length}</Badge>
              </h2>
              <div className="space-y-2">
                {statusContracts.map((contract) => {
                  const cfg = statusConfig[contract.status] || statusConfig.active
                  return (
                    <Card key={contract.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {contract.title || contract.moveId || contract.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            #{contract.id} — {contract.shipperName || "N/A"} → {contract.transporterName || "N/A"}{contract.agreedPrice ? ` — $${contract.agreedPrice}` : ""}
                          </p>
                        </div>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}

        {!loading && !error && contracts.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">No contracts found.</p>
        )}
      </main>
    </div>
  )
}
