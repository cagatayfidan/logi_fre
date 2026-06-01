import { apiPost, apiGet, apiPatch } from '../api-client'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'shipper' | 'transporter'
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

export function login(data: LoginDto): Promise<User> {
  return apiPost<User>('/api/auth/login', data)
}

export function register(data: RegisterDto): Promise<User> {
  return apiPost<User>('/api/auth/register', data)
}

export function fetchProfile(): Promise<User> {
  return apiGet<User>('/api/auth/profile')
}

export function updateProfile(data: Partial<User>): Promise<User> {
  return apiPatch<User>('/api/users/profile', data)
}
