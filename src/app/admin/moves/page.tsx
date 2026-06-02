"use client"

import Link from "next/link"
import { ArrowLeft, ClipboardList, EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useData } from "@/lib/use-data"
import { fetchAdminContracts } from "@/lib/api/admin"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
}

export default function AdminMovesPage() {
  const [hiddenMoves, setHiddenMoves] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<string>("all")
  const { data: contractsData, loading } = useData(
    () => fetchAdminContracts(1, 100),
    { contracts: [], total: 0, page: 1, totalPages: 0 },
  )

  const moves = (contractsData.contracts || []) as Array<Record<string, unknown>>
  const tabs = ["all", "active", "completed", "hidden"]
  const filtered = moves.filter((m) => {
    const id = String(m.id)
    if (activeTab === "hidden") return hiddenMoves.has(id)
    if (activeTab === "active") return m.status === "active"
    if (activeTab === "completed") return m.status === "completed"
    return true
  })

  function toggleHide(id: string) {
    const next = new Set(hiddenMoves)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setHiddenMoves(next)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/admin" className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
        <div className="mb-6 flex items-center gap-2">
          <ClipboardList className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Move Request Moderation</h1>
        </div>
        <div className="mb-4 flex gap-2">
          {tabs.map((t) => (
            <Button key={t} variant={activeTab === t ? "default" : "outline"} size="sm" onClick={() => setActiveTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((move) => {
            const id = String(move.id)
            return (
              <Card key={id} className={hiddenMoves.has(id) ? "opacity-50" : ""}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{String(move.title)}</p>
                    <p className="text-xs text-muted-foreground">
                      {String(move.shipperName)} — {String(move.offerCount || 0)} offers — {String(move.pickupDate || "")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusConfig[String(move.status)]?.variant || "outline"}>
                      {statusConfig[String(move.status)]?.label || String(move.status)}
                    </Badge>
                    {hiddenMoves.has(id) && <Badge variant="outline">Hidden</Badge>}
                    <Button variant="outline" size="sm" onClick={() => toggleHide(id)}>
                      {hiddenMoves.has(id) ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                    </Button>
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
