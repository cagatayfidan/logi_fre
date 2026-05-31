"use client"

import Link from "next/link"
import { Truck, Search, Handshake, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useT } from "@/lib/i18n-provider"

export default function LandingPage() {
  const { t } = useT()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Truck className="size-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">{t('nav.brand')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>{t('auth.signIn')}</Link>
            <Link href="/auth/register" className={buttonVariants({ variant: "default", size: "sm" })}>{t('common.submit')}</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 text-center md:py-32">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            {t('landing.hero.title')}
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register?role=shipper" className={buttonVariants({ variant: "default", size: "lg" })}>
              {t('landing.hero.postMove')}
              <ArrowRight className="ml-2 size-4" data-icon="inline-end" />
            </Link>
            <Link href="/auth/register?role=transporter" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {t('landing.hero.becomeTransporter')}
              <ArrowRight className="ml-2 size-4" data-icon="inline-end" />
            </Link>
          </div>
        </section>

        <section className="border-t border-border bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-2xl font-bold">{t('landing.howItWorks.title')}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t('landing.howItWorks.step1')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.howItWorks.step1Desc')}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Handshake className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t('landing.howItWorks.step2')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.howItWorks.step2Desc')}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t('landing.howItWorks.step3')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('landing.howItWorks.step3Desc')}
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
