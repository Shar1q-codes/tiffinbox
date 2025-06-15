import React, { useEffect, useState } from 'react'
import styles from './DeliveryFooterStatus.module.css'

interface DeliveryStatus {
  status: string
  statusIcon: string
  eta: string
  etaMinutes: number
  isMoving: boolean
}

const DeliveryFooterStatus: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  useEffect(() => {
    // Show the footer after a short delay for smooth entrance
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Mock delivery status - in real app this would come from props or API
  const deliveryStatus: DeliveryStatus = {
    status: "On the Way",
    statusIcon: "🚚",
    eta: "7:15 PM",
    etaMinutes: 5,
    isMoving: true
  }

  const handleSupportClick = () => {
    setShowSupportModal(true)
    // In real app, this would open a support modal or redirect to help page
    console.log('Support modal opened')
  }

  const closeSupportModal = () => {
    setShowSupportModal(false)
  }

  return (
    <>
      <div className={`${styles.deliveryFooterStatus} ${isVisible ? styles.fadeIn : ''}`}>
        <div className={styles.container}>
          <div className={styles.content}>
            {/* Status Section */}
            <div className={styles.statusSection}>
              <div className={styles.statusIcon}>
                <span className={`${styles.iconEmoji} ${deliveryStatus.isMoving ? styles.moving : ''}`}>
                  {deliveryStatus.statusIcon}
                </span>
              </div>
              <div className={styles.statusContent}>
                <span className={styles.statusLabel}>{deliveryStatus.status}</span>
                <span className={styles.statusSubtext}>Your tiffin is coming!</span>
              </div>
            </div>

            {/* ETA Section */}
            <div className={styles.etaSection}>
              <div className={styles.etaBadge}>
                <span className={styles.etaIcon}>⏰</span>
                <div className={styles.etaContent}>
                  <span className={styles.etaLabel}>Arriving in</span>
                  <span className={`${styles.etaTime} ${styles.shimmer}`}>
                    {deliveryStatus.etaMinutes} minutes
                  </span>
                </div>
              </div>
              <div className={styles.etaDetails}>
                <span className={styles.etaExact}>ETA: {deliveryStatus.eta}</span>
              </div>
            </div>

            {/* Support Section */}
            <div className={styles.supportSection}>
              <button 
                className={styles.supportButton}
                onClick={handleSupportClick}
                aria-label="Get help with your delivery"
              >
                <span className={styles.supportIcon}>❓</span>
                <span className={styles.supportText}>Need help?</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Modal Placeholder */}
      {showSupportModal && (
        <div className={styles.modalOverlay} onClick={closeSupportModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>How can we help? 🤝</h3>
              <button 
                className={styles.closeButton}
                onClick={closeSupportModal}
                aria-label="Close support modal"
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.supportOptions}>
                <button className={styles.supportOption}>
                  <span className={styles.optionIcon}>📞</span>
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Call Support</span>
                    <span className={styles.optionSubtext}>+91 98765 43210</span>
                  </div>
                </button>
                <button className={styles.supportOption}>
                  <span className={styles.optionIcon}>💬</span>
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>WhatsApp Chat</span>
                    <span className={styles.optionSubtext}>Quick response</span>
                  </div>
                </button>
                <button className={styles.supportOption}>
                  <span className={styles.optionIcon}>📧</span>
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>Email Us</span>
                    <span className={styles.optionSubtext}>support@tiffinbox.com</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeliveryFooterStatus