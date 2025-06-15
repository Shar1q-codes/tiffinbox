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
  status: 'prepared' | 'pickedUp' | 'onTheWay' | 'delivered'
  assignedPartner: string
  currentLocation: string
  estimatedArrival: string
  lastUpdated: Timestamp
}

// Customer operations
export const addCustomer = async (customerData: Omit<Customer, 'id' | 'orderDate'>) => {
  try {
    const docRef = await addDoc(collection(db, 'customers'), {
      ...customerData,
      orderDate: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding customer:', error)
    throw error
  }
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
export const addDeliveryStatus = async (deliveryData: Omit<DeliveryStatus, 'id'>) => {
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
  } catch (error) {
    console.error('Error updating delivery status:', error)
    throw error
  }
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

// Real-time listeners
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