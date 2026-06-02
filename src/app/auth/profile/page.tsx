"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Truck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { updateProfile } from "@/lib/api/auth"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const { user, refresh } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        address: (user as any).address || "",
        city: (user as any).city || "",
        state: (user as any).state || "",
        zip: (user as any).zip || "",
      })
    }
  }, [user, reset])

  async function onSubmit(data: ProfileForm) {
    setLoading(true)
    try {
      await updateProfile(data as any)
      await refresh()
      window.location.href = "/dashboard"
    } catch (e: any) {
      toast.error(e?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Add your contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" {...register("name")} />
                <FieldError errors={[errors.name]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
                <FieldError errors={[errors.phone]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="address">Address (optional)</FieldLabel>
                <Input id="address" placeholder="123 Main St" {...register("address")} />
              </Field>
              <div className="flex gap-2">
                <Field className="flex-1">
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input id="city" placeholder="New York" {...register("city")} />
                </Field>
                <Field className="w-20">
                  <FieldLabel htmlFor="state">State</FieldLabel>
                  <Input id="state" placeholder="NY" {...register("state")} />
                </Field>
                <Field className="w-24">
                  <FieldLabel htmlFor="zip">Zip</FieldLabel>
                  <Input id="zip" placeholder="10001" {...register("zip")} />
                </Field>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Save &amp; Continue
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You can skip and edit this later
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
