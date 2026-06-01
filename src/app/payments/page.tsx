"use client"

import Link from "next/link"
import { ArrowLeft, CreditCard, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { currentUser } from "@/lib/data"
import { fetchPaymentHistory } from "@/lib/api/payments"
import { useData } from "@/lib/use-data"

import type { Payment } from "@/lib/api/payments"

const mockPaymentsFallback: Payment[] = [
  { id: "PAY-001", contractId: "C-003", shipperId: "user-1", transporterId: "user-2", amount: 450, currency: "usd", status: "held", createdAt: "2026-06-03T00:00:00Z" },
  { id: "PAY-002", contractId: "C-002", shipperId: "user-1", transporterId: "user-5", amount: 320, currency: "usd", status: "released", createdAt: "2026-05-21T00:00:00Z" },
  { id: "PAY-003", contractId: "C-001", shipperId: "user-1", transporterId: "user-2", amount: 800, currency: "usd", status: "released", createdAt: "2026-06-02T00:00:00Z" },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "outline" },
  held: { label: "Escrow Hold", variant: "default" },
  released: { label: "Released", variant: "secondary" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export default function PaymentsPage() {
  const user = currentUser
  const isShipper = user.role === "shipper"
  const { data: payments } = useData(fetchPaymentHistory, mockPaymentsFallback)

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user.role} userName={user.name} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Payment History
        </Link>

        <h1 className="mb-6 text-2xl font-bold">
          {isShipper ? "Payments Sent" : "Payments Received"}
        </h1>

        <div className="flex flex-col gap-3">
          {payments.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No payments yet.</p>
          ) : (
            payments.map((pm) => (
              <Card key={pm.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{pm.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {isShipper ? pm.transporterId : pm.shipperId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(pm.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-lg font-bold">${pm.amount.toFixed(2)}</p>
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
