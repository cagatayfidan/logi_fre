import { test, expect } from '@playwright/test'
import { loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, submitOffer, acceptOffer, updateContractStatus, submitReview, authFetch } from './helpers'

test.describe('Review Flow (Epic 6)', () => {
  let contractId: string

  test.beforeAll(async () => {
    await loginUser(SHIPPER)
    const move = await createMove('Trabzon, TR', 'Rize, TR')
    await publishMove(move.id)

    await loginUser(TRANSPORTER)
    const offer = await submitOffer(move.id, 3000)

    await loginUser(SHIPPER)
    const contract = await acceptOffer(offer.id)
    contractId = contract.id

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
    await loginUser(TRANSPORTER)
    await page.goto(`/contracts/${contractId}`)
    await expect(page.locator('text=Review').first()).toBeVisible({ timeout: 10000 })
  })
})
