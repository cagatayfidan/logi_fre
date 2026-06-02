import { test, expect } from '@playwright/test'
import { registerUser, ADMIN_USER, fetchAdminStats, browserLogin } from './helpers'

test.describe('Admin Flow (Epic 8)', () => {
  test('admin pages render', async ({ page }) => {
    try { await registerUser(ADMIN_USER) } catch {}
    await browserLogin(page, ADMIN_USER)

    const pages = [
      { path: '/admin', title: /Admin|Dashboard/i },
      { path: '/admin/moves', title: /Moves|Requests/i },
      { path: '/admin/contracts', title: /Contracts/i },
      { path: '/admin/reviews', title: /Reviews/i },
      { path: '/admin/payments', title: /Payments/i },
    ]

    for (const { path, title } of pages) {
      await page.goto(path)
      await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 10000 })
    }
  })
})
