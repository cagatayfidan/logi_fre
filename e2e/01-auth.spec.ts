import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, authFetch } from './helpers'

test.describe('Auth Flow (Epic 1)', () => {
  test('full auth lifecycle', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/register"]')
    await expect(page).toHaveURL('/register')

    await page.fill('input[name="name"]', SHIPPER.name)
    await page.fill('input[name="email"]', SHIPPER.email)
    await page.fill('input[name="password"]', SHIPPER.password)
    await page.selectOption('select[name="role"]', 'shipper')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/login', { timeout: 10000 })

    await page.fill('input[name="email"]', SHIPPER.email)
    await page.fill('input[name="password"]', SHIPPER.password)
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/', { timeout: 10000 })

    await expect(page.locator('text=E2E Shipper')).toBeVisible()

    await page.goto('/settings')
    await expect(page.locator('input[name="name"]')).toHaveValue(SHIPPER.name)
    await expect(page.locator('input[name="email"]')).toHaveValue(SHIPPER.email)
  })

  test('register transporter', async () => {
    const user = await registerUser(TRANSPORTER)
    expect(user.name).toBe(TRANSPORTER.name)
    expect(user.role).toBe('transporter')
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"]', SHIPPER.email)
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid credentials').or(page.locator('[role="alert"]'))).toBeVisible()
  })
})
