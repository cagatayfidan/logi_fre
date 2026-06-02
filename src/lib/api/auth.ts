import { apiPost, apiGet, apiPatch } from '../api-client'
import { setToken } from '../api-client'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'shipper' | 'transporter' | 'admin'
  avatar?: string
  token?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
  role: 'shipper' | 'transporter'
  phone?: string
}

export async function login(data: LoginDto): Promise<User> {
  const res = await apiPost<{ token: string }>('/api/auth/login', data)
  setToken(res.token)
  return fetchProfile()
}

export function register(data: RegisterDto): Promise<User> {
  return apiPost<User>('/api/auth/register', data)
}

export function fetchProfile(): Promise<User> {
  return apiGet<User>('/api/auth/profile')
}

export function updateProfile(data: Partial<User>): Promise<User> {
  return apiPatch<User>('/api/auth/profile', data)
}

export function sendVerification(email: string): Promise<{ message: string }> {
  return apiPost('/api/auth/send-verification', { email })
}

export function verifyEmail(email: string, code: string): Promise<{ message: string }> {
  return apiPost('/api/auth/verify-email', { email, code })
}

export function forgotPassword(email: string): Promise<{ message: string }> {
  return apiPost('/api/auth/forgot-password', { email })
}

export function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  return apiPost('/api/auth/reset-password', { token, newPassword })
}
