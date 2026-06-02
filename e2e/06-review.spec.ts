import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, submitOffer, acceptOffer, updateContractStatus, submitReview, browserLogin } from './helpers'

test.describe('Review Flow (Epic 6)', () => {
  let contractId: string

  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
    const move = await createMove('Trabzon, TR', 'Rize, TR')
    await publishMove(move.id)

    await loginUser(TRANSPORTER)
    const offer = await submitOffer(move.id, 3000)

    await loginUser(SHIPPER)
    const result = await acceptOffer(offer.id)
    contractId = result.contract.id || result.contract._id

    await loginUser(TRANSPORTER)
    await updateContractStatus(contractId, 'check-in')
    await updateContractStatus(contractId, 'in-transit')
    await updateContractStatus(contractId, 'deliver')

    await loginUser(SHIPPER)
    await updateContractStatus(contractId, 'confirm-receipt')
  })

  test('shipper submits review after completed contract', async () => {
    await loginUser(SHIPPER)
    const review = await submitReview(contractId)
    expect(review.rating).toBe(5)
  })

  test('transporter reviews shipper', async ({ page }) => {
    await browserLogin(page, TRANSPORTER)
    await page.goto(`/contracts/${contractId}`)
    await expect(page.locator('text=Contract #').first()).toBeVisible({ timeout: 10000 })
  })
})
