import { test, expect } from '@playwright/test'
import { loginUser, SHIPPER, TRANSPORTER, fetchNotifications, authFetch } from './helpers'

test.describe('Notification Flow (Epic 7)', () => {
  test.beforeAll(async () => {
    await loginUser(SHIPPER)
  })

  test('notification API returns data', async () => {
    const notifications = await fetchNotifications()
    expect(Array.isArray(notifications)).toBe(true)
  })

  test('notification center page renders', async ({ page }) => {
    await page.goto('/notifications')
    await expect(page.locator('text=Notifications').first()).toBeVisible({ timeout: 10000 })
  })

  test('notification preferences page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.locator('text=Notification').first().or(page.locator('text=notification').first())).toBeVisible({ timeout: 10000 })
  })
})
