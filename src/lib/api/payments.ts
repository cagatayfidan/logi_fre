import { apiGet, apiPost, apiDelete, apiPatch, apiPut } from '../api-client'

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank_account'
  last4: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

export interface Payment {
  id: string
  contractId: string
  shipperId: string
  transporterId: string
  amount: number
  currency: string
  status: 'pending' | 'held' | 'released' | 'refunded' | 'failed'
  platformFee?: number
  releasedAt?: string
  createdAt: string
}

export interface FeeInfo {
  feePercent: number
  feeAmount: number
  netAmount: number
  currency: string
}

export interface Earnings {
  total: number
  count: number
  platformFees: number
  netEarnings: number
  currency: string
}

export interface Invoice {
  invoiceNumber: string
  issuedAt: string
  contractId: string
  shipper: { id: string; label: string }
  transporter: { id: string; label: string }
  lineItems: Array<{ description: string; amount: number }>
  subtotal: number
  platformFee: number
  feePercent: number
  total: number
  netPayout: number
  currency: string
  status: string
}

export interface PayoutSchedule {
  frequency: 'weekly' | 'biweekly' | 'monthly'
  dayOfWeek?: number
  dayOfMonth?: number
  minimumPayoutAmount: number
  isActive: boolean
}

export function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  return apiGet<PaymentMethod[]>('/api/payment-methods')
}

export function addPaymentMethod(data: { token: string; type: string; setAsDefault?: boolean }): Promise<PaymentMethod> {
  return apiPost<PaymentMethod>('/api/payment-methods', data)
}

export function deletePaymentMethod(id: string): Promise<void> {
  return apiDelete(`/api/payment-methods/${id}`)
}

export function fetchPaymentHistory(): Promise<Payment[]> {
  return apiGet<Payment[]>('/api/payments/history')
}

export function fetchFee(amount: number, currency?: string): Promise<FeeInfo> {
  return apiGet<FeeInfo>(`/api/payments/fee?amount=${amount}${currency ? `&currency=${currency}` : ''}`)
}

export function fetchEarnings(): Promise<Earnings> {
  return apiGet<Earnings>('/api/payments/earnings')
}

export function fetchInvoice(paymentId: string): Promise<Invoice> {
  return apiGet<Invoice>(`/api/payments/${paymentId}/invoice`)
}

export function refundPayment(paymentId: string, reason?: string): Promise<Payment> {
  return apiPost(`/api/payments/${paymentId}/refund`, { reason })
}

export function fetchPayoutSchedule(): Promise<PayoutSchedule> {
  return apiGet<PayoutSchedule>('/api/payout-schedule')
}

export function updatePayoutSchedule(data: Partial<PayoutSchedule>): Promise<PayoutSchedule> {
  return apiPut('/api/payout-schedule', data)
}
