"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Truck, Package, Menu, X, Bell, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useT } from "@/lib/i18n-provider"
import { fetchUnreadCount } from "@/lib/api/notifications"

interface NavHeaderProps {
  role?: "shipper" | "transporter" | "admin"
  userName?: string
}

export function NavHeader({ role: propRole, userName: propUserName }: NavHeaderProps) {
  const { t } = useT()
  const { user, loading, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const role = propRole || user?.role || "shipper"
  const userName = propUserName || user?.name || "User"

  useEffect(() => {
    fetchUnreadCount()
      .then((res) => setUnreadCount(res.count))
      .catch(() => {})
  }, [])

  const links: { href: string; label: string }[] = role === "transporter"
    ? [
        { href: "/moves", label: t('nav.browseMoves') },
        { href: "/schedule", label: t('nav.schedule') },
        { href: "/my-offers", label: t('nav.myOffers') },
        { href: "/contracts", label: t('nav.contracts') },
        { href: "/payments", label: t('nav.payments') },
      ]
    : [
        { href: "/dashboard", label: t('nav.myMoves') },
        { href: "/schedule", label: t('nav.schedule') },
        { href: "/contracts", label: t('nav.contracts') },
        { href: "/payments", label: t('nav.payments') },
      ]

  if (role === "transporter") {
    links.push({ href: "/earnings", label: t('nav.earnings') })
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link href={role === "transporter" ? "/moves" : "/dashboard"} className="flex items-center gap-2">
          <Truck className="size-6 text-primary" />
          <span className="font-heading text-lg font-bold tracking-tight">{t('nav.brand')}</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative flex size-8 items-center justify-center"
          >
            <Bell className="size-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8 rounded-full" />}>
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground capitalize">{role}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(role === "transporter" ? "/moves" : "/dashboard")}>
                {t('nav.dashboard')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { logout(); router.push("/auth/login") }}>
                {t('nav.signOut')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
