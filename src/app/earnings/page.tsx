"use client"

import Link from "next/link"
import { ArrowLeft, DollarSign, Percent, TrendingUp, CreditCard, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NavHeader } from "@/components/nav-header"
import { currentTransporter } from "@/lib/data"

const mockEarnings = {
  total: 1570,
  count: 5,
  platformFees: 78.50,
  netEarnings: 1491.50,
  currency: "usd",
}

const mockPaymentHistory = [
  { id: "PAY-001", contractId: "C-003", amount: 450, platformFee: 22.50, netAmount: 427.50, status: "held", date: "June 3, 2026", shipper: "John D." },
  { id: "PAY-002", contractId: "C-002", amount: 320, platformFee: 16.00, netAmount: 304.00, status: "released", date: "May 21, 2026", shipper: "Sarah K." },
  { id: "PAY-003", contractId: "C-001", amount: 800, platformFee: 40.00, netAmount: 760.00, status: "released", date: "June 2, 2026", shipper: "Ali M." },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  held: { label: "Escrow Hold", variant: "default" },
  released: { label: "Released", variant: "secondary" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export default function EarningsPage() {
  const user = currentTransporter

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user.role} userName={user.name} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <h1 className="mb-6 text-2xl font-bold">Earnings Dashboard</h1>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <DollarSign className="size-4 text-primary" />
                </div>
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${mockEarnings.total.toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted-foreground">Gross amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-full bg-amber-500/10">
                  <Percent className="size-4 text-amber-500" />
                </div>
                Platform Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${mockEarnings.platformFees.toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted-foreground">5% deducted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <div className="flex size-8 items-center justify-center rounded-full bg-green-500/10">
                  <TrendingUp className="size-4 text-green-600" />
                </div>
                Net Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">${mockEarnings.netEarnings.toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted-foreground">What you receive</p>
            </CardContent>
          </Card>
        </div>

        {/* Completed Moves Count */}
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <TrendingUp className="size-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{mockEarnings.count}</span> completed moves
          </p>
        </div>

        {/* Payment History */}
        <h2 className="mb-3 text-lg font-semibold">Payment History</h2>
        <div className="flex flex-col gap-3">
          {mockPaymentHistory.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No payments yet.</p>
          ) : (
            mockPaymentHistory.map((pm) => (
              <Card key={pm.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{pm.id}</p>
                        <p className="text-xs text-muted-foreground">{pm.shipper}</p>
                        <p className="text-xs text-muted-foreground">{pm.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-lg font-bold">${pm.amount.toFixed(2)}</p>
                      <p className="text-xs text-green-600 font-medium">Net: ${pm.netAmount.toFixed(2)}</p>
                      <Badge variant={statusConfig[pm.status].variant}>
                        {statusConfig[pm.status].label}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 w-full text-xs">
                    <Download className="mr-1 size-3" />
                    View Receipt
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
