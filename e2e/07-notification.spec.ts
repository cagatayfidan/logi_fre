import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, fetchNotifications, browserLogin } from './helpers'

test.describe('Notification Flow (Epic 7)', () => {
  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
  })

  test('notification API returns data', async () => {
    const notifications = await fetchNotifications()
    expect(Array.isArray(notifications)).toBe(true)
  })

  test('notification center page renders', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto('/notifications')
    await expect(page.getByRole('heading', { name: /Notifications/i }).first()).toBeVisible({ timeout: 10000 })
  })

  test('notification preferences page', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto('/settings')
    await expect(page.locator('text=Notification Preferences').first()).toBeVisible({ timeout: 10000 })
  })
})
