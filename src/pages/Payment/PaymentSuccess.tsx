import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../../contexts/PaymentContext';
import styles from './PaymentPage.module.css';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshPaymentHistory, lastPayment } = usePaymentContext();

  // Try to get payment intent from location state or session
  const paymentIntent = location.state?.paymentIntent || null;
  
  // Get session ID from URL if coming from checkout
  const sessionId = new URLSearchParams(location.search).get('session_id');
  
  useEffect(() => {
    // Refresh payment history to include the latest payment
    refreshPaymentHistory();
  }, [refreshPaymentHistory]);

  const handleViewHistory = () => {
    navigate('/user/payments');
  };

  const handleNewOrder = () => {
    navigate('/subscription');
  };

  return (
    <div className={styles.paymentPage}>
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>Payment Successful!</h2>
          <p className={styles.successMessage}>
            Your payment has been processed and your tiffin subscription is now active.
          </p>
          
          <div className={styles.trackingSection}>
            <div className={styles.trackingCard}>
              <h3 className={styles.trackingTitle}>📱 Your Order Details</h3>
              <div className={styles.trackingCode}>
                {paymentIntent?.id || (sessionId ? `Session: ${sessionId}` : 'Payment Confirmed')}
              </div>
              <p className={styles.trackingNote}>
                We've sent a confirmation email with your order details and tracking information.
              </p>
            </div>
          </div>

          {paymentIntent && (
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Payment Summary</h3>
              <div className={styles.summaryDetails}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Amount Paid:</span>
                  <span className={styles.summaryValue}>
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: paymentIntent.currency.toUpperCase(),
                      minimumFractionDigits: 2
                    }).format(paymentIntent.amount / 100)}
                  </span>
                </div>
                {paymentIntent.paymentMethod && (
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Payment Method:</span>
                    <span className={styles.summaryValue}>
                      {paymentIntent.paymentMethod === 'card' ? 'Credit/Debit Card' : paymentIntent.paymentMethod}
                    </span>
                  </div>
                )}
                {paymentIntent.receiptUrl && (
                  <div className={styles.summaryItem}>
                    <a 
                      href={paymentIntent.receiptUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.receiptLink}
                    >
                      View Receipt
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles.successActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/tracking')}
            >
              <span className={styles.buttonIcon}>🚚</span>
              Track My Order
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleNewOrder}
            >
              <span className={styles.buttonIcon}>➕</span>
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;