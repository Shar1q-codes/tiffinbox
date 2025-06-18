import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Elements,
  CardElement,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { addCustomer } from '../../services/firestore';
import { 
  getStripe, 
  CustomerPaymentInfo,
  formatPrice,
  PaymentMethodType
} from '../../services/paymentService';
import { usePaymentContext } from '../../contexts/PaymentContext';
import usePayment from '../../hooks/usePayment';
import styles from './PaymentPage.module.css';

// Initialize Stripe instance
const stripePromise = getStripe();

interface PaymentData {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliverySlot: string;
  planType: 'veg' | 'non-veg';
  studentStatus: boolean;
  subscriptionType?: 'daily' | 'monthly';
  amount: number;
  currency: string;
}

const PaymentMethodSelector: React.FC<{
  selectedMethod: PaymentMethodType;
  setSelectedMethod: (method: PaymentMethodType) => void;
}> = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className={styles.paymentMethodSelector}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>💳</span>
        Payment Method
      </h3>
      
      <div className={styles.methodOptions}>
        <div 
          className={`${styles.methodOption} ${styles.selected}`}
        >
          <span className={styles.methodIcon}>💳</span>
          <span className={styles.methodName}>Credit/Debit Card</span>
        </div>
      </div>
    </div>
  );
};

const PaymentForm: React.FC<{ paymentData: PaymentData }> = ({ paymentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { 
    isProcessing, 
    paymentError, 
    paymentSuccess, 
    setPaymentError,
    setProcessingStatus,
    setSelectedPaymentMethod,
    selectedPaymentMethod
  } = usePaymentContext();
  
  const { handlePayment, navigateToSuccess } = usePayment();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessingStatus(true);
    setPaymentError(null);

    // Prepare customer payment info
    const customerInfo: CustomerPaymentInfo = {
      name: paymentData.name,
      email: paymentData.email,
      phone: paymentData.phone,
      address: paymentData.address
    };
    
    try {
      // Process payment with our payment hook
      const paymentResult = await handlePayment(
        customerInfo,
        paymentData.amount,
        paymentData.currency
      );
      
      if (paymentResult) {
        // Create customer record in our database after successful payment
        await addCustomer({
          name: paymentData.name,
          email: paymentData.email,
          phone: paymentData.phone,
          address: paymentData.address,
          deliverySlot: paymentData.deliverySlot,
          planType: paymentData.planType,
          studentStatus: paymentData.studentStatus,
          subscriptionType: paymentData.subscriptionType || 'daily',
          paymentIntentId: paymentResult.id, // Store payment intent ID for reference
          amount: paymentResult.amount,
          paymentStatus: paymentResult.status
        });

        // Navigate to success page with payment details
        navigateToSuccess(paymentResult);
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError('Payment processing failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <PaymentMethodSelector 
        selectedMethod={selectedPaymentMethod}
        setSelectedMethod={setSelectedPaymentMethod}
      />
      
      <div className={styles.cardSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>💳</span>
          Payment Details
        </h3>
        
        <div className={styles.cardElementContainer}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#2b2b2b',
                  fontFamily: 'Poppins, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#dc2626',
                  iconColor: '#dc2626',
                },
              },
            }}
            className={styles.cardElement}
          />
        </div>

        {paymentError && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {paymentError}
          </div>
        )}

        <div className={styles.securityNote}>
          <span className={styles.securityIcon}>🔒</span>
          <span className={styles.securityText}>
            Your payment information is secure and encrypted
          </span>
        </div>
      </div>

      <button
        type="submit"
        className={styles.payButton}
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <span className={styles.spinner}></span>
            Processing Payment...
          </>
        ) : (
          <>
            <span className={styles.buttonIcon}>💳</span>
            Pay {formatPrice(paymentData.amount, paymentData.currency)}
          </>
        )}
      </button>
    </form>
  );
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const { clearPaymentState } = usePaymentContext();

  useEffect(() => {
    // Clear any previous payment state
    clearPaymentState();
    
    // Get payment data from navigation state
    if (location.state) {
      setPaymentData(location.state as PaymentData);
    } else {
      // Redirect to subscription if no payment data
      navigate('/subscription');
    }
  }, [location.state, navigate, clearPaymentState]);

  if (!paymentData) {
    return (
      <div className={styles.paymentPage}>
        <div className={styles.container}>
          <div className={styles.loadingCard}>
            <div className={styles.loadingIcon}>⏳</div>
            <h2 className={styles.loadingTitle}>Loading Payment...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentPage}>
      <div className={styles.container}>
        <div className={styles.paymentCard}>
          <div className={styles.header}>
            <button 
              className={styles.backButton}
              onClick={() => navigate('/subscription')}
            >
              ← Back to Subscription
            </button>
            <h2 className={styles.title}>Complete Your Payment</h2>
            <p className={styles.subtitle}>
              Secure payment powered by Stripe
            </p>
          </div>

          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Plan:</span>
                <span className={styles.summaryValue}>
                  {paymentData.planType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Subscription:</span>
                <span className={styles.summaryValue}>
                  {paymentData.subscriptionType === 'monthly' ? 'Monthly' : 'Daily'}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Delivery Time:</span>
                <span className={styles.summaryValue}>{paymentData.deliverySlot}</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Customer:</span>
                <span className={styles.summaryValue}>{paymentData.name}</span>
              </div>
              {paymentData.studentStatus && (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Student Discount:</span>
                  <span className={styles.summaryValue}>20% off</span>
                </div>
              )}
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryItem}>
                <span className={styles.totalLabel}>Total Amount:</span>
                <span className={styles.totalValue}>
                  {formatPrice(paymentData.amount, paymentData.currency)}
                </span>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm paymentData={paymentData} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;