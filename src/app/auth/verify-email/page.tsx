"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Truck, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { sendVerification, verifyEmail } from "@/lib/api/auth"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const { user } = useAuth()
  const email = user?.email || "john@example.com"
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (email && !verified) {
      sendVerification(email).catch(() => {})
    }
  }, [email, verified])

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (countdown === 0) setCanResend(true)
  }, [countdown, canResend])

  function handleChange(index: number, value: string) {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`)
      next?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`)
      prev?.focus()
    }
  }

  async function handleResend() {
    setSending(true)
    try {
      await sendVerification(email)
      toast.success("Verification code resent")
      setCountdown(60)
      setCanResend(false)
    } catch (e: any) {
      toast.error(e?.message || "Failed to resend code")
    } finally {
      setSending(false)
    }
  }

  async function handleVerify() {
    setVerifying(true)
    try {
      await verifyEmail(email, code.join(""))
      setVerified(true)
    } catch (e: any) {
      toast.error(e?.message || "Invalid verification code")
    } finally {
      setVerifying(false)
    }
  }

  if (verified) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
              ✓
            </div>
            <CardTitle>Email Verified!</CardTitle>
            <CardDescription>Your email has been successfully verified.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full">Continue to Sign In</Button>
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
          <Link href="/auth/register" className="mb-2 flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a 6-digit verification code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {code.map((digit, i) => (
              <Input
                key={i}
                id={`code-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="h-12 w-12 text-center text-lg"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>
          <Button className="mt-6 w-full" onClick={handleVerify} disabled={code.some((d) => !d) || verifying}>
            {verifying && <Loader2 className="mr-2 size-4 animate-spin" />}
            Verify Email
          </Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {canResend ? (
              <button onClick={handleResend} disabled={sending} className="font-medium text-primary hover:underline disabled:opacity-50">
                {sending ? "Sending..." : "Resend verification code"}
              </button>
            ) : (
              <span>Resend code in {countdown}s</span>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
