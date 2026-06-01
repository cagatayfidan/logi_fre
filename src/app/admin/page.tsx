"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Truck, FileText, Search, ShieldAlert, ClipboardList, Scale, MessageSquare, Settings, Headset, DollarSign } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { currentUser } from "@/lib/data"

const mockUsers = [
  { id: "user-1", name: "John Doe", email: "john@example.com", role: "shipper", status: "active", moves: 3, contracts: 2 },
  { id: "user-2", name: "Mike Transporter", email: "mike@example.com", role: "transporter", status: "active", moves: 0, contracts: 3 },
  { id: "user-5", name: "FastMove Inc.", email: "fast@example.com", role: "transporter", status: "active", moves: 0, contracts: 2 },
  { id: "user-6", name: "Budget Van Co.", email: "budget@example.com", role: "transporter", status: "suspended", moves: 0, contracts: 1 },
]

export default function AdminPage() {
  const [search, setSearch] = useState("")
  const [suspended, setSuspended] = useState<Set<string>>(new Set(["user-6"]))

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === "active").length,
    totalMoves: 5,
    totalContracts: 4,
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6 flex items-center gap-2">
          <ShieldAlert className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Link href="/admin/moves" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <ClipboardList className="mr-1.5 size-4" data-icon="inline-start" />
            Move Requests
          </Link>
          <Link href="/admin/disputes" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Scale className="mr-1.5 size-4" data-icon="inline-start" />
            Disputes
          </Link>
          <Link href="/admin/reviews" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <MessageSquare className="mr-1.5 size-4" data-icon="inline-start" />
            Reviews
          </Link>
          <Link href="/admin/contracts" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <FileText className="mr-1.5 size-4" data-icon="inline-start" />
            Contracts
          </Link>
          <Link href="/admin/settings" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Settings className="mr-1.5 size-4" data-icon="inline-start" />
            Settings
          </Link>
          <Link href="/admin/tickets" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Headset className="mr-1.5 size-4" data-icon="inline-start" />
            Tickets
          </Link>
          <Link href="/admin/payments" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <DollarSign className="mr-1.5 size-4" data-icon="inline-start" />
            Payments
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="size-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="size-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Truck className="size-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalMoves}</p>
                <p className="text-xs text-muted-foreground">Total Moves</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <FileText className="size-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalContracts}</p>
                <p className="text-xs text-muted-foreground">Contracts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-muted-foreground" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              {filtered.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={u.role === "transporter" ? "default" : "secondary"}>
                      {u.role === "transporter" ? "Transporter" : "Shipper"}
                    </Badge>
                    <Badge variant={suspended.has(u.id) ? "destructive" : "outline"}>
                      {suspended.has(u.id) ? "Suspended" : "Active"}
                    </Badge>
                    <Button
                      variant={suspended.has(u.id) ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => {
                        const next = new Set(suspended)
                        if (next.has(u.id)) next.delete(u.id)
                        else next.add(u.id)
                        setSuspended(next)
                      }}
                    >
                      {suspended.has(u.id) ? "Reactivate" : "Suspend"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
