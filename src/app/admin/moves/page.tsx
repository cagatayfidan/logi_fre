"use client"

import Link from "next/link"
import { ArrowLeft, ClipboardList, EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockMoves } from "@/lib/data"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  draft: { label: "Draft", variant: "outline" },
}

export default function AdminMovesPage() {
  const [hiddenMoves, setHiddenMoves] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<string>("all")

  const tabs = ["all", "active", "completed", "hidden"]
  const filtered = mockMoves.filter((m) => {
    if (activeTab === "hidden") return hiddenMoves.has(m.id)
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
          {filtered.map((move) => (
            <Card key={move.id} className={hiddenMoves.has(move.id) ? "opacity-50" : ""}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{move.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {move.shipperName} — {move.offerCount} offers — {move.pickupDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusConfig[move.status]?.variant || "outline"}>
                    {statusConfig[move.status]?.label || move.status}
                  </Badge>
                  {hiddenMoves.has(move.id) && <Badge variant="outline">Hidden</Badge>}
                  <Button variant="outline" size="sm" onClick={() => toggleHide(move.id)}>
                    {hiddenMoves.has(move.id) ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
