"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Truck,
  FileText,
  Search,
  ShieldAlert,
  Star,
  DollarSign,
  Package,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"

const mockStats = {
  users: { total: 120, shippers: 80, transporters: 40, suspended: 3 },
  moveRequests: { total: 95, active: 30, completed: 55, cancelled: 10 },
  contracts: { total: 60, active: 8, completed: 45, cancelled: 7 },
  payments: { totalVolume: 45000, platformFees: 2250, releasedCount: 45 },
  reviews: { total: 88, flagged: 5, averageRating: 4.2 },
}

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

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
          <ShieldAlert className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Admin Navigation Links */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link href="/admin/moves" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Move Requests
          </Link>
          <Link href="/admin/disputes" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Disputes
          </Link>
          <Link href="/admin/reviews" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Reviews
          </Link>
        </div>

        {/* Users Row */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</p>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">{mockStats.users.total}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
              <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                <AlertTriangle className="size-3" />
                {mockStats.users.suspended} suspended
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Package className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.users.shippers}</p>
                <p className="text-xs text-muted-foreground">Shippers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20">
                <Truck className="size-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.users.transporters}</p>
                <p className="text-xs text-muted-foreground">Transporters</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Row */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</p>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                <Truck className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.moveRequests.active}</p>
                <p className="text-xs text-muted-foreground">Active Moves</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <FileText className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.contracts.total}</p>
                <p className="text-xs text-muted-foreground">Total Contracts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Star className="size-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.reviews.averageRating}</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Row */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</p>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${mockStats.payments.totalVolume.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Volume</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/20">
                <DollarSign className="size-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${mockStats.payments.platformFees.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Platform Fees</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">User Management</h2>
            </div>
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
