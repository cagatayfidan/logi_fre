import { apiGet, apiPost, apiPatch } from '../api-client'

export interface Offer {
  id: string
  moveId: string
  transporterId: string
  transporterName: string
  transporterRating: number
  transporterReviewCount: number
  transporterAvatar?: string
  memberSince?: string
  price: number
  message: string
  insurance: boolean
  loadingHelp: boolean
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: string
  expiresAt?: string
}

export function fetchOffersByMove(moveId: string): Promise<Offer[]> {
  return apiGet<Offer[]>(`/api/move-requests/${moveId}/offers`)
}

export function fetchOfferById(offerId: string): Promise<Offer> {
  return apiGet<Offer>(`/api/offers/${offerId}`)
}

export function createOffer(moveId: string, data: Partial<Offer>): Promise<Offer> {
  return apiPost<Offer>(`/api/move-requests/${moveId}/offers`, data)
}

export function acceptOffer(offerId: string): Promise<{ contractId: string }> {
  return apiPost(`/api/offers/${offerId}/accept`)
}

export function rejectOffer(offerId: string): Promise<void> {
  return apiPost(`/api/offers/${offerId}/reject`)
}

export function fetchMyOffers(): Promise<Offer[]> {
  return apiGet<Offer[]>('/api/offers/my')
}
