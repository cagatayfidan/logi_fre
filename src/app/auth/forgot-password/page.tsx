"use client"

import { useState } from "react"
import Link from "next/link"
import { Truck, ArrowLeft, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { forgotPassword } from "@/lib/api/auth"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setLoading(true)
    try {
      await forgotPassword(email)
      setSubmitted(true)
    } catch (e: any) {
      toast.error(e?.message || "Failed to send reset link")
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
              <Mail className="size-6" />
            </div>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We sent a password reset link to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button onClick={() => setSubmitted(false)} className="font-medium text-primary hover:underline">
                try a different email
              </button>
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 size-4" data-icon="inline-start" />
                Back to Sign In
              </Button>
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
          <CardTitle>Forgot password?</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldError errors={[{ message: error }]} />
              </Field>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Send Reset Link
              </Button>
            </FieldGroup>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
