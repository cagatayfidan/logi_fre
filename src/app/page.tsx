import Link from "next/link"
import { Truck, Search, Handshake, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">Haul</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>Sign In</Link>
            <Link href="/auth/register" className={buttonVariants({ variant: "default", size: "sm" })}>Get Started</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 text-center md:py-32">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Move Anything.
            <br />
            <span className="text-primary">Anywhere.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            Compare offers from local transporters in minutes. Post your move, get quotes, and
            choose the best transporter for your needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register?role=shipper" className={buttonVariants({ variant: "default", size: "lg" })}>
              Post a Move
              <ArrowRight className="ml-2 size-4" data-icon="inline-end" />
            </Link>
            <Link href="/auth/register?role=transporter" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Earn as Transporter
              <ArrowRight className="ml-2 size-4" data-icon="inline-end" />
            </Link>
          </div>
        </section>

        <section className="border-t border-border bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">1. Post Your Move</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us your pickup and drop-off locations, what you need to move, and when.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Handshake className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">2. Get Offers</h3>
                <p className="text-sm text-muted-foreground">
                  Local transporters bid on your move. Compare prices, reviews, and services.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">3. Move Happens</h3>
                <p className="text-sm text-muted-foreground">
                  Accept the best offer and your move is booked. Track everything from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Haul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
