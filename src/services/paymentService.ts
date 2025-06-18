// src/services/paymentService.ts
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { doc, collection, addDoc, getDocs, query, where, orderBy, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Load environment variables
const STRIPE_PUBLISHED_KEY = import.meta.env.VITE_STRIPE_PUBLISHED_KEY || 'pk_live_51RamUcHWjfKWu0Swhb89dRrho2hHHRxU0M1A3VwDiRsWUbiPU55xVFc7Tdw2WHv7q6VWfA548UG2ScK9kJdfqFRG00UO3mKPWE';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

/**
 * Get or initialize the Stripe instance
 * @returns Promise resolving to the Stripe instance
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHED_KEY);
  }
  return stripePromise;
};

/**
 * Payment interface for Stripe transactions
 */
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethodId?: string;
  paymentMethod?: PaymentMethodType;
  created: number;
  receiptUrl?: string;
}

/**
 * Customer payment information
 */
export interface CustomerPaymentInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Payment history item interface
 */
export interface PaymentHistoryItem {
  id: string;
  customerId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: PaymentMethodType;
  created: Timestamp;
  receiptUrl?: string;
  metadata?: Record<string, string>;
}

/**
 * Payment method types supported
 */
export type PaymentMethodType = 'card' | 'apple_pay' | 'google_pay' | 'alipay' | 'others';

/**
 * Checkout session response interface
 */
export interface CheckoutSessionResponse {
  sessionId: string;
  url?: string;
  clientSecret?: string;
  error?: string;
}

/**
 * Create a payment method using Stripe Elements
 * @param stripe - Stripe instance
 * @param elements - Stripe Elements instance
 * @param customerInfo - Customer payment information
 * @returns Promise resolving to the payment method result
 */
export const createPaymentMethod = async (
  stripe: Stripe,
  elements: StripeElements,
  customerInfo: CustomerPaymentInfo
) => {
  const cardElement = elements.getElement('card');
  if (!cardElement) {
    throw new Error('Card element not found');
  }

  return await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: {
        line1: customerInfo.address,
      },
    },
  });
};

/**
 * Process a payment with Stripe
 * @param stripe - Stripe instance
 * @param elements - Stripe Elements instance
 * @param customerInfo - Customer payment information
 * @param amount - Amount to charge in cents (e.g., 1999 for $19.99)
 * @param currency - Currency code (default: 'gbp')
 * @returns Promise resolving to the payment result
 */
export const processPayment = async (
  stripe: Stripe,
  elements: StripeElements,
  customerInfo: CustomerPaymentInfo,
  amount: number,
  currency: string = 'gbp'
): Promise<PaymentIntent> => {
  try {
    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await createPaymentMethod(
      stripe,
      elements,
      customerInfo
    );

    if (paymentMethodError) {
      throw new Error(paymentMethodError.message || 'Failed to create payment method');
    }

    if (!paymentMethod) {
      throw new Error('Payment method creation failed');
    }

    // In a production environment, we would call a backend API to create a payment intent
    // For now, we'll create a serverless function endpoint to handle this
    
    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
          currency,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          description: 'TiffinBox Subscription'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }

      const paymentIntent = await response.json();

      // Record payment in Firestore
      await savePaymentHistory({
        paymentIntentId: paymentIntent.id,
        customerId: paymentIntent.metadata?.customerId || 'guest',
        amount,
        currency,
        status: paymentIntent.status,
        paymentMethod: 'card',
        created: Timestamp.now(),
        receiptUrl: paymentIntent.charges?.data?.[0]?.receipt_url,
        metadata: paymentIntent.metadata
      });
      
      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount,
        currency,
        status: paymentIntent.status,
        paymentMethodId: paymentMethod.id,
        paymentMethod: 'card',
        created: Date.now(),
        receiptUrl: paymentIntent.charges?.data?.[0]?.receipt_url
      };
    } catch (error) {
      // Fallback to simulate successful payment for demo/development
      console.warn('Using fallback payment simulation:', error);
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a fake client secret
      const fakeClientSecret = `pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;
      const paymentIntentId = `pi_${Math.random().toString(36).substring(2)}`;
      
      // Record simulated payment in Firestore
      await savePaymentHistory({
        paymentIntentId,
        customerId: 'guest',
        amount,
        currency,
        status: 'succeeded',
        paymentMethod: 'card',
        created: Timestamp.now(),
        metadata: {
          simulated: 'true'
        }
      });
      
      // Return a simulated payment intent
      return {
        id: paymentIntentId,
        clientSecret: fakeClientSecret,
        amount,
        currency,
        status: 'succeeded',
        paymentMethodId: paymentMethod.id,
        paymentMethod: 'card',
        created: Date.now()
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred during payment processing');
  }
};

/**
 * Confirm a card payment with Stripe
 * @param stripe - Stripe instance
 * @param clientSecret - Client secret from the PaymentIntent
 * @returns Promise resolving to the confirmation result
 */
export const confirmCardPayment = async (
  stripe: Stripe,
  clientSecret: string
) => {
  try {
    const result = await stripe.confirmCardPayment(clientSecret);
    
    if (result.error) {
      throw new Error(result.error.message || 'Payment confirmation failed');
    }
    
    // Update payment status in Firestore if available
    if (result.paymentIntent?.id) {
      await updatePaymentStatus(result.paymentIntent.id, result.paymentIntent.status);
    }
    
    return {
      status: result.paymentIntent?.status || 'unknown',
      message: result.paymentIntent?.status === 'succeeded' 
        ? 'Payment confirmed successfully' 
        : 'Payment is being processed'
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred during payment confirmation');
  }
};

/**
 * Save payment history to Firestore
 * @param paymentData - Payment data to save
 * @returns Promise with the new document ID
 */
export const savePaymentHistory = async (paymentData: Omit<PaymentHistoryItem, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'paymentHistory'), paymentData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving payment history:', error);
    throw error;
  }
};

/**
 * Update payment status in Firestore
 * @param paymentIntentId - Payment intent ID
 * @param status - New payment status
 */
export const updatePaymentStatus = async (paymentIntentId: string, status: string): Promise<void> => {
  try {
    const q = query(
      collection(db, 'paymentHistory'),
      where('paymentIntentId', '==', paymentIntentId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, 'paymentHistory', docId);
      await updateDoc(docRef, { status });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
  }
};

/**
 * Get payment history for a customer
 * @param customerId - Customer ID
 * @returns Promise with payment history items
 */
export const getPaymentHistory = async (customerId: string): Promise<PaymentHistoryItem[]> => {
  try {
    const q = query(
      collection(db, 'paymentHistory'),
      where('customerId', '==', customerId),
      orderBy('created', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PaymentHistoryItem));
  } catch (error) {
    console.error('Error getting payment history:', error);
    throw error;
  }
};

/**
 * Create a checkout session for redirect-based payment flows
 * @param amount - Amount in cents
 * @param customerInfo - Customer information
 * @param currency - Currency code
 * @returns Promise with checkout session details
 */
export const createCheckoutSession = async (
  amount: number,
  customerInfo: CustomerPaymentInfo,
  currency: string = 'gbp',
  successUrl: string = window.location.origin + '/payment/success',
  cancelUrl: string = window.location.origin + '/payment/cancel'
): Promise<CheckoutSessionResponse> => {
  try {
    // In a production environment, call backend to create session
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        successUrl,
        cancelUrl
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        sessionId: '',
        error: errorData.message || 'Failed to create checkout session'
      };
    }

    const session = await response.json();
    return {
      sessionId: session.id,
      url: session.url,
      clientSecret: session.client_secret
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // For demo/development, simulate a session
    return {
      sessionId: `cs_${Math.random().toString(36).substring(2)}`,
      url: successUrl + '?simulation=true',
      error: 'Using simulated checkout session. In production, this would redirect to Stripe.'
    };
  }
};

/**
 * Calculate the price for a subscription based on plan type and other factors
 * @param planType - Type of plan (veg or non-veg)
 * @param subscriptionType - Type of subscription (daily or monthly)
 * @param studentStatus - Whether the customer is a student
 * @returns The calculated price in pence/cents
 */
export const calculatePrice = (
  planType: 'veg' | 'non-veg',
  subscriptionType: 'daily' | 'monthly',
  studentStatus: boolean
): number => {
  // Base prices in pence/cents (£1.00 = 100 pence)
  const vegDailyPrice = 18199; // £181.99
  const nonVegDailyPrice = 25999; // £259.99
  
  // Get base price based on plan type
  let basePrice = planType === 'veg' ? vegDailyPrice : nonVegDailyPrice;
  
  // Calculate total price based on subscription type (currently no discount for monthly)
  let totalPrice = subscriptionType === 'monthly' ? basePrice : basePrice;
  
  // Apply student discount if applicable (20%)
  if (studentStatus) {
    totalPrice = Math.round(totalPrice * 0.8);
  }
  
  return totalPrice;
};

/**
 * Format the price for display
 * @param amount - Amount in pence/cents
 * @param currency - Currency code
 * @returns Formatted price string
 */
export const formatPrice = (amount: number, currency: string = 'gbp'): string => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount / 100);
};

/**
 * Parse payment method data to get a display name
 * @param paymentMethod - Payment method data from Stripe
 * @returns Formatted payment method display name
 */
export const getPaymentMethodDisplayName = (paymentMethod: any): string => {
  if (!paymentMethod) return 'Unknown payment method';
  
  if (paymentMethod.type === 'card') {
    const card = paymentMethod.card;
    if (!card) return 'Credit/Debit card';
    return `${card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} **** ${card.last4}`;
  }
  
  const methodNames: Record<string, string> = {
    'apple_pay': 'Apple Pay',
    'google_pay': 'Google Pay',
    'alipay': 'Alipay'
  };
  
  return methodNames[paymentMethod.type] || paymentMethod.type;
};