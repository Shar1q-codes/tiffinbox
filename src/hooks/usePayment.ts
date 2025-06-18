// src/hooks/usePayment.ts
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  processPayment,
  confirmCardPayment,
  createCheckoutSession,
  CustomerPaymentInfo,
  PaymentIntent,
  CheckoutSessionResponse
} from '../services/paymentService';
import { usePaymentContext } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

interface PaymentOptions {
  redirectToCheckout?: boolean;
  savePaymentMethod?: boolean;
  setupFuturePayments?: boolean;
  successUrl?: string;
  cancelUrl?: string;
}

const defaultOptions: PaymentOptions = {
  redirectToCheckout: false,
  savePaymentMethod: false,
  setupFuturePayments: false
};

export const usePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { 
    setProcessingStatus, 
    setPaymentError,
    setPaymentSuccess,
    processingPayment,
    clearPaymentState,
    selectedPaymentMethod
  } = usePaymentContext();
  
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionResponse | null>(null);

  /**
   * Process a payment using Stripe
   * @param customerInfo - Customer information
   * @param amount - Amount in cents
   * @param currency - Currency code
   * @param options - Additional payment options
   * @returns Promise resolving to the payment result
   */
  const handlePayment = async (
    customerInfo: CustomerPaymentInfo,
    amount: number,
    currency: string = 'gbp',
    options: PaymentOptions = defaultOptions
  ) => {
    if (!stripe || !elements) {
      setPaymentError('Payment system not available. Please try again later.');
      return null;
    }

    clearPaymentState();
    setProcessingStatus(true);
    setPaymentError(null);

    try {
      // If redirecting to checkout, create a checkout session
      if (options.redirectToCheckout) {
        const session = await createCheckoutSession(
          amount,
          customerInfo,
          currency,
          options.successUrl,
          options.cancelUrl
        );
        
        setCheckoutSession(session);
        
        if (session.error) {
          throw new Error(session.error);
        }
        
        // Redirect to Stripe Checkout
        if (session.url) {
          window.location.href = session.url;
          return null;
        }
        
        return null;
      }
      
      // Otherwise process direct payment
      const paymentResult = await processPayment(
        stripe,
        elements,
        customerInfo,
        amount,
        currency
      );
      
      processingPayment(paymentResult);
      
      // If payment requires additional actions like 3D Secure
      if (paymentResult.status === 'requires_action' && paymentResult.clientSecret) {
        const confirmResult = await confirmCardPayment(stripe, paymentResult.clientSecret);
        
        if (confirmResult.status === 'succeeded') {
          setPaymentSuccess(true);
        } else {
          setPaymentError('Payment requires additional verification. Please check your email.');
        }
      } 
      // If payment succeeded immediately
      else if (paymentResult.status === 'succeeded') {
        setPaymentSuccess(true);
      } 
      // If payment is processing or requires confirmation
      else {
        setPaymentError('Payment is being processed. We will notify you once it completes.');
      }
      
      return paymentResult;
    } catch (error) {
      console.error('Payment error:', error);
      
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError('An unknown error occurred during payment processing.');
      }
      
      return null;
    } finally {
      setProcessingStatus(false);
    }
  };

  /**
   * Navigate to payment success page with details
   * @param paymentIntent - Payment intent data
   */
  const navigateToSuccess = (paymentIntent: PaymentIntent) => {
    navigate('/payment/success', { state: { paymentIntent } });
  };

  /**
   * Handle payment method selection
   * @param methodType - Payment method type
   */
  const handlePaymentMethodSelection = () => {
    return selectedPaymentMethod;
  };

  return {
    handlePayment,
    checkoutSession,
    navigateToSuccess,
    handlePaymentMethodSelection,
    isStripeReady: !!stripe && !!elements
  };
};

export default usePayment;