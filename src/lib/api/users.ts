import { apiPatch } from '../api-client'

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

export function changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
  return apiPatch('/api/users/change-password', { currentPassword, newPassword })
}

export function updateNotificationPreferences(prefs: Partial<UserProfile['notificationPreferences']>): Promise<UserProfile> {
  return apiPatch<UserProfile>('/api/users/notification-preferences', prefs)
}

export function deleteAccount(): Promise<{ message: string }> {
  return apiPatch('/api/users/account')
}
