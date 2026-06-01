import { apiGet, apiPatch } from '../api-client'

export interface Notification {
  id: string
  user: string
  type: string
  title: string
  message: string
  isRead: boolean
  isUrgent?: boolean
  relatedId?: string
  relatedModel?: string
  createdAt: string
}

export function fetchNotifications(): Promise<Notification[]> {
  return apiGet<Notification[]>('/api/notifications')
}

export function markNotificationRead(id: string): Promise<Notification> {
  return apiPatch<Notification>(`/api/notifications/${id}/read`)
}

export function fetchUnreadCount(): Promise<{ count: number }> {
  return apiGet<{ count: number }>('/api/notifications/unread-count')
}
