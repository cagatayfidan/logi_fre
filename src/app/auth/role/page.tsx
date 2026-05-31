"use client"

import Link from "next/link"
import { useState } from "react"
import { Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function RolePage() {
  const [selectedRole, setSelectedRole] = useState<"shipper" | "transporter" | null>(null)

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <CardTitle>I want to...</CardTitle>
          <CardDescription>Choose how you&apos;ll use Haul</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSelectedRole("shipper")}
            className={cn(
              "flex items-start gap-4 rounded-lg border p-4 text-left transition-colors",
              selectedRole === "shipper"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-muted-foreground"
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Shipper</p>
              <p className="text-sm text-muted-foreground">I need things moved</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("transporter")}
            className={cn(
              "flex items-start gap-4 rounded-lg border p-4 text-left transition-colors",
              selectedRole === "transporter"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:border-muted-foreground"
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Truck className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Transporter</p>
              <p className="text-sm text-muted-foreground">
                I have a vehicle &amp; can move goods
              </p>
            </div>
          </button>
          <Button
            className="mt-2 w-full"
            disabled={!selectedRole}
            onClick={() => window.location.assign("/auth/profile")}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
