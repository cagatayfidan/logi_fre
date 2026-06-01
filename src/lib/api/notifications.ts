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

export function fetchNotifications(unreadOnly?: boolean, urgentOnly?: boolean): Promise<Notification[]> {
  const params = new URLSearchParams()
  if (unreadOnly) params.set('unreadOnly', 'true')
  if (urgentOnly) params.set('urgentOnly', 'true')
  const qs = params.toString()
  return apiGet<Notification[]>(`/api/notifications${qs ? `?${qs}` : ''}`)
}

export function markNotificationRead(id: string): Promise<Notification> {
  return apiPatch<Notification>(`/api/notifications/${id}/read`)
}

export function markAllNotificationsRead(): Promise<{ modifiedCount: number }> {
  return apiPatch('/api/notifications/read-all')
}

export function fetchUnreadCount(): Promise<{ count: number }> {
  return apiGet<{ count: number }>('/api/notifications/unread-count')
}
