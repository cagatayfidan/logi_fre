import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, submitOffer, acceptOffer, browserLogin } from './helpers'

test.describe('Offer Flow (Epic 3)', () => {
  let moveId: string
  let offerId: string

  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
    const move = await createMove('Izmir, TR', 'Bursa, TR')
    moveId = move.id
    await publishMove(moveId)

    await loginUser(TRANSPORTER)
    const offer = await submitOffer(moveId, 1500)
    offerId = offer.id
  })

  test('submit offer', async () => {
    const offer = await submitOffer(moveId, 1500)
    expect(offer.id).toBeTruthy()
    expect(offer.price).toBe(1500)
  })

  test('view offers on move detail as shipper', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto(`/moves/${moveId}`)
    await expect(page.locator('text=Move Request').first()).toBeVisible({ timeout: 10000 })
  })

  test('accept offer creates contract', async () => {
    await loginUser(SHIPPER)
    expect(offerId).toBeTruthy()
    const result = await acceptOffer(offerId)
    expect(result.contract.status).toBe('active')
  })
})
