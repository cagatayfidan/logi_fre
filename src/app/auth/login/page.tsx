"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Truck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { login } from "@/lib/api/auth"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { refresh } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    try {
      await login(data)
      await refresh()
      window.location.href = "/dashboard"
    } catch (e: any) {
      toast.error(e?.message || "Invalid email or password")
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
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                <FieldError errors={[errors.password]} />
              </Field>
              <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Sign In
              </Button>
            </FieldGroup>
          </form>
          <div className="mt-4 space-y-2 text-center text-sm text-muted-foreground">
            <p>
              No account?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            <p>
              Didn&apos;t receive verification email?{" "}
              <Link href="/auth/verify-email" className="font-medium text-primary hover:underline">
                Resend
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
