import React, { useEffect, useState } from 'react'
import styles from './PaymentPlaceholder.module.css'

interface PaymentMethod {
  id: string
  name: string
  label: string
  icon: string
  description: string
}

const PaymentPlaceholder: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('payment-placeholder')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      label: 'Pay with UPI',
      icon: '📱',
      description: 'Google Pay, PhonePe, Paytm & more'
    },
    {
      id: 'card',
      name: 'Card',
      label: 'Credit / Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, RuPay accepted'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      label: 'Net Banking',
      icon: '🏦',
      description: 'All major banks supported'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      label: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive your tiffin'
    }
  ]

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
  }

  const handleConfirmSubscription = () => {
    // Placeholder function - does nothing yet
    console.log('Subscription confirmed with payment method:', selectedMethod)
  }

  return (
    <section id="payment-placeholder" className={styles.paymentPlaceholder}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Choose Your Payment Method</h2>
          <p className={styles.subtitle}>
            Secure payment powered by encrypted channels.
          </p>
        </div>

        <div className={styles.paymentWrapper}>
          <div className={`${styles.paymentCard} ${isVisible ? styles.slideUp : ''}`}>
            <div className={styles.securityBadge}>
              <span className={styles.securityIcon}>🔒</span>
              <span className={styles.securityText}>256-bit SSL Encrypted</span>
            </div>

            <div className={styles.methodsGrid}>
              {paymentMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`${styles.methodCard} ${selectedMethod === method.id ? styles.selected : ''} ${isVisible ? styles.fadeIn : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <div className={styles.radioButton}>
                    <div className={`${styles.radioInner} ${selectedMethod === method.id ? styles.checked : ''}`}></div>
                  </div>
                  
                  <div className={styles.methodContent}>
                    <div className={styles.methodHeader}>
                      <span className={styles.methodIcon}>{method.icon}</span>
                      <h3 className={styles.methodLabel}>{method.label}</h3>
                    </div>
                    <p className={styles.methodDescription}>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedMethod && (
              <div className={styles.selectedMethodDisplay}>
                <div className={styles.selectedInfo}>
                  <span className={styles.selectedIcon}>✅</span>
                  <span className={styles.selectedText}>
                    Payment method selected: {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </span>
                </div>
              </div>
            )}

            <div className={styles.orderSummary}>
              <div className={styles.summaryHeader}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
              </div>
              <div className={styles.summaryItems}>
                <div className={styles.summaryItem}>
                  <span className={styles.itemLabel}>Monthly Tiffin Plan (Veg)</span>
                  <span className={styles.itemPrice}>₹5,459.70</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.itemLabel}>Delivery Charges</span>
                  <span className={styles.itemPrice}>Free</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryTotal}>
                  <span className={styles.totalLabel}>Total Amount</span>
                  <span className={styles.totalPrice}>₹5,459.70</span>
                </div>
              </div>
            </div>

            <div className={styles.actionSection}>
              <button
                className={`${styles.confirmButton} ${!selectedMethod ? styles.disabled : ''}`}
                onClick={handleConfirmSubscription}
                disabled={!selectedMethod}
              >
                <span className={styles.buttonText}>Confirm & Subscribe</span>
                <span className={styles.buttonIcon}>🚀</span>
              </button>
              
              <div className={styles.trustIndicators}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>🛡️</span>
                  <span className={styles.trustText}>100% Secure</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>⚡</span>
                  <span className={styles.trustText}>Instant Processing</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>🔄</span>
                  <span className={styles.trustText}>Easy Refunds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentPlaceholder