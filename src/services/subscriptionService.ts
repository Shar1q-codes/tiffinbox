import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp, 
  DocumentSnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { PaymentHistoryItem } from './paymentService';

/**
 * Subscription status types
 */
export type SubscriptionStatus = 'active' | 'paused' | 'canceled' | 'expired' | 'pending';

/**
 * Meal plan types
 */
export type MealPlanType = 'veg' | 'non-veg';

/**
 * Subscription frequency types
 */
export type SubscriptionFrequency = 'daily' | 'monthly';

/**
 * Delivery day options for subscriptions
 */
export type DeliveryDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | 'all';

/**
 * Subscription model interface
 */
export interface Subscription {
  id?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryAddress: string;
  planType: MealPlanType;
  frequency: SubscriptionFrequency;
  status: SubscriptionStatus;
  startDate: Timestamp;
  endDate?: Timestamp;
  nextDeliveryDate?: Timestamp;
  nextBillingDate?: Timestamp;
  amount: number;
  currency: string;
  studentDiscount: boolean;
  deliveryDays: DeliveryDay[];
  lastPaymentId?: string;
  paymentMethod?: string;
  metadata?: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Subscription payment history interface
 */
export interface SubscriptionPayment {
  paymentId: string;
  subscriptionId: string;
  date: Timestamp;
  amount: number;
  status: string;
}

/**
 * Add a new subscription
 * @param subscription Subscription data
 * @returns Promise with the new subscription ID
 */
export const addSubscription = async (subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const timestamp = Timestamp.now();
    const subscriptionData = {
      ...subscription,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    const docRef = await addDoc(collection(db, 'subscriptions'), subscriptionData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding subscription:', error);
    throw error;
  }
};

/**
 * Get all subscriptions
 * @param filters Optional filter criteria
 * @returns Promise with array of subscriptions
 */
export const getAllSubscriptions = async (
  filters?: {
    status?: SubscriptionStatus,
    planType?: MealPlanType,
    customerId?: string
  }
): Promise<Subscription[]> => {
  try {
    let q = query(
      collection(db, 'subscriptions'),
      orderBy('createdAt', 'desc')
    );
    
    // Apply filters if provided
    if (filters) {
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters.planType) {
        q = query(q, where('planType', '==', filters.planType));
      }
      
      if (filters.customerId) {
        q = query(q, where('customerId', '==', filters.customerId));
      }
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Subscription));
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    throw error;
  }
};

/**
 * Get a subscription by ID
 * @param id Subscription ID
 * @returns Promise with subscription data or null if not found
 */
export const getSubscriptionById = async (id: string): Promise<Subscription | null> => {
  try {
    const docRef = doc(db, 'subscriptions', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Subscription;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw error;
  }
};

/**
 * Get subscriptions for a customer
 * @param customerId Customer ID
 * @returns Promise with array of subscriptions
 */
export const getCustomerSubscriptions = async (customerId: string): Promise<Subscription[]> => {
  try {
    const q = query(
      collection(db, 'subscriptions'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Subscription));
  } catch (error) {
    console.error('Error getting customer subscriptions:', error);
    throw error;
  }
};

/**
 * Update a subscription
 * @param id Subscription ID
 * @param data Updated subscription data
 * @returns Promise void
 */
export const updateSubscription = async (id: string, data: Partial<Subscription>): Promise<void> => {
  try {
    const docRef = doc(db, 'subscriptions', id);
    const updatedData = {
      ...data,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

/**
 * Link a payment to a subscription
 * @param subscriptionId Subscription ID
 * @param paymentId Payment ID
 * @returns Promise void
 */
export const linkPaymentToSubscription = async (subscriptionId: string, paymentId: string): Promise<void> => {
  try {
    await updateSubscription(subscriptionId, {
      lastPaymentId: paymentId,
      nextBillingDate: calculateNextBillingDate(),
    });
    
    // Also store the reference in a separate collection for easier querying
    await addDoc(collection(db, 'subscriptionPayments'), {
      subscriptionId,
      paymentId,
      date: Timestamp.now()
    });
  } catch (error) {
    console.error('Error linking payment to subscription:', error);
    throw error;
  }
};

/**
 * Cancel a subscription
 * @param id Subscription ID
 * @param reason Optional cancellation reason
 * @returns Promise void
 */
export const cancelSubscription = async (id: string, reason?: string): Promise<void> => {
  try {
    await updateSubscription(id, {
      status: 'canceled',
      metadata: reason ? { cancellationReason: reason } : undefined
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

/**
 * Pause a subscription
 * @param id Subscription ID
 * @param resumeDate Optional date to automatically resume
 * @returns Promise void
 */
export const pauseSubscription = async (id: string, resumeDate?: Date): Promise<void> => {
  try {
    await updateSubscription(id, {
      status: 'paused',
      metadata: resumeDate ? { resumeDate: resumeDate.toISOString() } : undefined
    });
  } catch (error) {
    console.error('Error pausing subscription:', error);
    throw error;
  }
};

/**
 * Resume a paused subscription
 * @param id Subscription ID
 * @returns Promise void
 */
export const resumeSubscription = async (id: string): Promise<void> => {
  try {
    await updateSubscription(id, {
      status: 'active',
      metadata: { resumedAt: new Date().toISOString() }
    });
  } catch (error) {
    console.error('Error resuming subscription:', error);
    throw error;
  }
};

/**
 * Get subscription payment history
 * @param subscriptionId Subscription ID
 * @returns Promise with payment history
 */
export const getSubscriptionPaymentHistory = async (subscriptionId: string): Promise<PaymentHistoryItem[]> => {
  try {
    // Get all linked payments from subscriptionPayments collection
    const q = query(
      collection(db, 'subscriptionPayments'),
      where('subscriptionId', '==', subscriptionId),
      orderBy('date', 'desc')
    );
    
    const paymentLinks = await getDocs(q);
    
    // Get payment details from paymentHistory collection
    const paymentPromises = paymentLinks.docs.map(async link => {
      const paymentId = link.data().paymentId;
      const paymentDoc = await getDocs(
        query(collection(db, 'paymentHistory'), where('paymentIntentId', '==', paymentId))
      );
      
      if (!paymentDoc.empty) {
        const payment = paymentDoc.docs[0];
        return {
          id: payment.id,
          ...payment.data()
        } as PaymentHistoryItem;
      }
      return null;
    });
    
    const payments = await Promise.all(paymentPromises);
    return payments.filter(payment => payment !== null) as PaymentHistoryItem[];
  } catch (error) {
    console.error('Error getting subscription payment history:', error);
    throw error;
  }
};

/**
 * Calculate next billing date based on subscription frequency
 * @returns Next billing date timestamp
 */
const calculateNextBillingDate = (): Timestamp => {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return Timestamp.fromDate(nextMonth);
};

/**
 * Get subscriptions that need renewal soon
 * @param daysThreshold Number of days threshold (default: 3)
 * @returns Promise with array of subscriptions needing renewal
 */
export const getSubscriptionsDueForRenewal = async (daysThreshold = 3): Promise<Subscription[]> => {
  try {
    const now = new Date();
    const thresholdDate = new Date(now);
    thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
    
    const querySnapshot = await getDocs(
      query(
        collection(db, 'subscriptions'),
        where('status', '==', 'active'),
        where('nextBillingDate', '<=', Timestamp.fromDate(thresholdDate))
      )
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Subscription));
  } catch (error) {
    console.error('Error getting subscriptions due for renewal:', error);
    throw error;
  }
};

/**
 * Renew a subscription and create a new billing cycle
 * @param subscriptionId Subscription ID
 * @param paymentIntentId New payment intent ID
 * @returns Promise void
 */
export const renewSubscription = async (subscriptionId: string, paymentIntentId: string): Promise<void> => {
  try {
    const subscription = await getSubscriptionById(subscriptionId);
    if (!subscription) {
      throw new Error(`Subscription ${subscriptionId} not found`);
    }
    
    await updateSubscription(subscriptionId, {
      lastPaymentId: paymentIntentId,
      nextBillingDate: calculateNextBillingDate(),
      status: 'active'
    });
    
    // Store the renewal payment reference
    await addDoc(collection(db, 'subscriptionPayments'), {
      subscriptionId,
      paymentId: paymentIntentId,
      date: Timestamp.now(),
      type: 'renewal'
    });
  } catch (error) {
    console.error('Error renewing subscription:', error);
    throw error;
  }
};

/**
 * Delete a subscription (should be used with caution)
 * @param id Subscription ID
 * @returns Promise void
 */
export const deleteSubscription = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'subscriptions', id));
  } catch (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
};

/**
 * Get subscription analytics data
 * @returns Promise with subscription analytics
 */
export const getSubscriptionAnalytics = async () => {
  try {
    const subscriptions = await getAllSubscriptions();
    
    // Calculate key metrics
    const totalSubscriptions = subscriptions.length;
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
    const pausedSubscriptions = subscriptions.filter(s => s.status === 'paused').length;
    const canceledSubscriptions = subscriptions.filter(s => s.status === 'canceled').length;
    
    // Calculate revenue from subscriptions
    const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
    
    // Calculate plan type distribution
    const vegPlans = subscriptions.filter(s => s.planType === 'veg').length;
    const nonVegPlans = subscriptions.filter(s => s.planType === 'non-veg').length;
    
    return {
      totalSubscriptions,
      activeSubscriptions,
      pausedSubscriptions,
      canceledSubscriptions,
      totalRevenue,
      vegPlans,
      nonVegPlans
    };
  } catch (error) {
    console.error('Error getting subscription analytics:', error);
    throw error;
  }
};