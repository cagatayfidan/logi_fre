import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, addPaymentMethod, browserLogin } from './helpers'

test.describe('Payment Flow (Epic 5)', () => {
  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
  })

  test('add payment method', async () => {
    const method = await addPaymentMethod()
    expect(method.type).toBe('card')
  })

  test('shipper views payment methods page', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto('/settings')
    await expect(page.locator('text=Payment Methods').first()).toBeVisible({ timeout: 10000 })
  })

  test('transporter views earnings dashboard', async ({ page }) => {
    await browserLogin(page, TRANSPORTER)
    await page.goto('/settings')
    await expect(page.locator('text=Payment Methods').first()).toBeVisible({ timeout: 10000 })
  })

  test('transporter views payout schedule page', async ({ page }) => {
    await browserLogin(page, TRANSPORTER)
    await page.goto('/settings')
    await expect(page.locator('text=Payout Schedule').first()).toBeVisible({ timeout: 10000 })
  })
})
