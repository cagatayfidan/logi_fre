import { test as base } from '@playwright/test'
import { apiPost, apiGet, apiPatch, clearToken, setToken } from '../src/lib/api-client'
import type { MoveRequest } from '../src/lib/api/moves'
import type { Contract } from '../src/lib/api/contracts'

export interface TestUser {
  email: string
  password: string
  name: string
  role: 'shipper' | 'transporter'
}

export const SHIPPER: TestUser = {
  email: `e2e-shipper-${Date.now()}@test.com`,
  password: 'TestPass123!',
  name: 'E2E Shipper',
  role: 'shipper',
}

export const TRANSPORTER: TestUser = {
  email: `e2e-transporter-${Date.now()}@test.com`,
  password: 'TestPass123!',
  name: 'E2E Transporter',
  role: 'transporter',
}

let currentToken: string | null = null

export async function registerUser(user: TestUser) {
  const res = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (!res.ok) {
    const body = await res.json()
    throw new Error(`Register failed: ${JSON.stringify(body)}`)
  }
  return res.json()
}

export async function loginUser(user: TestUser) {
  const res = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, password: user.password }),
  })
  if (!res.ok) {
    const body = await res.json()
    throw new Error(`Login failed: ${JSON.stringify(body)}`)
  }
  const data = await res.json()
  currentToken = data.token
  return data
}

export function getToken() {
  return currentToken
}

export async function authFetch(path: string, options?: RequestInit) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`
  }
  const res = await fetch(`http://localhost:3001${path}`, {
    ...options,
    headers: { ...headers, ...((options?.headers as Record<string, string>) || {}) },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(`API error ${res.status}: ${JSON.stringify(body)}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function createMove(origin: string, destination: string) {
  return authFetch('/api/move-requests', {
    method: 'POST',
    body: JSON.stringify({
      origin,
      destination,
      pickupDate: '2026-07-01',
      deliveryDate: '2026-07-05',
      items: [{ name: 'Furniture Box', quantity: 3, weight: 50, isFragile: true }],
      estimatedVolume: 10,
    }),
  })
}

export async function publishMove(id: string) {
  return authFetch(`/api/move-requests/${id}/publish`, { method: 'PATCH' })
}

export async function submitOffer(moveId: string, amount: number) {
  return authFetch('/api/offers', {
    method: 'POST',
    body: JSON.stringify({ moveRequestId: moveId, amount, message: 'E2E test offer' }),
  })
}

export async function acceptOffer(offerId: string) {
  return authFetch(`/api/offers/${offerId}/accept`, { method: 'PATCH' })
}

export async function fetchContracts() {
  return authFetch('/api/contracts')
}

export async function updateContractStatus(contractId: string, action: string) {
  return authFetch(`/api/contracts/${contractId}/${action}`, { method: 'PATCH' })
}

export async function addPaymentMethod() {
  return authFetch('/api/payment-methods', {
    method: 'POST',
    body: JSON.stringify({
      type: 'card',
      token: 'tok_test',
      setAsDefault: true,
    }),
  })
}

export async function submitReview(contractId: string) {
  return authFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({
      contractId,
      rating: 5,
      comment: 'Great service!',
    }),
  })
}

export async function fetchNotifications() {
  return authFetch('/api/notifications')
}

export async function fetchAdminStats() {
  return authFetch('/api/admin/stats')
}
