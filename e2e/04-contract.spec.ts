import { test, expect } from '@playwright/test'
import { registerUser, loginUser, SHIPPER, TRANSPORTER, createMove, publishMove, submitOffer, acceptOffer, fetchContracts, updateContractStatus, browserLogin } from './helpers'

test.describe('Contract Flow (Epic 4)', () => {
  let contractId: string

  test.beforeAll(async () => {
    try { await registerUser(SHIPPER) } catch {}
    try { await registerUser(TRANSPORTER) } catch {}
    await loginUser(SHIPPER)
    const move = await createMove('Antalya, TR', 'Mersin, TR')
    await publishMove(move.id)

    await loginUser(TRANSPORTER)
    const offer = await submitOffer(move.id, 2000)

    await loginUser(SHIPPER)
    const result = await acceptOffer(offer.id)
    contractId = result.contract.id || result.contract._id
  })

  test('contract created with active status', async () => {
    const contracts = await fetchContracts()
    const c = contracts.find((cc: any) => cc.id === contractId)
    expect(c).toBeTruthy()
    expect(c.status).toBe('active')
  })

  test('transporter check-in', async () => {
    await loginUser(TRANSPORTER)
    const c = await updateContractStatus(contractId, 'check-in')
    expect(c.status).toBe('checked_in')
  })

  test('transporter marks in-transit', async () => {
    await loginUser(TRANSPORTER)
    const c = await updateContractStatus(contractId, 'in-transit')
    expect(c.status).toBe('in_transit')
  })

  test('transporter confirms delivery', async () => {
    await loginUser(TRANSPORTER)
    const c = await updateContractStatus(contractId, 'deliver')
    expect(c.status).toBe('delivered')
  })

  test('shipper confirms receipt completes contract', async () => {
    await loginUser(SHIPPER)
    const c = await updateContractStatus(contractId, 'confirm-receipt')
    expect(c.status).toBe('completed')
  })

  test('contract detail page visible', async ({ page }) => {
    await browserLogin(page, SHIPPER)
    await page.goto(`/contracts/${contractId}`)
    await expect(page.locator('text=Completed').first()).toBeVisible({ timeout: 10000 })
  })
})
