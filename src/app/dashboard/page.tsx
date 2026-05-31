"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, MapPin, Calendar } from "lucide-react"
import { NavHeader } from "@/components/nav-header"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { mockMoves } from "@/lib/data"

const statusConfig = {
  active: { label: "Active", variant: "default" as const },
  completed: { label: "Completed", variant: "secondary" as const },
  draft: { label: "Draft", variant: "outline" as const },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")
  const moves = mockMoves.filter((m) => m.status === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="shipper" userName="John Doe" />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Moves</h1>
          <Link href="/moves/create" className={buttonVariants({ variant: "default", size: "default" })}>
            <Plus className="mr-2 size-4" data-icon="inline-start" />
            Post a Move
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {moves.length === 0 ? (
              <EmptyState
                icon="📦"
                title="No moves yet"
                description="You haven't posted any moves yet. Ready to move something?"
                action={
                  <Link href="/moves/create" className={buttonVariants({ variant: "default", size: "default" })}>
                    <Plus className="mr-2 size-4" data-icon="inline-start" />
                    Post a Move
                  </Link>
                }
              />
            ) : (
              <div className="flex flex-col gap-3">
                {moves.map((move) => (
                  <Link key={move.id} href={`/moves/${move.id}`}>
                    <Card className="transition-colors hover:border-primary/30">
                      <CardContent className="flex items-start justify-between p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{move.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="size-4" />
                            <span>{move.pickupDate}</span>
                          </div>
                          <div className="flex gap-3 text-sm text-muted-foreground">
                            <span>{move.items.length} items</span>
                            <span>{move.totalWeight}kg</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={statusConfig[move.status].variant}>
                            {statusConfig[move.status].label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Offers: {move.offerCount}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
