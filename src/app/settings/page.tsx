"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Camera, CreditCard, Plus, Trash2, Landmark } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { NavHeader } from "@/components/nav-header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { currentUser, getPaymentMethods, getPayoutMethods } from "@/lib/data"
import type { PaymentMethod, PayoutMethod } from "@/lib/data"
import { useT } from "@/lib/i18n-provider"
import { setLocale, getLocaleLabel, type Locale, locales } from "@/lib/i18n"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordForm = z.infer<typeof passwordSchema>

interface NotificationPrefs {
  emailNotifications: boolean
  pushNotifications: boolean
  offerAlerts: boolean
  contractUpdates: boolean
}

export default function SettingsPage() {
  const { t, locale } = useT()
  const user = currentUser

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
      address: user.address ?? "",
    },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailNotifications: true,
    pushNotifications: true,
    offerAlerts: true,
    contractUpdates: true,
  })

  const [distanceUnit, setDistanceUnit] = useState("km")
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("english")
  const prefsChanged =
    distanceUnit !== "km" || currency !== "USD" || language !== "english"

  function handleDistanceChange(value: string | null) {
    if (value) setDistanceUnit(value)
  }
  function handleCurrencyChange(value: string | null) {
    if (value) setCurrency(value)
  }
  function handleLanguageChange(value: string | null) {
    if (value) setLanguage(value)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(getPaymentMethods(user.id))
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCardLast4, setNewCardLast4] = useState("")
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(getPayoutMethods(user.id))
  const [showAddPayout, setShowAddPayout] = useState(false)
  const [newPayoutLast4, setNewPayoutLast4] = useState("")
  const [newPayoutBank, setNewPayoutBank] = useState("")

  function onProfileSubmit(data: ProfileForm) {
    console.log("Profile", data)
    toast.success("Profile updated successfully")
  }

  function onPasswordSubmit(data: PasswordForm) {
    console.log("Password", data)
    toast.success("Password updated successfully")
    passwordForm.reset()
  }

  function toggleNotification(key: keyof NotificationPrefs) {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      toast.success(
        `${key === "emailNotifications" ? "Email" : key === "pushNotifications" ? "Push" : key === "offerAlerts" ? "Offer alerts" : "Contract updates"} ${next[key] ? "enabled" : "disabled"}`
      )
      return next
    })
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  function handleDeleteAccount() {
    setDeleteDialogOpen(false)
    setDeleteConfirmText("")
    toast.success("Account deleted successfully")
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const passwordValues = passwordForm.watch()
  const passwordFilled =
    passwordValues.currentPassword &&
    passwordValues.newPassword &&
    passwordValues.confirmPassword

  return (
    <div className="min-h-screen bg-background">
      <NavHeader role={user.role} userName={user.name} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Settings
        </Link>

        <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>

        {/* Profile */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <FieldGroup>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative"
                  >
                    <Avatar size="lg" className="cursor-pointer">
                      {avatarUrl && <AvatarImage src={avatarUrl} />}
                      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <Camera className="size-4 text-white" />
                    </span>
                  </button>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email.replace(/(.{2}).+@/, "$1***@")}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" {...profileForm.register("name")} />
                  <FieldError errors={[profileForm.formState.errors.name]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <div className="relative">
                    <Input id="email" value={user.email} disabled className="pr-8" />
                    <span
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      title="Email cannot be changed"
                    >
                      <Lock className="size-3.5" />
                    </span>
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input id="phone" type="tel" {...profileForm.register("phone")} />
                  <FieldError errors={[profileForm.formState.errors.phone]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input id="address" {...profileForm.register("address")} />
                </Field>

                <Button type="submit" disabled={!profileForm.formState.isDirty}>
                  Save Changes
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Change Password */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="currentPassword">
                    Current Password
                  </FieldLabel>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                  />
                  <FieldError
                    errors={[passwordForm.formState.errors.currentPassword]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Input
                    id="newPassword"
                    type="password"
                    {...passwordForm.register("newPassword")}
                  />
                  <FieldError
                    errors={[passwordForm.formState.errors.newPassword]}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                  />
                  <FieldError
                    errors={[passwordForm.formState.errors.confirmPassword]}
                  />
                </Field>

                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>{"\u2022"} At least 8 characters</li>
                  <li>{"\u2022"} 1 uppercase + 1 number</li>
                </ul>

                <Button
                  type="submit"
                  disabled={
                    !passwordFilled || !passwordForm.formState.isValid
                  }
                >
                  Update Password
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Notification Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <NotificationRow
                label="Email Notifications"
                description="Receive updates via email"
                checked={notifications.emailNotifications}
                onToggle={() => toggleNotification("emailNotifications")}
              />
              <Separator />
              <NotificationRow
                label="Push Notifications"
                description="Receive push notifications"
                checked={notifications.pushNotifications}
                onToggle={() => toggleNotification("pushNotifications")}
              />
              <Separator />
              <NotificationRow
                label="Offer Alerts"
                description={
                  notifications.pushNotifications
                    ? "Get notified when you receive a new offer"
                    : "(requires push)"
                }
                checked={notifications.offerAlerts}
                onToggle={() => toggleNotification("offerAlerts")}
                disabled={!notifications.pushNotifications}
              />
              <Separator />
              <NotificationRow
                label="Contract Updates"
                description="Status changes on your active contracts"
                checked={notifications.contractUpdates}
                onToggle={() => toggleNotification("contractUpdates")}
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Changes save instantly — no save button needed
            </p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your saved payment cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {pm.brand} •••• {pm.last4}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expires {String(pm.expiryMonth).padStart(2, "0")}/{pm.expiryYear}
                        {pm.isDefault && " · Default"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setPaymentMethods((prev) => prev.filter((m) => m.id !== pm.id))}
                  >
                    <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            {showAddCard ? (
              <div className="mt-3 space-y-3 rounded-lg border p-3">
                <p className="text-sm font-medium">Add New Card</p>
                <Input
                  placeholder="Card number (last 4 digits)"
                  maxLength={4}
                  value={newCardLast4}
                  onChange={(e) => setNewCardLast4(e.target.value.replace(/\D/g, ""))}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={newCardLast4.length !== 4}
                    onClick={() => {
                      setPaymentMethods((prev) => [
                        ...prev,
                        {
                          id: `pm-${Date.now()}`,
                          type: "card",
                          last4: newCardLast4,
                          brand: "Card",
                          expiryMonth: 12,
                          expiryYear: 2028,
                          isDefault: prev.length === 0,
                          createdAt: new Date().toLocaleDateString(),
                        },
                      ])
                      setNewCardLast4("")
                      setShowAddCard(false)
                    }}
                  >
                    Add Card
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setShowAddCard(false); setNewCardLast4("") }}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => setShowAddCard(true)}
              >
                <Plus className="mr-1 size-4" />
                Add Payment Method
              </Button>
            )}
          </CardContent>
        </Card>

        {user.role === "transporter" && (
          <>
            <Separator className="my-6" />

            {/* Payout Methods */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
                <CardDescription>Manage your payout accounts to receive payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payoutMethods.map((pm) => (
                    <div key={pm.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                          <Landmark className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {pm.bankName ?? "Bank Account"} •••• {pm.last4}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pm.isDefault ? "Default" : "Backup"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setPayoutMethods((prev) => prev.filter((m) => m.id !== pm.id))}
                      >
                        <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>

                {showAddPayout ? (
                  <div className="mt-3 space-y-3 rounded-lg border p-3">
                    <p className="text-sm font-medium">Add Payout Account</p>
                    <Input
                      placeholder="Bank name"
                      value={newPayoutBank}
                      onChange={(e) => setNewPayoutBank(e.target.value)}
                    />
                    <Input
                      placeholder="Account number (last 4 digits)"
                      maxLength={4}
                      value={newPayoutLast4}
                      onChange={(e) => setNewPayoutLast4(e.target.value.replace(/\D/g, ""))}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={newPayoutLast4.length !== 4}
                        onClick={() => {
                          setPayoutMethods((prev) => [
                            ...prev,
                            {
                              id: `po-${Date.now()}`,
                              type: "bank_account",
                              last4: newPayoutLast4,
                              bankName: newPayoutBank || "Bank Account",
                              isDefault: prev.length === 0,
                              createdAt: new Date().toLocaleDateString(),
                            },
                          ])
                          setNewPayoutLast4("")
                          setNewPayoutBank("")
                          setShowAddPayout(false)
                        }}
                      >
                        Add Account
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setShowAddPayout(false); setNewPayoutLast4(""); setNewPayoutBank("") }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setShowAddPayout(true)}
                  >
                    <Plus className="mr-1 size-4" />
                    Add Payout Method
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Separator className="my-6" />

        {/* Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Preferred Distance Unit</FieldLabel>
                <Select value={distanceUnit} onValueChange={handleDistanceChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers (km)</SelectItem>
                    <SelectItem value="mi">Miles (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Preferred Currency</FieldLabel>
                <Select value={currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="TRY">TRY (₺)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>{t('settings.language')}</FieldLabel>
                <Select value={locale} onValueChange={(v) => { if (v) setLocale(v as Locale) }}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locales.map((l) => (
                      <SelectItem key={l} value={l}>{getLocaleLabel(l)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Button
                type="button"
                disabled={!prefsChanged}
                onClick={() => toast.success("Preferences saved")}
              >
                Save Preferences
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Danger Zone */}
        <Card className="mb-6 border-l-4 border-l-red-600 border-t border-t-red-200">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-destructive">
                  Delete Account
                </p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data. This cannot be
                  undone.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open)
            if (!open) setDeleteConfirmText("")
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be reversed. All your data,
                moves, offers, and contracts will be deleted immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="px-4">
              <Label htmlFor="delete-confirm" className="text-sm">
                Type &quot;DELETE&quot; to confirm:
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="mt-1"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteConfirmText("")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteConfirmText !== "DELETE"}
                onClick={handleDeleteAccount}
              >
                Delete Forever
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}

function NotificationRow({
  label,
  description,
  checked,
  onToggle,
  disabled,
}: {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
    </div>
  )
}
