import { apiGet, apiPatch } from '../api-client'

export interface Contract {
  id: string
  moveId: string
  offerId: string
  shipperId: string
  shipperName: string
  transporterId: string
  transporterName: string
  agreedPrice: number
  price?: number
  status: 'active' | 'checked_in' | 'in_transit' | 'delivered' | 'completed' | 'cancelled'
  createdAt: string
  cancelReason?: string
}

export function fetchContracts(): Promise<Contract[]> {
  return apiGet<Contract[]>('/api/contracts')
}

export function fetchUpcomingContracts(): Promise<Contract[]> {
  return apiGet<Contract[]>('/api/contracts/upcoming')
}

export function fetchContractById(id: string): Promise<Contract> {
  return apiGet<Contract>(`/api/contracts/${id}`)
}

export function checkIn(contractId: string): Promise<Contract> {
  return apiPatch(`/api/contracts/${contractId}/check-in`)
}

export function markInTransit(contractId: string): Promise<Contract> {
  return apiPatch(`/api/contracts/${contractId}/in-transit`)
}

export function confirmDelivery(contractId: string): Promise<Contract> {
  return apiPatch(`/api/contracts/${contractId}/deliver`)
}

export function confirmReceipt(contractId: string): Promise<Contract> {
  return apiPatch(`/api/contracts/${contractId}/confirm-receipt`)
}

export function cancelContract(contractId: string, reason: string): Promise<Contract> {
  return apiPatch(`/api/contracts/${contractId}/cancel`, { reason })
}
