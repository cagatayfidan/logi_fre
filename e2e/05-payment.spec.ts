import { test, expect } from '@playwright/test'
import { loginUser, SHIPPER, TRANSPORTER, addPaymentMethod, authFetch } from './helpers'

test.describe('Payment Flow (Epic 5)', () => {
  test.beforeAll(async () => {
    await loginUser(SHIPPER)
  })

  test('add payment method', async () => {
    const method = await addPaymentMethod()
    expect(method.type).toBe('card')
  })

  test('shipper views payment methods page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.locator('text=Payment').first()).toBeVisible({ timeout: 10000 })
  })

  test('transporter views earnings dashboard', async ({ page }) => {
    await loginUser(TRANSPORTER)
    await page.goto('/earnings')
    await expect(page.locator('text=Earnings').first()).toBeVisible({ timeout: 10000 })
  })

  test('transporter views payout schedule page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.locator('text=Payout').first()).toBeVisible({ timeout: 10000 })
  })
})
