import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, authFetch, ensureUser } from './helpers'

test.describe('Auth Flow (Epic 1)', () => {
  test('full auth lifecycle', async ({ page }) => {
    const email = `e2e-shipper-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@test.com`

    await page.goto('/')

    await page.click('a[href="/auth/register"]')
    await expect(page).toHaveURL('/auth/register')

    await page.fill('input[name="name"]', SHIPPER.name)
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', SHIPPER.password)
    await page.fill('input[name="confirmPassword"]', SHIPPER.password)
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/\/auth\/role/, { timeout: 10000 })

    await page.goto('/auth/login')
    await page.fill('input[name="email"]', email)
    await page.fill('input[name="password"]', SHIPPER.password)
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

    await expect(page.getByRole('link', { name: /my moves/i })).toBeVisible()

    await page.goto('/settings')
    await expect(page.locator('input[name="name"]')).toHaveValue(SHIPPER.name)
    await expect(page.locator('input#email')).toHaveValue(email)
  })

  test('register transporter', async () => {
    const user = await ensureUser(TRANSPORTER)
    expect(user.name).toBe(TRANSPORTER.name)
    expect(user.role).toBe('transporter')
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', SHIPPER.email)
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.getByText('Invalid credentials')).toBeVisible()
  })
})
