"use client"

import Link from "next/link"
import { ArrowLeft, Bell, CheckCheck, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { currentUser, getNotificationsForUser, getOfferById, notificationTypeIcons, type Notification } from "@/lib/data"
import { fetchNotifications, markNotificationRead } from "@/lib/api/notifications"
import { useData } from "@/lib/use-data"
import { cn } from "@/lib/utils"

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diffMs = now - date
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function NotificationsPage() {
  const user = currentUser
  const { data: apiNotifications } = useData(fetchNotifications, getNotificationsForUser(user.id))
  const [notifications, setNotifications] = useState<Notification[]>(
    () => getNotificationsForUser(user.id),
  )

  useEffect(() => {
    if (apiNotifications.length > 0) setNotifications(apiNotifications)
  }, [apiNotifications])

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => n.isUrgent).length

  function markAsRead(id: string) {
    markNotificationRead(id).catch(() => {})
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    )
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  function getRelatedLink(n: Notification): string | null {
    if (n.relatedModel === "MoveRequest" && n.relatedId) return `/moves/${n.relatedId}`
    if (n.relatedModel === "Offer" && n.relatedId) {
      const offer = getOfferById(n.relatedId)
      if (offer?.moveId) return `/moves/${offer.moveId}`
      return `/moves`
    }
    if (n.relatedModel === "Contract" && n.relatedId) return `/contracts/${n.relatedId}`
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user.role} userName={user.name} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={user.role === "shipper" ? "/dashboard" : "/moves"}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {urgentCount > 0 && (
              <Badge variant="destructive" className="mr-1">{urgentCount} urgent</Badge>
            )}
            {unreadCount > 0 && (
              <Badge variant="default">{unreadCount} new</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-1 size-4" data-icon="inline-start" />
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Bell className="mb-4 size-12 text-muted-foreground" />
            <h2 className="mb-1 text-lg font-semibold">No notifications yet</h2>
            <p className="text-sm text-muted-foreground">
              When you get offers, contract updates, and other activity, they&apos;ll show up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((n, i) => {
              const link = getRelatedLink(n)
              const icon = notificationTypeIcons[n.type] || "🔔"
              const content = (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="w-full text-left"
                >
                  <Card
                    className={cn(
                      "transition-colors hover:border-primary/30",
                      !n.isRead && "border-l-4 border-l-primary",
                      n.isUrgent && "border-l-red-500",
                    )}
                  >
                    <CardContent className="flex items-start gap-3 p-4">
                      <span className="mt-0.5 text-lg">{icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <p
                              className={cn(
                                "text-sm",
                                !n.isRead && "font-medium",
                              )}
                            >
                              {n.title}
                            </p>
                            {n.isUrgent && (
                              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">URGENT</Badge>
                            )}
                          </div>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
              return (
                <div key={n.id}>
                  {link ? (
                    <Link href={link}>{content}</Link>
                  ) : (
                    content
                  )}
                  {i < notifications.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
