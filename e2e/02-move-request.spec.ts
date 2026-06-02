import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, browserLogin } from './helpers'

test.describe('Move Request Flow (Epic 2)', () => {
  let moveId: string
  const origin = 'Istanbul, TR'
  const destination = 'Ankara, TR'

  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
  })

  test('create move request via API', async () => {
    const move = await createMove(origin, destination)
    expect(move.origin).toBe(origin)
    expect(move.status).toBe('draft')
    moveId = move.id
  })

  test('publish move request via API', async () => {
    const move = await publishMove(moveId)
    expect(move.status).toBe('active')
  })

  test('view move request on dashboard', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto('/')
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 })
  })

  test('view move request detail', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto(`/moves/${moveId}`)
    await expect(page.locator('text=From:').first()).toBeVisible()
  })

  test('browse available moves as transporter', async ({ page }) => {
    await browserLogin(page, TRANSPORTER)
    await page.goto('/moves')
    await expect(page.locator('h1').first()).toBeVisible()
  })
})
