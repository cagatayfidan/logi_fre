import { apiGet, apiPost, apiPatch, apiDelete } from '../api-client'

export interface MoveItem {
  id: string
  name: string
  quantity: number
  weight: number
  fragile: boolean
  dimensions?: string
}

export interface MoveRequest {
  id: string
  title: string
  origin: string
  destination: string
  distance?: string
  pickupDate: string
  pickupTimeStart: string
  pickupTimeEnd: string
  deliveryDate: string
  deliveryTimeStart: string
  deliveryTimeEnd: string
  items: MoveItem[]
  totalWeight: number
  estimatedVolume?: string
  status: 'draft' | 'active' | 'completed'
  shipperId: string
  shipperName: string
  shipperRating: number
  shipperReviewCount: number
  createdAt: string
  offerCount: number
}

export function fetchMoves(): Promise<MoveRequest[]> {
  return apiGet<MoveRequest[]>('/api/move-requests')
}

export function fetchMoveById(id: string): Promise<MoveRequest> {
  return apiGet<MoveRequest>(`/api/move-requests/${id}`)
}

export function createMove(data: Partial<MoveRequest>): Promise<MoveRequest> {
  return apiPost<MoveRequest>('/api/move-requests', data)
}

export function updateMove(id: string, data: Partial<MoveRequest>): Promise<MoveRequest> {
  return apiPatch<MoveRequest>(`/api/move-requests/${id}`, data)
}

export function deleteMove(id: string): Promise<void> {
  return apiDelete(`/api/move-requests/${id}`)
}
