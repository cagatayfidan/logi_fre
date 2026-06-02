import { apiGet, apiPatch } from '../api-client'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  isSuspended?: boolean
  createdAt: string
}

export interface AdminStats {
  totalUsers: number
  totalMoves: number
  totalContracts: number
  totalPayments: number
  totalVolume: number
}

export interface PaginatedResponse<T> {
  users?: T[]
  contracts?: T[]
  payments?: T[]
  tickets?: T[]
  total: number
  page: number
  totalPages: number
}

export function fetchAdminUsers(page = 1, limit = 20): Promise<PaginatedResponse<AdminUser>> {
  return apiGet(`/api/admin/users?page=${page}&limit=${limit}`)
}

export function fetchAdminUser(id: string): Promise<AdminUser> {
  return apiGet(`/api/admin/users/${id}`)
}

export function suspendUser(id: string): Promise<{ message: string }> {
  return apiPatch(`/api/admin/users/${id}/suspend`)
}

export function fetchAdminStats(): Promise<AdminStats> {
  return apiGet<AdminStats>('/api/admin/stats')
}

export function fetchAdminContracts(page = 1, limit = 20, status?: string): Promise<PaginatedResponse<unknown>> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set('status', status)
  return apiGet(`/api/admin/contracts?${params}`)
}

export function fetchAdminPayments(page = 1, limit = 20, status?: string): Promise<PaginatedResponse<unknown>> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set('status', status)
  return apiGet(`/api/admin/payments?${params}`)
}

export function fetchAdminTickets(page = 1, limit = 20, status?: string): Promise<PaginatedResponse<unknown>> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) params.set('status', status)
  return apiGet(`/api/admin/tickets?${params}`)
}

export function resolveTicket(id: string, data: { status: string; adminNote?: string }): Promise<{ message: string }> {
  return apiPatch(`/api/admin/tickets/${id}/resolve`, data)
}
