export interface Item {
  id: string
  name: string
  quantity: number
  weight: number
  fragile: boolean
  dimensions?: string
}

export type MoveStatus = "active" | "completed" | "draft"
export type OfferStatus = "pending" | "accepted" | "rejected"
export type UserRole = "shipper" | "transporter"

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
  memberSince: string
  price: number
  message: string
  insurance: boolean
  loadingHelp: boolean
  status: OfferStatus
  createdAt: string
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
  status: "active" | "completed" | "cancelled"
  createdAt: string
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
    status: "pending",
    createdAt: "June 3, 2026",
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
    status: "active",
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
