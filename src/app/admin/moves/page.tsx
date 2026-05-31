"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { cn } from "@/lib/utils"

type MoveStatus = "active" | "completed" | "cancelled"

interface AdminMove {
  id: string
  title: string
  shipper: string
  status: MoveStatus
  isAdminHidden: boolean
  createdAt: string
  offerCount: number
}

const initialMoves: AdminMove[] = [
  {
    id: "move-1",
    title: "Apt → House (Istanbul)",
    shipper: "John Doe",
    status: "active",
    isAdminHidden: false,
    createdAt: "June 1, 2026",
    offerCount: 3,
  },
  {
    id: "move-2",
    title: "Office Relocation (Ankara)",
    shipper: "Alice Smith",
    status: "active",
    isAdminHidden: false,
    createdAt: "May 30, 2026",
    offerCount: 7,
  },
  {
    id: "move-3",
    title: "Furniture Only (Izmir)",
    shipper: "Bob Johnson",
    status: "completed",
    isAdminHidden: true,
    createdAt: "May 20, 2026",
    offerCount: 2,
  },
  {
    id: "move-4",
    title: "Small Move (Istanbul)",
    shipper: "John Doe",
    status: "active",
    isAdminHidden: false,
    createdAt: "June 2, 2026",
    offerCount: 1,
  },
]

type FilterTab = "all" | "active" | "completed" | "hidden"

const statusBadgeVariant = (status: MoveStatus) => {
  switch (status) {
    case "active":
      return "default" as const
    case "completed":
      return "secondary" as const
    case "cancelled":
      return "destructive" as const
  }
}

export default function AdminMovesPage() {
  const [moves, setMoves] = useState<AdminMove[]>(initialMoves)
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const toggleHidden = (id: string) => {
    setMoves((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAdminHidden: !m.isAdminHidden } : m)),
    )
  }

  const filtered = moves.filter((m) => {
    if (activeTab === "all") return true
    if (activeTab === "hidden") return m.isAdminHidden
    return m.status === activeTab
  })

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "hidden", label: "Hidden" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/admin"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Admin
        </Link>

        <h1 className="mb-6 text-2xl font-bold">Move Request Moderation</h1>

        {/* Filter Tabs */}
        <div className="mb-4 flex gap-1 rounded-lg border bg-muted/40 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {tab.id === "hidden" && (
                <span className="ml-1 text-xs text-muted-foreground">
                  ({moves.filter((m) => m.isAdminHidden).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Move Rows */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No move requests in this category.
            </div>
          )}
          {filtered.map((move) => (
            <Card
              key={move.id}
              className={cn(
                "transition-opacity",
                move.isAdminHidden && "opacity-50",
              )}
            >
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">{move.title}</p>
                    {move.isAdminHidden && (
                      <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>Shipper: <span className="font-medium text-foreground">{move.shipper}</span></span>
                    <span>{move.offerCount} offer{move.offerCount !== 1 ? "s" : ""}</span>
                    <span>{move.createdAt}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={statusBadgeVariant(move.status)} className="capitalize">
                    {move.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleHidden(move.id)}
                    className="flex items-center gap-1"
                  >
                    {move.isAdminHidden ? (
                      <>
                        <Eye className="size-3.5" />
                        Unhide
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3.5" />
                        Hide
                      </>
                    )}
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
