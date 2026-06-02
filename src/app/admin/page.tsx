"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Truck, FileText, Search, ShieldAlert, ClipboardList, Scale, MessageSquare, Settings, Headset, DollarSign } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavHeader } from "@/components/nav-header"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/use-data"
import { fetchAdminStats, fetchAdminUsers, suspendUser } from "@/lib/api/admin"
import type { AdminUser, PaginatedResponse } from "@/lib/api/admin"
import { toast } from "sonner"

export default function AdminPage() {
  const [search, setSearch] = useState("")
  const { user } = useAuth()
  const { data: stats, loading: statsLoading } = useData(fetchAdminStats, {
    totalUsers: 0, totalMoves: 0, totalContracts: 0, totalPayments: 0, totalVolume: 0,
  })
  const { data: usersData, loading: usersLoading } = useData(
    () => fetchAdminUsers(1, 100),
    { users: [], total: 0, page: 1, totalPages: 0 } as PaginatedResponse<AdminUser>,
  )

  const filtered = (usersData.users || []).filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  )

  async function handleSuspend(id: string, isSuspended: boolean) {
    try {
      await suspendUser(id)
      toast.success(isSuspended ? "User reactivated" : "User suspended")
    } catch {
      toast.error("Failed to update user status")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName={user?.name || "Admin"} />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
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
                <p className="text-2xl font-bold">${(stats.totalVolume || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Volume</p>
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
                    <Badge variant={u.isSuspended ? "destructive" : "outline"}>
                      {u.isSuspended ? "Suspended" : "Active"}
                    </Badge>
                    <Button
                      variant={u.isSuspended ? "outline" : "destructive"}
                      size="sm"
                      onClick={() => handleSuspend(u.id, !!u.isSuspended)}
                    >
                      {u.isSuspended ? "Reactivate" : "Suspend"}
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
