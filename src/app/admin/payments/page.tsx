"use client"

import Link from "next/link"
import { ArrowLeft, DollarSign } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockPayments = [
  { id: "PAY-001", contractId: "C-002", shipper: "John Doe", transporter: "FastMove Inc.", amount: 320, platformFee: 16, netAmount: 304, status: "released", releasedAt: "May 25, 2026" },
  { id: "PAY-002", contractId: "C-004", shipper: "Alice Smith", transporter: "FastMove Inc.", amount: 520, platformFee: 26, netAmount: 494, status: "released", releasedAt: "June 10, 2026" },
  { id: "PAY-003", contractId: "C-001", shipper: "John Doe", transporter: "Mike's Transport", amount: 800, platformFee: 40, netAmount: 760, status: "held", releasedAt: null },
  { id: "PAY-004", contractId: "C-003", shipper: "John Doe", transporter: "Mike's Transport", amount: 450, platformFee: 22.5, netAmount: 427.5, status: "held", releasedAt: null },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  released: { label: "Released", variant: "default" },
  held: { label: "Held", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export default function AdminPaymentsPage() {
  const totalVolume = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalFees = mockPayments.reduce((sum, p) => sum + (p.platformFee || 0), 0)

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
              <p className="text-xl font-bold">{mockPayments.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          {mockPayments.map((payment) => {
            const cfg = statusConfig[payment.status] || statusConfig.pending
            return (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {payment.id} — {payment.contractId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.shipper} → {payment.transporter} | ${payment.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Fee: ${payment.platformFee.toFixed(2)} | Net: ${payment.netAmount.toFixed(2)}
                        {payment.releasedAt && ` | Released: ${payment.releasedAt}`}
                      </p>
                    </div>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
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
