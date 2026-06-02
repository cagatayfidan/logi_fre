"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Truck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { resetPassword } from "@/lib/api/auth"
import { toast } from "sonner"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (password !== confirm) newErrors.confirm = "Passwords do not match"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    setLoading(true)
    try {
      await resetPassword(token, password)
      setSubmitted(true)
    } catch (e: any) {
      toast.error(e?.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle className="size-6" />
            </div>
            <CardTitle>Password reset</CardTitle>
            <CardDescription>Your password has been successfully reset.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full">Sign In with New Password</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError errors={[{ message: errors.password }]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <FieldError errors={[{ message: errors.confirm }]} />
              </Field>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Reset Password
              </Button>
            </FieldGroup>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/auth/login" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              <ArrowLeft className="size-3.5" />
              Back to Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
