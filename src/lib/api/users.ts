import { apiGet, apiPatch } from '../api-client'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: string
  notificationPreferences?: {
    emailNotifications: boolean
    pushNotifications: boolean
    offerAlerts: boolean
    contractUpdates: boolean
    reviewAlerts: boolean
  }
}

export function fetchUserProfile(userId: string): Promise<UserProfile> {
  return apiGet<UserProfile>(`/api/users/${userId}`)
}

export function updateNotificationPreferences(prefs: Partial<UserProfile['notificationPreferences']>): Promise<UserProfile> {
  return apiPatch<UserProfile>('/api/users/notification-preferences', prefs)
}
