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
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'countered'
  createdAt: string
  expiresAt?: string
}

export function fetchOffersByMove(moveId: string): Promise<Offer[]> {
  return apiGet<Offer[]>(`/api/offers?moveRequest=${moveId}`)
}

export function fetchOfferById(offerId: string): Promise<Offer> {
  return apiGet<Offer>(`/api/offers/${offerId}`)
}

export function createOffer(moveRequestId: string, data: { price: number; message?: string }): Promise<Offer> {
  return apiPost<Offer>('/api/offers', { moveRequestId, ...data })
}

export function acceptOffer(offerId: string): Promise<{ offer: Offer; contract: { id: string } }> {
  return apiPatch(`/api/offers/${offerId}/accept`)
}

export function rejectOffer(offerId: string): Promise<Offer> {
  return apiPatch(`/api/offers/${offerId}/reject`)
}

export function counterOffer(offerId: string, data: { price: number; message?: string }): Promise<Offer> {
  return apiPost(`/api/offers/${offerId}/counter`, data)
}

export function acceptCounterOffer(offerId: string): Promise<{ offer: Offer; contract: { id: string } }> {
  return apiPost(`/api/offers/${offerId}/accept-counter`)
}

export function rejectCounterOffer(offerId: string): Promise<Offer> {
  return apiPost(`/api/offers/${offerId}/reject-counter`)
}

export function fetchMyOffers(): Promise<Offer[]> {
  return apiGet<Offer[]>('/api/offers')
}
