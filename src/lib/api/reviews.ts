import { apiGet, apiPost, apiPatch, apiDelete } from '../api-client'

export interface Review {
  id: string
  from: { id: string; name: string; avatar?: string }
  to: string
  contract: string
  rating: number
  comment?: string
  reply?: string
  repliedAt?: string
  isFlagged: boolean
  isHidden: boolean
  createdAt: string
}

export interface RatingProfile {
  average: number
  count: number
  isPublic: boolean
  distribution: Record<number, number>
}

export function createReview(data: { contractId: string; rating: number; comment?: string }): Promise<Review> {
  return apiPost<Review>('/api/reviews', data)
}

export function fetchReviewsByUser(userId: string): Promise<Review[]> {
  return apiGet<Review[]>(`/api/reviews/user/${userId}`)
}

export function fetchRating(userId: string): Promise<{ average: number; count: number }> {
  return apiGet(`/api/reviews/user/${userId}/rating`)
}

export function fetchRatingProfile(userId: string): Promise<RatingProfile> {
  return apiGet<RatingProfile>(`/api/reviews/user/${userId}/profile`)
}

export function replyToReview(reviewId: string, reply: string): Promise<Review> {
  return apiPatch<Review>(`/api/reviews/${reviewId}/reply`, { reply })
}

export function flagReview(reviewId: string): Promise<Review> {
  return apiPost<Review>(`/api/reviews/${reviewId}/flag`)
}

export function updateReview(reviewId: string, data: { rating?: number; comment?: string }): Promise<Review> {
  return apiPatch<Review>(`/api/reviews/${reviewId}`, data)
}

export function deleteReview(reviewId: string): Promise<{ deleted: boolean }> {
  return apiDelete<{ deleted: boolean }>(`/api/reviews/${reviewId}`)
}
