import React, { useEffect, useState } from 'react'
import styles from './DeliverySummaryCard.module.css'

interface OrderDetails {
  dishName: string
  deliverySlot: string
  orderId: string
  deliveryPartner: string
  estimatedArrival: string
  currentStatus: string
  isLiveTracking: boolean
}

const DeliverySummaryCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('delivery-summary-card')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Mock order data - in real app this would come from props or API
  const orderDetails: OrderDetails = {
    dishName: "Paneer Butter Masala + 2 Rotis + Jeera Rice",
    deliverySlot: "7:00 – 8:00 PM",
    orderId: "#TXN5782341",
    deliveryPartner: "Ravi Kumar",
    estimatedArrival: "7:15 PM",
    currentStatus: "Out for Delivery",
    isLiveTracking: true
  }

  return (
    <section id="delivery-summary-card" className={styles.deliverySummaryCard}>
      <div className={styles.container}>
        <div className={`${styles.card} ${isVisible ? styles.fadeIn : ''}`}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Your Tiffin is on the Way! 🍱
            </h2>
            <p className={styles.estimatedTime}>
              <span className={styles.timeIcon}>🕒</span>
              Estimated Arrival: <strong>{orderDetails.estimatedArrival}</strong>
            </p>
          </div>

          {/* Status Section */}
          <div className={styles.statusSection}>
            <div className={styles.currentStatus}>
              <div className={styles.statusIcon}>📦</div>
              <div className={styles.statusContent}>
                <span className={styles.statusLabel}>Current Status</span>
                <span className={styles.statusValue}>{orderDetails.currentStatus}</span>
              </div>
            </div>
            
            {orderDetails.isLiveTracking && (
              <div className={styles.liveTrackingBadge}>
                <div className={styles.liveDot}></div>
                <span className={styles.liveText}>Live Tracking Enabled</span>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <div className={styles.itemIcon}>🍛</div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Today's Meal</span>
                  <span className={styles.itemValue}>{orderDetails.dishName}</span>
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.itemIcon}>⏰</div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Delivery Slot</span>
                  <span className={styles.itemValue}>{orderDetails.deliverySlot}</span>
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.itemIcon}>🧾</div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Order ID</span>
                  <span className={styles.itemValue}>{orderDetails.orderId}</span>
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.itemIcon}>🚚</div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Delivery Partner</span>
                  <span className={styles.itemValue}>{orderDetails.deliveryPartner}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonIcon}>📞</span>
              Call Delivery Partner
            </button>
            <button className={styles.secondaryButton}>
              <span className={styles.buttonIcon}>📍</span>
              View on Map
            </button>
          </div>

          {/* Progress Indicator */}
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span className={styles.progressTitle}>Delivery Progress</span>
              <span className={styles.progressPercentage}>75%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.progressSteps}>
              <div className={`${styles.step} ${styles.completed}`}>
                <div className={styles.stepIcon}>✅</div>
                <span className={styles.stepLabel}>Prepared</span>
              </div>
              <div className={`${styles.step} ${styles.completed}`}>
                <div className={styles.stepIcon}>✅</div>
                <span className={styles.stepLabel}>Picked Up</span>
              </div>
              <div className={`${styles.step} ${styles.active}`}>
                <div className={styles.stepIcon}>🚚</div>
                <span className={styles.stepLabel}>On the Way</span>
              </div>
              <div className={styles.step}>
                <div className={styles.stepIcon}>🏠</div>
                <span className={styles.stepLabel}>Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeliverySummaryCard