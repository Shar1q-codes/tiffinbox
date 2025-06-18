import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'

// Load environment variables
const STRIPE_PUBLISHED_KEY = import.meta.env.VITE_STRIPE_PUBLISHED_KEY || 'pk_live_51RamUcHWjfKWu0Swhb89dRrho2hHHRxU0M1A3VwDiRsWUbiPU55xVFc7Tdw2WHv7q6VWfA548UG2ScK9kJdfqFRG00UO3mKPWE'

// Initialize Stripe
let stripePromise: Promise<Stripe | null>

/**
 * Get or initialize the Stripe instance
 * @returns Promise resolving to the Stripe instance
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHED_KEY)
  }
  return stripePromise
}

/**
 * Payment interface for Stripe transactions
 */
export interface PaymentIntent {
  id: string
  clientSecret: string
  amount: number
  currency: string
  status: string
}

/**
 * Customer payment information
 */
export interface CustomerPaymentInfo {
  name: string
  email: string
  phone: string
  address: string
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
  const cardElement = elements.getElement('card')
  if (!cardElement) {
    throw new Error('Card element not found')
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
  })
}

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
    )

    if (paymentMethodError) {
      throw new Error(paymentMethodError.message || 'Failed to create payment method')
    }

    if (!paymentMethod) {
      throw new Error('Payment method creation failed')
    }

    // In a real implementation, you would call your backend API to create a payment intent
    // For now, we'll simulate a successful payment intent response
    
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate a fake client secret (in real implementation, this would come from your backend)
    const fakeClientSecret = `pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`
    
    // Return a simulated payment intent
    return {
      id: `pi_${Math.random().toString(36).substring(2)}`,
      clientSecret: fakeClientSecret,
      amount,
      currency,
      status: 'succeeded'
    }

    /* 
    In a real implementation with a backend, you would do something like:
    
    // Send the payment method ID to your server
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount,
        currency,
        customerInfo
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Payment processing failed')
    }

    const paymentIntent = await response.json()
    return paymentIntent
    */
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unknown error occurred during payment processing')
  }
}

/**
 * Confirm a payment with Stripe
 * @param stripe - Stripe instance
 * @param clientSecret - Client secret from the PaymentIntent
 * @returns Promise resolving to the confirmation result
 */
export const confirmPayment = async (
  stripe: Stripe,
  clientSecret: string
) => {
  try {
    // In a real implementation, you would confirm the payment with Stripe
    // For now, we'll simulate a successful confirmation
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return simulated confirmation
    return {
      status: 'succeeded',
      message: 'Payment confirmed successfully'
    }

    /* 
    In a real implementation:
    
    const result = await stripe.confirmCardPayment(clientSecret)
    
    if (result.error) {
      throw new Error(result.error.message || 'Payment confirmation failed')
    }
    
    return {
      status: result.paymentIntent?.status || 'unknown',
      message: result.paymentIntent?.status === 'succeeded' ? 'Payment confirmed successfully' : 'Payment is being processed'
    }
    */
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unknown error occurred during payment confirmation')
  }
}

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
  const vegDailyPrice = 18199 // £181.99
  const nonVegDailyPrice = 25999 // £259.99
  
  // Get base price based on plan type
  let basePrice = planType === 'veg' ? vegDailyPrice : nonVegDailyPrice
  
  // Calculate total price based on subscription type (currently no discount for monthly)
  let totalPrice = subscriptionType === 'monthly' ? basePrice : basePrice
  
  // Apply student discount if applicable (20%)
  if (studentStatus) {
    totalPrice = Math.round(totalPrice * 0.8)
  }
  
  return totalPrice
}

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
  })
  
  return formatter.format(amount / 100)
}