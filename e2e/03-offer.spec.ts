import { test, expect } from '@playwright/test'
import { loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, submitOffer, acceptOffer, authFetch } from './helpers'

test.describe('Offer Flow (Epic 3)', () => {
  let moveId: string
  let offerId: string

  test.beforeAll(async () => {
    await loginUser(SHIPPER)
    const move = await createMove('Izmir, TR', 'Bursa, TR')
    moveId = move.id
    await publishMove(moveId)

    await loginUser(TRANSPORTER)
  })

  test('submit offer', async () => {
    const offer = await submitOffer(moveId, 1500)
    expect(offer.amount).toBe(1500)
    offerId = offer.id
  })

  test('view offers on move detail as shipper', async ({ page }) => {
    await loginUser(SHIPPER)
    await page.goto(`/moves/${moveId}`)
    await expect(page.locator('text=1,500').first()).toBeVisible({ timeout: 10000 })
  })

  test('accept offer creates contract', async () => {
    await loginUser(SHIPPER)
    const contract = await acceptOffer(offerId)
    expect(contract.status).toBe('active')
  })
})
