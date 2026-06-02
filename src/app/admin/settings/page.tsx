"use client"

import Link from "next/link"
import { ArrowLeft, Settings, Save } from "lucide-react"
import { useState } from "react"
import { NavHeader } from "@/components/nav-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [platformFee, setPlatformFee] = useState("5")
  const [minPayout, setMinPayout] = useState("10")
  const [autoCompleteHours, setAutoCompleteHours] = useState("24")
  const [minReviewsPublic, setMinReviewsPublic] = useState("3")

  function handleSave() {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role="admin" userName="Admin" />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/admin"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <Settings className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Platform Settings</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="fee">Platform Fee (%)</Label>
              <Input id="fee" type="number" value={platformFee} onChange={(e) => setPlatformFee(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="minPayout">Minimum Payout Amount ($)</Label>
              <Input id="minPayout" type="number" value={minPayout} onChange={(e) => setMinPayout(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Contract Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="autoComplete">Auto-Complete Grace Period (hours)</Label>
              <Input id="autoComplete" type="number" value={autoCompleteHours} onChange={(e) => setAutoCompleteHours(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Review Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="minReviews">Minimum Reviews for Public Display</Label>
              <Input id="minReviews" type="number" value={minReviewsPublic} onChange={(e) => setMinReviewsPublic(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 size-4" data-icon="inline-start" />
          Save Settings
        </Button>
      </main>
    </div>
  )
}
