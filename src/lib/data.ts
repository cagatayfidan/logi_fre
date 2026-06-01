export interface Item {
  id: string
  name: string
  quantity: number
  weight: number
  fragile: boolean
  dimensions?: string
}

export type MoveStatus = "active" | "completed" | "draft"
export type OfferStatus = "pending" | "accepted" | "rejected" | "expired"
export type UserRole = "shipper" | "transporter"
export type ContractStatus = "pending_checkin" | "checked_in" | "in_transit" | "delivered" | "completed" | "cancelled"

export type NotificationType =
  | "offer_received"
  | "offer_accepted"
  | "offer_rejected"
  | "counter_offer"
  | "contract_status"
  | "move_reminder"
  | "payment"
  | "review"
  | "system"

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

export interface PayoutMethod {
  id: string
  type: 'bank_account' | 'card'
  last4: string
  bankName?: string
  isDefault: boolean
  createdAt: string
}

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

export interface Photo {
  id: string
  name: string
  url: string
  size?: number
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  text: string
  price?: number
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  role: UserRole
  avatar?: string
}

export interface Move {
  id: string
  title: string
  origin: string
  destination: string
  distance: string
  pickupDate: string
  pickupTimeStart: string
  pickupTimeEnd: string
  deliveryDate: string
  deliveryTimeStart: string
  deliveryTimeEnd: string
  items: Item[]
  totalWeight: number
  estimatedVolume: string
  status: MoveStatus
  shipperId: string
  shipperName: string
  shipperRating: number
  shipperReviewCount: number
  createdAt: string
  offerCount: number
}

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
  status: OfferStatus
  createdAt: string
  expiresAt?: string
  messages?: Message[]
}

export interface Contract {
  id: string
  moveId: string
  offerId: string
  shipperId: string
  shipperName: string
  transporterId: string
  transporterName: string
  agreedPrice: number
  status: ContractStatus
  createdAt: string
  cancelReason?: string
}

export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 000-0000",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zip: "10001",
  role: "shipper",
}

export const currentTransporter: User = {
  id: "user-2",
  name: "Mike Transporter",
  email: "mike@example.com",
  phone: "+1 (555) 111-1111",
  address: "456 Trucker Ave",
  city: "Brooklyn",
  state: "NY",
  zip: "11201",
  role: "transporter",
}

const sharedItems: Item[] = [
  { id: "item-1", name: "Sofa", quantity: 1, weight: 50, fragile: true, dimensions: "200x80x90 cm" },
  { id: "item-2", name: "Bed", quantity: 1, weight: 40, fragile: false, dimensions: "190x140x40 cm" },
  { id: "item-3", name: "Boxes", quantity: 5, weight: 30, fragile: false },
  { id: "item-4", name: "Table", quantity: 1, weight: 25, fragile: false, dimensions: "120x80x75 cm" },
  { id: "item-5", name: "Desk", quantity: 1, weight: 35, fragile: false, dimensions: "140x70x75 cm" },
  { id: "item-6", name: "Chair", quantity: 4, weight: 8, fragile: false },
  { id: "item-7", name: "Wardrobe", quantity: 1, weight: 60, fragile: true, dimensions: "180x60x200 cm" },
  { id: "item-8", name: "TV", quantity: 1, weight: 15, fragile: true, dimensions: "120x75x10 cm" },
  { id: "item-9", name: "Fridge", quantity: 1, weight: 70, fragile: false, dimensions: "180x70x70 cm" },
  { id: "item-10", name: "Bookshelf", quantity: 2, weight: 20, fragile: false, dimensions: "80x30x180 cm" },
]

export const mockMoves: Move[] = [
  {
    id: "MR-001",
    title: "Home → Apartment",
    origin: "123 Main St, New York, NY",
    destination: "456 Oak Ave, Jersey City, NJ",
    distance: "45 mi",
    pickupDate: "June 15, 2026",
    pickupTimeStart: "09:00",
    pickupTimeEnd: "12:00",
    deliveryDate: "June 15, 2026",
    deliveryTimeStart: "13:00",
    deliveryTimeEnd: "17:00",
    items: [sharedItems[0], sharedItems[1], sharedItems[2], sharedItems[3]],
    totalWeight: 265,
    estimatedVolume: "~9 m³",
    status: "active",
    shipperId: "user-1",
    shipperName: "John Doe",
    shipperRating: 4.5,
    shipperReviewCount: 0,
    createdAt: "June 1, 2026",
    offerCount: 3,
  },
  {
    id: "MR-002",
    title: "Office → Warehouse",
    origin: "789 Business Blvd, Manhattan, NY",
    destination: "321 Industrial Pkwy, Newark, NJ",
    distance: "35 mi",
    pickupDate: "June 20, 2026",
    pickupTimeStart: "08:00",
    pickupTimeEnd: "11:00",
    deliveryDate: "June 20, 2026",
    deliveryTimeStart: "12:00",
    deliveryTimeEnd: "16:00",
    items: [sharedItems[4], sharedItems[5], sharedItems[6], sharedItems[7], sharedItems[9]],
    totalWeight: 800,
    estimatedVolume: "~25 m³",
    status: "active",
    shipperId: "user-1",
    shipperName: "John Doe",
    shipperRating: 4.5,
    shipperReviewCount: 0,
    createdAt: "June 2, 2026",
    offerCount: 1,
  },
  {
    id: "MR-003",
    title: "Studio → One-Bedroom",
    origin: "555 Pine St, Brooklyn, NY",
    destination: "777 Elm St, Queens, NY",
    distance: "12 mi",
    pickupDate: "June 25, 2026",
    pickupTimeStart: "10:00",
    pickupTimeEnd: "13:00",
    deliveryDate: "June 25, 2026",
    deliveryTimeStart: "14:00",
    deliveryTimeEnd: "18:00",
    items: [sharedItems[0], sharedItems[2], sharedItems[7]],
    totalWeight: 120,
    estimatedVolume: "~5 m³",
    status: "completed",
    shipperId: "user-1",
    shipperName: "John Doe",
    shipperRating: 4.5,
    shipperReviewCount: 0,
    createdAt: "May 20, 2026",
    offerCount: 2,
  },
  {
    id: "MR-004",
    title: "House → House",
    origin: "999 Maple Dr, Staten Island, NY",
    destination: "111 Birch Ln, White Plains, NY",
    distance: "60 mi",
    pickupDate: "July 5, 2026",
    pickupTimeStart: "07:00",
    pickupTimeEnd: "10:00",
    deliveryDate: "July 5, 2026",
    deliveryTimeStart: "11:00",
    deliveryTimeEnd: "16:00",
    items: [sharedItems[0], sharedItems[1], sharedItems[2], sharedItems[6], sharedItems[8], sharedItems[9]],
    totalWeight: 550,
    estimatedVolume: "~18 m³",
    status: "active",
    shipperId: "user-3",
    shipperName: "Alice Smith",
    shipperRating: 5,
    shipperReviewCount: 8,
    createdAt: "June 5, 2026",
    offerCount: 0,
  },
  {
    id: "MR-005",
    title: "Apartment → Apartment",
    origin: "222 Cedar Ct, Hoboken, NJ",
    destination: "444 Walnut St, Jersey City, NJ",
    distance: "5 mi",
    pickupDate: "July 10, 2026",
    pickupTimeStart: "09:00",
    pickupTimeEnd: "12:00",
    deliveryDate: "July 10, 2026",
    deliveryTimeStart: "13:00",
    deliveryTimeEnd: "15:00",
    items: [sharedItems[3], sharedItems[5], sharedItems[9], sharedItems[2]],
    totalWeight: 180,
    estimatedVolume: "~7 m³",
    status: "active",
    shipperId: "user-4",
    shipperName: "Bob Johnson",
    shipperRating: 3.5,
    shipperReviewCount: 3,
    createdAt: "June 6, 2026",
    offerCount: 0,
  },
]

export const mockOffers: Offer[] = [
  {
    id: "offer-1",
    moveId: "MR-001",
    transporterId: "user-2",
    transporterName: "Mike's Transport",
    transporterRating: 4,
    transporterReviewCount: 12,
    memberSince: "May 2026",
    price: 450,
    message: "Can do it in the morning slot. Have a 10ft truck with ramp. Includes 2 movers.",
    insurance: true,
    loadingHelp: true,
    status: "pending",
    createdAt: "June 2, 2026",
    expiresAt: "2026-06-10T23:59:59Z",
    messages: [
      { id: "msg-1", senderId: "user-2", senderName: "Mike's Transport", text: "Can do it in the morning slot. Have a 10ft truck with ramp. Includes 2 movers.", createdAt: "June 2, 2026, 10:00" },
      { id: "msg-2", senderId: "user-1", senderName: "John Doe", text: "Can you do $400?", price: 400, createdAt: "June 2, 2026, 14:00" },
      { id: "msg-3", senderId: "user-2", senderName: "Mike's Transport", text: "Lowest I can go is $425.", price: 425, createdAt: "June 2, 2026, 15:30" },
    ],
  },
  {
    id: "offer-2",
    moveId: "MR-001",
    transporterId: "user-5",
    transporterName: "FastMove Inc.",
    transporterRating: 5,
    transporterReviewCount: 24,
    memberSince: "January 2025",
    price: 520,
    message: "Professional moving team available. 15ft truck with air ride suspension. Full insurance coverage.",
    insurance: true,
    loadingHelp: true,
    status: "pending",
    createdAt: "June 2, 2026",
    expiresAt: "2026-06-31T23:59:59Z",
  },
  {
    id: "offer-3",
    moveId: "MR-001",
    transporterId: "user-6",
    transporterName: "Budget Van Co.",
    transporterRating: 3,
    transporterReviewCount: 5,
    memberSince: "March 2026",
    price: 380,
    message: "Can help with your move. Have a cargo van available. Driver only, no additional movers.",
    insurance: false,
    loadingHelp: false,
    status: "expired",
    createdAt: "June 3, 2026",
    expiresAt: "2026-05-25T23:59:59Z",
  },
  {
    id: "offer-4",
    moveId: "MR-002",
    transporterId: "user-2",
    transporterName: "Mike's Transport",
    transporterRating: 4,
    transporterReviewCount: 12,
    memberSince: "May 2026",
    price: 800,
    message: "Experienced with office moves. Will bring packing materials and 3 crew members.",
    insurance: true,
    loadingHelp: true,
    status: "accepted",
    createdAt: "June 2, 2026",
  },
  {
    id: "offer-5",
    moveId: "MR-003",
    transporterId: "user-5",
    transporterName: "FastMove Inc.",
    transporterRating: 5,
    transporterReviewCount: 24,
    memberSince: "January 2025",
    price: 320,
    message: "Quick and efficient. 2-man team with a 10ft truck.",
    insurance: true,
    loadingHelp: true,
    status: "accepted",
    createdAt: "May 21, 2026",
  },
  {
    id: "offer-6",
    moveId: "MR-003",
    transporterId: "user-6",
    transporterName: "Budget Van Co.",
    transporterRating: 3,
    transporterReviewCount: 5,
    memberSince: "March 2026",
    price: 280,
    message: "I can do it for this price.",
    insurance: false,
    loadingHelp: false,
    status: "rejected",
    createdAt: "May 22, 2026",
  },
]

export const mockContracts: Contract[] = [
  {
    id: "C-001",
    moveId: "MR-002",
    offerId: "offer-4",
    shipperId: "user-1",
    shipperName: "John Doe",
    transporterId: "user-2",
    transporterName: "Mike's Transport",
    agreedPrice: 800,
    status: "pending_checkin",
    createdAt: "June 2, 2026",
  },
  {
    id: "C-002",
    moveId: "MR-003",
    offerId: "offer-5",
    shipperId: "user-1",
    shipperName: "John Doe",
    transporterId: "user-5",
    transporterName: "FastMove Inc.",
    agreedPrice: 320,
    status: "completed",
    createdAt: "May 21, 2026",
  },
  {
    id: "C-003",
    moveId: "MR-001",
    offerId: "offer-1",
    shipperId: "user-1",
    shipperName: "John Doe",
    transporterId: "user-2",
    transporterName: "Mike's Transport",
    agreedPrice: 450,
    status: "in_transit",
    createdAt: "June 3, 2026",
  },
  {
    id: "C-004",
    moveId: "MR-004",
    offerId: "offer-2",
    shipperId: "user-3",
    shipperName: "Alice Smith",
    transporterId: "user-5",
    transporterName: "FastMove Inc.",
    agreedPrice: 520,
    status: "delivered",
    createdAt: "June 6, 2026",
  },
]

export function getMoveById(id: string): Move | undefined {
  return mockMoves.find((m) => m.id === id)
}

export function getOffersByMoveId(moveId: string): Offer[] {
  return mockOffers.filter((o) => o.moveId === moveId)
}

export function getOfferById(offerId: string): Offer | undefined {
  return mockOffers.find((o) => o.id === offerId)
}

export function getContractById(id: string): Contract | undefined {
  return mockContracts.find((c) => c.id === id)
}

export function getContractByMoveAndOffer(moveId: string, offerId: string): Contract | undefined {
  return mockContracts.find((c) => c.moveId === moveId && c.offerId === offerId)
}

export function getContractsByRole(userId: string): Contract[] {
  return mockContracts.filter((c) => c.shipperId === userId || c.transporterId === userId)
}

export function isOfferExpired(offer: Offer): boolean {
  if (!offer.expiresAt) return false
  return new Date(offer.expiresAt) < new Date()
}

export function getTimeUntil(isoString: string): { days: number; hours: number; minutes: number; totalMs: number } {
  const diff = new Date(isoString).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, totalMs: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes, totalMs: diff }
}

export const contractTimelineSteps = [
  { key: "pending_checkin", label: "Pending Check-in" },
  { key: "checked_in", label: "Checked In" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
  { key: "completed", label: "Completed" },
] as const

export function getContractTimelineStepIndex(status: ContractStatus): number {
  const order = ["pending_checkin", "checked_in", "in_transit", "delivered", "completed"]
  if (status === "cancelled") return -1
  return order.indexOf(status)
}

export function getContractActionRole(status: ContractStatus): "transporter" | "shipper" | null {
  if (status === "checked_in" || status === "in_transit" || status === "pending_checkin") return "transporter"
  if (status === "delivered") return "shipper"
  return null
}

export function getContractActionLabel(status: ContractStatus): string {
  const map: Record<string, string> = {
    pending_checkin: "Check In",
    checked_in: "Mark In Transit",
    in_transit: "Confirm Delivery",
    delivered: "Confirm Receipt",
  }
  return map[status] || ""
}

export const cancelContractReasons = [
  "Change of plans — no longer need the move",
  "Found a better offer",
  "Transporter is not responding",
  "Schedule conflict",
  "Other reason",
]

export interface ScheduleEvent {
  id: string
  type: "move" | "pickup" | "delivery"
  title: string
  date: string
  time: string
  location: string
  role: "shipper" | "transporter"
  status: ContractStatus
  contractId: string
}

export function getSchedule(userId: string): ScheduleEvent[] {
  const userContracts = mockContracts.filter(
    (c) => c.shipperId === userId || c.transporterId === userId
  )
  const events: ScheduleEvent[] = []

  for (const contract of userContracts) {
    const move = getMoveById(contract.moveId)
    if (!move) continue
    const role = contract.shipperId === userId ? "shipper" : "transporter"

    events.push({
      id: `pickup-${contract.id}`,
      type: "pickup",
      title: move.title,
      date: move.pickupDate,
      time: `${move.pickupTimeStart} - ${move.pickupTimeEnd}`,
      location: move.origin,
      role,
      status: contract.status,
      contractId: contract.id,
    })

    events.push({
      id: `delivery-${contract.id}`,
      type: "delivery",
      title: move.title,
      date: move.deliveryDate,
      time: `${move.deliveryTimeStart} - ${move.deliveryTimeEnd}`,
      location: move.destination,
      role,
      status: contract.status,
      contractId: contract.id,
    })
  }

  const dateParse = (d: string) => {
    const m = d.match(/(\w+) (\d+), (\d+)/)
    if (!m) return new Date(0)
    return new Date(`${m[1]} ${m[2]}, ${m[3]}`)
  }

  events.sort((a, b) => dateParse(a.date).getTime() - dateParse(b.date).getTime())
  return events
}

export const notificationTypeIcons: Record<string, string> = {
  offer_received: "💰",
  offer_accepted: "✅",
  offer_rejected: "❌",
  counter_offer: "🤝",
  contract_status: "📋",
  move_reminder: "📅",
  payment: "💳",
  review: "⭐",
  system: "🔔",
}

export const mockPayoutMethods: PayoutMethod[] = [
  {
    id: "po-1",
    type: "bank_account",
    last4: "9876",
    bankName: "Chase Bank",
    isDefault: true,
    createdAt: "June 1, 2026",
  },
  {
    id: "po-2",
    type: "bank_account",
    last4: "5432",
    bankName: "Bank of America",
    isDefault: false,
    createdAt: "June 5, 2026",
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2028,
    isDefault: true,
    createdAt: "June 1, 2026",
  },
  {
    id: "pm-2",
    type: "card",
    last4: "1234",
    brand: "Mastercard",
    expiryMonth: 8,
    expiryYear: 2027,
    isDefault: false,
    createdAt: "June 5, 2026",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user: "user-1",
    type: "offer_received",
    title: "New Offer Received",
    message: "Mike's Transport submitted an offer of $450 for your move Home → Apartment.",
    isRead: false,
    relatedId: "MR-001",
    relatedModel: "MoveRequest",
    createdAt: "2026-05-31T09:30:00Z",
  },
  {
    id: "notif-2",
    user: "user-1",
    type: "offer_received",
    title: "New Offer Received",
    message: "FastMove Inc. submitted an offer of $520 for your move Home → Apartment.",
    isRead: false,
    relatedId: "MR-001",
    relatedModel: "MoveRequest",
    createdAt: "2026-05-31T08:15:00Z",
  },
  {
    id: "notif-3",
    user: "user-1",
    type: "counter_offer",
    title: "Counter-Offer Received",
    message: "Mike's Transport countered with $425 on your offer for Home → Apartment.",
    isRead: false,
    relatedId: "offer-1",
    relatedModel: "Offer",
    createdAt: "2026-05-30T14:00:00Z",
  },
  {
    id: "notif-4",
    user: "user-1",
    type: "contract_status",
    title: "Contract Updated",
    message: "Contract C-003 for Office → Warehouse is now In Transit.",
    isRead: true,
    relatedId: "C-003",
    relatedModel: "Contract",
    createdAt: "2026-05-29T11:00:00Z",
  },
  {
    id: "notif-5",
    user: "user-2",
    type: "offer_accepted",
    title: "Offer Accepted",
    message: "John Doe accepted your offer of $800 for Office → Warehouse.",
    isRead: false,
    relatedId: "offer-4",
    relatedModel: "Offer",
    createdAt: "2026-05-28T16:45:00Z",
  },
  {
    id: "notif-6",
    user: "user-1",
    type: "system",
    title: "Welcome to Haul!",
    message: "Welcome! Post your first move or browse available moves to get started.",
    isRead: true,
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: "notif-7",
    user: "user-6",
    type: "offer_rejected",
    title: "Offer Not Accepted",
    message: "Your offer of $380 for Home → Apartment was not accepted.",
    isRead: true,
    relatedId: "MR-001",
    relatedModel: "MoveRequest",
    createdAt: "2026-05-27T10:00:00Z",
  },
]

export function getPaymentMethods(userId: string): PaymentMethod[] {
  return mockPaymentMethods
}

export function getPayoutMethods(userId: string): PayoutMethod[] {
  return mockPayoutMethods
}

export function getNotificationsForUser(userId: string): Notification[] {
  return mockNotifications
    .filter((n) => n.user === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getUnreadNotificationCount(userId: string): number {
  return mockNotifications.filter((n) => n.user === userId && !n.isRead).length
}

export interface Review {
  id: string
  fromId: string
  fromName: string
  fromAvatar?: string
  toId: string
  toName: string
  rating: number
  comment?: string
  reply?: string
  repliedAt?: string
  createdAt: string
}

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    fromId: "user-1",
    fromName: "John Doe",
    toId: "user-2",
    toName: "Mike's Transport",
    rating: 4,
    comment: "Great service, on time and careful with items.",
    createdAt: "June 10, 2026",
  },
  {
    id: "rev-2",
    fromId: "user-3",
    fromName: "Alice Smith",
    toId: "user-2",
    toName: "Mike's Transport",
    rating: 5,
    comment: "Mike was fantastic! Very professional and helpful.",
    reply: "Thank you Alice! Glad to help with your move.",
    repliedAt: "June 12, 2026",
    createdAt: "June 11, 2026",
  },
  {
    id: "rev-3",
    fromId: "user-4",
    fromName: "Bob Johnson",
    toId: "user-2",
    toName: "Mike's Transport",
    rating: 3,
    comment: "Okay service, but arrived a bit late.",
    createdAt: "June 5, 2026",
  },
  {
    id: "rev-4",
    fromId: "user-1",
    fromName: "John Doe",
    toId: "user-5",
    toName: "FastMove Inc.",
    rating: 5,
    comment: "Amazing team! Fast and careful.",
    createdAt: "May 25, 2026",
  },
]

export function getReviewsByUser(userId: string): Review[] {
  return mockReviews.filter((r) => r.toId === userId)
}

export function getReviewRatingProfile(userId: string) {
  const reviews = getReviewsByUser(userId)
  const count = reviews.length
  if (count === 0) {
    return { average: 0, count: 0, isPublic: false, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }
  }
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const r of reviews) {
    distribution[r.rating as keyof typeof distribution]++
  }
  return {
    average: Math.round((sum / count) * 10) / 10,
    count,
    isPublic: count >= 3,
    distribution,
  }
}

export function getCompletedMovesCount(userId: string): number {
  return mockContracts.filter(
    (c) => (c.transporterId === userId || c.shipperId === userId) && c.status === "completed"
  ).length
}
