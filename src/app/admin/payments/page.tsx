"use client"

import Link from "next/link"
import { ArrowLeft, DollarSign } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/lib/use-data"
import { fetchAdminPayments } from "@/lib/api/admin"

interface PaymentRow {
  id: string
  contractId?: string
  shipper?: string
  transporter?: string
  amount?: number
  platformFee?: number
  netAmount?: number
  status: string
  releasedAt?: string | null
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  released: { label: "Released", variant: "default" },
  held: { label: "Held", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export default function AdminPaymentsPage() {
  const { data: paymentsData, loading, error } = useData(
    () => fetchAdminPayments(1, 100),
    { payments: [], total: 0, page: 1, totalPages: 0 },
  )

  const payments = (paymentsData.payments || []) as PaymentRow[]
  const totalVolume = payments.reduce((sum, p) => sum + (p.amount || 0), 0)
  const totalFees = payments.reduce((sum, p) => sum + (p.platformFee || 0), 0)

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
          <DollarSign className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Transaction Log & Audit Trail</h1>
        </div>

        {loading && <p className="py-4 text-center text-muted-foreground">Loading payments...</p>}
        {error && <p className="py-4 text-center text-destructive">Failed to load payments.</p>}

        {!loading && !error && (
          <>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Total Volume</p>
                  <p className="text-xl font-bold">${totalVolume.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Platform Fees</p>
                  <p className="text-xl font-bold">${totalFees.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="text-xl font-bold">{payments.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              {payments.map((payment) => {
                const cfg = statusConfig[payment.status] || statusConfig.pending
                return (
                  <Card key={payment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {payment.id}{payment.contractId ? ` — ${payment.contractId}` : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payment.shipper || "N/A"} → {payment.transporter || "N/A"}{payment.amount ? ` | $${payment.amount.toFixed(2)}` : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Fee: $${(payment.platformFee || 0).toFixed(2)} | Net: $${(payment.netAmount || 0).toFixed(2)}
                            {payment.releasedAt ? ` | Released: ${payment.releasedAt}` : ""}
                          </p>
                        </div>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
