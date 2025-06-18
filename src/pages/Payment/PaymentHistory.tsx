import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../../contexts/PaymentContext';
import { formatPrice, PaymentHistoryItem } from '../../services/paymentService';
import { format } from 'date-fns';
import styles from './PaymentHistory.module.css';

const PaymentHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { paymentHistory, refreshPaymentHistory, formatCurrency } = usePaymentContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await refreshPaymentHistory();
      } catch (error) {
        console.error('Error loading payment history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [refreshPaymentHistory]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      // If it's a Firebase timestamp
      if (timestamp.toDate) {
        return format(timestamp.toDate(), 'MMM dd, yyyy - h:mm a');
      }
      // If it's a number (unix timestamp in ms)
      else if (typeof timestamp === 'number') {
        return format(new Date(timestamp), 'MMM dd, yyyy - h:mm a');
      }
      // If it's a string or other format we can't handle
      return 'Invalid date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'succeeded':
        return styles.statusSucceeded;
      case 'processing':
        return styles.statusProcessing;
      case 'requires_payment_method':
      case 'requires_action':
        return styles.statusRequiresAction;
      case 'canceled':
        return styles.statusCanceled;
      default:
        return styles.statusDefault;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return '💳';
      case 'apple_pay':
        return '🍎';
      case 'google_pay':
        return '🔵';
      case 'alipay':
        return '💰';
      default:
        return '💰';
    }
  };

  if (isLoading) {
    return (
      <div className={styles.paymentHistoryPage}>
        <div className={styles.container}>
          <div className={styles.loadingCard}>
            <div className={styles.loadingIcon}>⏳</div>
            <h2 className={styles.loadingTitle}>Loading Payment History...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentHistoryPage}>
      <div className={styles.container}>
        <div className={styles.historyCard}>
          <div className={styles.header}>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h2 className={styles.title}>Payment History</h2>
            <p className={styles.subtitle}>
              View and manage your payment transactions
            </p>
          </div>

          {paymentHistory.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No Payments Found</h3>
              <p className={styles.emptyMessage}>
                You haven't made any payments yet. Start by subscribing to our meal plan!
              </p>
              <button 
                className={styles.primaryButton}
                onClick={() => navigate('/subscription')}
              >
                <span className={styles.buttonIcon}>➕</span>
                Create Subscription
              </button>
            </div>
          ) : (
            <div className={styles.paymentList}>
              {paymentHistory.map((payment: PaymentHistoryItem) => (
                <div key={payment.id} className={styles.paymentItem}>
                  <div className={styles.paymentHeader}>
                    <div className={styles.paymentDate}>
                      {formatDate(payment.created)}
                    </div>
                    <div className={`${styles.statusBadge} ${getStatusBadgeClass(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1).replace(/_/g, ' ')}
                    </div>
                  </div>
                  
                  <div className={styles.paymentDetails}>
                    <div className={styles.paymentInfo}>
                      <div className={styles.paymentMethodBadge}>
                        <span className={styles.methodIcon}>
                          {getPaymentMethodIcon(payment.paymentMethod)}
                        </span>
                        <span className={styles.methodName}>
                          {payment.paymentMethod === 'card' ? 'Card Payment' : payment.paymentMethod.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className={styles.paymentId}>
                        ID: {payment.paymentIntentId.substring(0, 8)}...
                      </div>
                    </div>
                    
                    <div className={styles.paymentAmount}>
                      {formatCurrency(payment.amount, payment.currency)}
                    </div>
                  </div>
                  
                  <div className={styles.paymentActions}>
                    {payment.receiptUrl && (
                      <a 
                        href={payment.receiptUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.receiptLink}
                      >
                        <span className={styles.receiptIcon}>🧾</span>
                        View Receipt
                      </a>
                    )}
                    {payment.status === 'succeeded' && (
                      <button 
                        className={styles.supportButton}
                        onClick={() => navigate('/tracking')}
                      >
                        <span className={styles.supportIcon}>🚚</span>
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;