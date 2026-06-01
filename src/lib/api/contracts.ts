import { apiGet, apiPost, apiPatch } from '../api-client'

export interface Contract {
  id: string
  moveId: string
  offerId: string
  shipperId: string
  shipperName: string
  transporterId: string
  transporterName: string
  agreedPrice: number
  status: 'pending_checkin' | 'checked_in' | 'in_transit' | 'delivered' | 'completed' | 'cancelled'
  createdAt: string
  cancelReason?: string
}

export function fetchContracts(): Promise<Contract[]> {
  return apiGet<Contract[]>('/api/contracts')
}

export function fetchContractById(id: string): Promise<Contract> {
  return apiGet<Contract>(`/api/contracts/${id}`)
}

export function checkIn(contractId: string): Promise<Contract> {
  return apiPost(`/api/contracts/${contractId}/check-in`)
}

export function markInTransit(contractId: string): Promise<Contract> {
  return apiPost(`/api/contracts/${contractId}/in-transit`)
}

export function confirmDelivery(contractId: string): Promise<Contract> {
  return apiPost(`/api/contracts/${contractId}/deliver`)
}

export function confirmReceipt(contractId: string): Promise<Contract> {
  return apiPost(`/api/contracts/${contractId}/complete`)
}

export function cancelContract(contractId: string, reason?: string): Promise<Contract> {
  return apiPost(`/api/contracts/${contractId}/cancel`, { reason })
}
