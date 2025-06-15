import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { sendSubscriptionConfirmation, sendDeliveryStatusUpdate } from './notifications'

// Generate secure tracking token
const generateTrackingToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Customer interface
export interface Customer {
  id?: string
  name: string
  email: string
  phone: string
  address: string
  deliverySlot: string
  planType: 'veg' | 'non-veg'
  studentStatus: boolean
  orderDate: Timestamp
  trackingToken: string // New field for tracking
}

// Menu interface
export interface MenuItem {
  id?: string
  name: string
  description: string
  tag: string
  category: 'veg' | 'non-veg'
  isSpecial: boolean
  image?: string
}

// Delivery Status interface
export interface DeliveryStatus {
  id?: string
  customerId: string
  customerName: string
  orderId: string
  trackingToken: string // New field for token-based access
  status: 'prepared' | 'pickedUp' | 'onTheWay' | 'delivered'
  assignedPartner: string
  currentLocation: string
  estimatedArrival: string
  lastUpdated: Timestamp
  expiresAt: Timestamp // Auto-expire after delivery + 24 hours
}

// Customer operations
export const addCustomer = async (customerData: Omit<Customer, 'id' | 'orderDate' | 'trackingToken'>) => {
  try {
    const trackingToken = generateTrackingToken()
    const docRef = await addDoc(collection(db, 'customers'), {
      ...customerData,
      orderDate: Timestamp.now(),
      trackingToken
    })
    
    // Generate order ID
    const orderId = `TFN${Date.now().toString().slice(-6)}`
    
    // Calculate pricing
    const basePrice = customerData.planType === 'veg' ? 181.99 : 259.99
    const finalPrice = customerData.studentStatus ? basePrice * 0.8 : basePrice
    const dailyPrice = `£${finalPrice.toFixed(2)}`
    
    // Create initial delivery status
    await addDeliveryStatus({
      customerId: docRef.id,
      customerName: customerData.name,
      orderId,
      trackingToken,
      status: 'prepared',
      assignedPartner: 'unassigned',
      currentLocation: 'Kitchen - Being Prepared',
      estimatedArrival: calculateETA(customerData.deliverySlot),
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 48 * 60 * 60 * 1000)) // 48 hours
    })
    
    // Send confirmation email
    try {
      await sendSubscriptionConfirmation({
        customerName: customerData.name,
        customerEmail: customerData.email,
        trackingToken,
        planType: customerData.planType,
        deliverySlot: customerData.deliverySlot,
        orderId,
        dailyPrice,
        studentDiscount: customerData.studentStatus
      })
      console.log('Confirmation email sent successfully')
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't throw error - subscription should still succeed even if email fails
    }
    
    return { customerId: docRef.id, trackingToken }
  } catch (error) {
    console.error('Error adding customer:', error)
    throw error
  }
}

// Calculate ETA based on delivery slot
const calculateETA = (deliverySlot: string): string => {
  const today = new Date()
  const [hours, minutes] = deliverySlot.split(':').map(Number)
  today.setHours(hours, minutes, 0, 0)
  
  // If time has passed, set for tomorrow
  if (today < new Date()) {
    today.setDate(today.getDate() + 1)
  }
  
  return today.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'customers'))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Customer))
  } catch (error) {
    console.error('Error getting customers:', error)
    throw error
  }
}

export const updateCustomer = async (id: string, data: Partial<Customer>) => {
  try {
    const customerRef = doc(db, 'customers', id)
    await updateDoc(customerRef, data)
  } catch (error) {
    console.error('Error updating customer:', error)
    throw error
  }
}

export const deleteCustomer = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'customers', id))
  } catch (error) {
    console.error('Error deleting customer:', error)
    throw error
  }
}

// Menu operations
export const addMenuItem = async (menuData: Omit<MenuItem, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'menu'), menuData)
    return docRef.id
  } catch (error) {
    console.error('Error adding menu item:', error)
    throw error
  }
}

export const getMenuItems = async (category?: 'veg' | 'non-veg'): Promise<MenuItem[]> => {
  try {
    let querySnapshot
    
    if (category) {
      const q = query(collection(db, 'menu'), where('category', '==', category))
      querySnapshot = await getDocs(q)
    } else {
      querySnapshot = await getDocs(collection(db, 'menu'))
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MenuItem))
  } catch (error) {
    console.error('Error getting menu items:', error)
    throw error
  }
}

export const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
  try {
    const menuRef = doc(db, 'menu', id)
    await updateDoc(menuRef, data)
  } catch (error) {
    console.error('Error updating menu item:', error)
    throw error
  }
}

export const deleteMenuItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'menu', id))
  } catch (error) {
    console.error('Error deleting menu item:', error)
    throw error
  }
}

// Delivery Status operations
export const addDeliveryStatus = async (deliveryData: Omit<DeliveryStatus, 'id' | 'lastUpdated'>) => {
  try {
    const docRef = await addDoc(collection(db, 'deliveryStatus'), {
      ...deliveryData,
      lastUpdated: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding delivery status:', error)
    throw error
  }
}

export const getDeliveryStatuses = async (): Promise<DeliveryStatus[]> => {
  try {
    const q = query(collection(db, 'deliveryStatus'), orderBy('lastUpdated', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DeliveryStatus))
  } catch (error) {
    console.error('Error getting delivery statuses:', error)
    throw error
  }
}

export const updateDeliveryStatus = async (id: string, data: Partial<DeliveryStatus>) => {
  try {
    const deliveryRef = doc(db, 'deliveryStatus', id)
    await updateDoc(deliveryRef, {
      ...data,
      lastUpdated: Timestamp.now()
    })

    // Send email notification for status updates
    if (data.status) {
      try {
        // Get the delivery details to send notification
        const deliveryDoc = await getDocs(query(
          collection(db, 'deliveryStatus'),
          where('__name__', '==', id)
        ))
        
        if (!deliveryDoc.empty) {
          const delivery = deliveryDoc.docs[0].data() as DeliveryStatus
          
          // Get customer email
          const customerDoc = await getDocs(query(
            collection(db, 'customers'),
            where('trackingToken', '==', delivery.trackingToken)
          ))
          
          if (!customerDoc.empty) {
            const customer = customerDoc.docs[0].data() as Customer
            
            await sendDeliveryStatusUpdate(
              customer.email,
              customer.name,
              delivery.trackingToken,
              data.status,
              delivery.estimatedArrival
            )
          }
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError)
        // Don't throw error - status update should still succeed
      }
    }
  } catch (error) {
    console.error('Error updating delivery status:', error)
    throw error
  }
}

// Token-based delivery tracking (MODIFIED to avoid composite index)
export const getDeliveryByToken = async (trackingToken: string): Promise<DeliveryStatus | null> => {
  try {
    // First query by tracking token only
    const q = query(
      collection(db, 'deliveryStatus'),
      where('trackingToken', '==', trackingToken.toUpperCase())
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    // Filter expired deliveries client-side
    const now = Timestamp.now()
    const validDeliveries = querySnapshot.docs.filter(doc => {
      const data = doc.data() as DeliveryStatus
      return data.expiresAt > now
    })
    
    if (validDeliveries.length === 0) {
      return null
    }
    
    // Return the most recent valid delivery
    const docSnapshot = validDeliveries[0]
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as DeliveryStatus
  } catch (error) {
    console.error('Error getting delivery by token:', error)
    throw error
  }
}

// Real-time token-based tracking (MODIFIED to avoid composite index)
export const subscribeToDeliveryByToken = (
  trackingToken: string,
  callback: (status: DeliveryStatus | null) => void
) => {
  // Query by tracking token only
  const q = query(
    collection(db, 'deliveryStatus'),
    where('trackingToken', '==', trackingToken.toUpperCase())
  )
  
  return onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
      callback(null)
      return
    }
    
    // Filter expired deliveries client-side
    const now = Timestamp.now()
    const validDeliveries = querySnapshot.docs.filter(doc => {
      const data = doc.data() as DeliveryStatus
      return data.expiresAt > now
    })
    
    if (validDeliveries.length === 0) {
      callback(null)
      return
    }
    
    // Return the most recent valid delivery
    const docSnapshot = validDeliveries[0]
    callback({
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as DeliveryStatus)
  })
}

export const getCustomerDeliveryStatus = async (customerId: string): Promise<DeliveryStatus | null> => {
  try {
    const q = query(
      collection(db, 'deliveryStatus'), 
      where('customerId', '==', customerId),
      orderBy('lastUpdated', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    const docSnapshot = querySnapshot.docs[0]
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as DeliveryStatus
  } catch (error) {
    console.error('Error getting customer delivery status:', error)
    throw error
  }
}

// Legacy real-time listeners (for admin use)
export const subscribeToDeliveryStatus = (
  customerId: string, 
  callback: (status: DeliveryStatus | null) => void
) => {
  const q = query(
    collection(db, 'deliveryStatus'),
    where('customerId', '==', customerId),
    orderBy('lastUpdated', 'desc')
  )
  
  return onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
      callback(null)
      return
    }
    
    const docSnapshot = querySnapshot.docs[0]
    callback({
      id: docSnapshot.id,
      ...docSnapshot.data()
    } as DeliveryStatus)
  })
}

export const subscribeToMenuItems = (
  category: 'veg' | 'non-veg',
  callback: (items: MenuItem[]) => void
) => {
  const q = query(collection(db, 'menu'), where('category', '==', category))
  
  return onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MenuItem))
    callback(items)
  })
}