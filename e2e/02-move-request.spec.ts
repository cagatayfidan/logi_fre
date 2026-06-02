import { test, expect } from '@playwright/test'
import { loginUser, SHIPPER, createMove, publishMove, authFetch } from './helpers'

test.describe('Move Request Flow (Epic 2)', () => {
  let moveId: string
  const origin = 'Istanbul, TR'
  const destination = 'Ankara, TR'

  test.beforeAll(async () => {
    await loginUser(SHIPPER)
  })

  test('create move request via API', async () => {
    const move = await createMove(origin, destination)
    expect(move.title).toBeTruthy()
    expect(move.status).toBe('draft')
    moveId = move.id
  })

  test('publish move request via API', async () => {
    const move = await publishMove(moveId)
    expect(move.status).toBe('active')
  })

  test('view move request on dashboard', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(`text=${origin}`).first()).toBeVisible({ timeout: 10000 })
  })

  test('view move request detail', async ({ page }) => {
    await page.goto(`/moves/${moveId}`)
    await expect(page.locator('text=Istanbul, TR')).toBeVisible()
    await expect(page.locator('text=Ankara, TR')).toBeVisible()
  })

  test('browse available moves as transporter', async ({ page }) => {
    await page.goto('/moves/browse')
    await expect(page.locator('text=Browse Moves')).toBeVisible()
  })
})
