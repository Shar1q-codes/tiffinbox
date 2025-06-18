import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentPage.module.css';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRetry = () => {
    navigate('/payment');
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  return (
    <div className={styles.paymentPage}>
      <div className={styles.container}>
        <div className={styles.cancelCard}>
          <div className={styles.cancelIcon}>❌</div>
          <h2 className={styles.cancelTitle}>Payment Cancelled</h2>
          <p className={styles.cancelMessage}>
            Your payment process was cancelled or interrupted.
            No charges have been made to your payment method.
          </p>
          
          <div className={styles.cancelInfo}>
            <h3>What would you like to do next?</h3>
            <p>
              You can try the payment again or return to browsing our menu.
              If you experienced any issues during checkout, please contact
              our customer support.
            </p>
          </div>

          <div className={styles.cancelActions}>
            <button 
              className={styles.primaryButton}
              onClick={handleRetry}
            >
              <span className={styles.buttonIcon}>🔄</span>
              Retry Payment
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleBackToMenu}
            >
              <span className={styles.buttonIcon}>🍱</span>
              Back to Menu
            </button>
          </div>

          <div className={styles.helpSection}>
            <p>
              Need help? <a href="mailto:support@tiffinbox.com" className={styles.helpLink}>Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;