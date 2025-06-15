import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addCustomer } from '../../../services/firestore'
import styles from './SubscriptionForm.module.css'

interface FormData {
  name: string
  contactNumber: string
  email: string
  address: string
  deliverySlot: string
  planType: 'veg' | 'non-veg'
  studentStatus: boolean
}

const SubscriptionForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [selectedPlan, setSelectedPlan] = useState<'veg' | 'non-veg'>('veg')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [trackingToken, setTrackingToken] = useState<string>('')
  const location = useLocation()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
    deliverySlot: '',
    planType: 'veg',
    studentStatus: false
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('subscription-form')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Check if student discount was pre-selected from navigation
  useEffect(() => {
    if (location.state?.studentDiscount) {
      setFormData(prev => ({ ...prev, studentStatus: true }))
    }
  }, [location.state])

  const deliverySlots = [
    { time: '18:00', label: '6:00 PM', icon: '🌅' },
    { time: '19:00', label: '7:00 PM', icon: '🌆' },
    { time: '20:00', label: '8:00 PM', icon: '🌇' },
    { time: '21:00', label: '9:00 PM', icon: '🌃' },
    { time: '22:00', label: '10:00 PM', icon: '🌙' }
  ]

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time)
    setFormData(prev => ({ ...prev, deliverySlot: time }))
  }

  const handlePlanSelect = (plan: 'veg' | 'non-veg') => {
    setSelectedPlan(plan)
    setFormData(prev => ({ ...prev, planType: plan }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid) return

    try {
      setIsSubmitting(true)
      
      // Save to Firebase and get tracking token
      const result = await addCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.contactNumber,
        address: formData.address,
        deliverySlot: formData.deliverySlot,
        planType: formData.planType,
        studentStatus: formData.studentStatus
      })

      setTrackingToken(result.trackingToken)
      setSubmitSuccess(true)

    } catch (error) {
      console.error('Error submitting subscription:', error)
      alert('Failed to submit subscription. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTrackMyOrder = () => {
    navigate('/tracking')
  }

  const handleNewOrder = () => {
    setFormData({
      name: '',
      contactNumber: '',
      email: '',
      address: '',
      deliverySlot: '',
      planType: 'veg',
      studentStatus: false
    })
    setSelectedSlot('')
    setSelectedPlan('veg')
    setSubmitSuccess(false)
    setTrackingToken('')
  }

  const isFormValid = formData.name && formData.contactNumber && formData.email && formData.address && formData.deliverySlot

  const currentPrice = selectedPlan === 'veg' ? '₹181.99' : '₹259.99'

  if (submitSuccess) {
    return (
      <section id="subscription-form" className={styles.subscriptionForm}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>🎉</div>
            <h2 className={styles.successTitle}>Order Confirmed!</h2>
            <p className={styles.successMessage}>
              Thank you for subscribing to TiffinBox! Your order has been confirmed and we'll start preparing your delicious meal.
            </p>
            
            <div className={styles.trackingSection}>
              <div className={styles.trackingCard}>
                <h3 className={styles.trackingTitle}>📱 Your Tracking Code</h3>
                <div className={styles.trackingCode}>{trackingToken}</div>
                <p className={styles.trackingNote}>
                  Save this code to track your delivery. We've also sent it to your email and SMS.
                </p>
              </div>
            </div>

            <div className={styles.successDetails}>
              <div className={styles.successItem}>
                <span className={styles.successLabel}>Plan:</span>
                <span className={styles.successValue}>{formData.planType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </div>
              <div className={styles.successItem}>
                <span className={styles.successLabel}>Delivery Time:</span>
                <span className={styles.successValue}>{deliverySlots.find(slot => slot.time === formData.deliverySlot)?.label}</span>
              </div>
              <div className={styles.successItem}>
                <span className={styles.successLabel}>Daily Price:</span>
                <span className={styles.successValue}>
                  {formData.studentStatus 
                    ? `₹${(parseFloat(currentPrice.replace('₹', '')) * 0.8).toFixed(2)} (20% student discount)`
                    : currentPrice
                  }
                </span>
              </div>
            </div>

            <div className={styles.successActions}>
              <button 
                className={styles.primaryButton}
                onClick={handleTrackMyOrder}
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
      </section>
    )
  }

  return (
    <section id="subscription-form" className={styles.subscriptionForm}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Start Your Tiffin Journey</h2>
          <p className={styles.subtitle}>
            Choose your plan, pick your time, and get ready for home-cooked goodness
          </p>
        </div>

        <div className={`${styles.formCard} ${isVisible ? styles.slideUp : ''}`}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            {/* Plan Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🍽️</span>
                Choose Your Plan
              </h3>
              <div className={styles.planGrid}>
                <button
                  type="button"
                  className={`${styles.planCard} ${selectedPlan === 'veg' ? styles.active : ''}`}
                  onClick={() => handlePlanSelect('veg')}
                >
                  <div className={styles.planIcon}>🥬</div>
                  <div className={styles.planInfo}>
                    <h4 className={styles.planName}>Vegetarian</h4>
                    <p className={styles.planPrice}>₹181.99/day</p>
                    <p className={styles.planDescription}>Fresh veg curries, dal, rice & rotis</p>
                  </div>
                  <div className={styles.planCheck}>
                    {selectedPlan === 'veg' && <span>✓</span>}
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.planCard} ${selectedPlan === 'non-veg' ? styles.active : ''}`}
                  onClick={() => handlePlanSelect('non-veg')}
                >
                  <div className={styles.planIcon}>🍗</div>
                  <div className={styles.planInfo}>
                    <h4 className={styles.planName}>Non-Vegetarian</h4>
                    <p className={styles.planPrice}>₹259.99/day</p>
                    <p className={styles.planDescription}>Chicken, mutton curries with sides</p>
                  </div>
                  <div className={styles.planCheck}>
                    {selectedPlan === 'non-veg' && <span>✓</span>}
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery Time Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⏰</span>
                Delivery Time
              </h3>
              <div className={styles.slotsGrid}>
                {deliverySlots.map((slot, index) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`${styles.slotCard} ${selectedSlot === slot.time ? styles.active : ''}`}
                    onClick={() => handleSlotSelect(slot.time)}
                  >
                    <span className={styles.slotIcon}>{slot.icon}</span>
                    <span className={styles.slotTime}>{slot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>👤</span>
                Your Details
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.fieldLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.fieldInput}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactNumber" className={styles.fieldLabel}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className={styles.fieldInput}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.fieldLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.fieldInput}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="address" className={styles.fieldLabel}>
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.fieldTextarea}
                    placeholder="Enter your complete delivery address with landmark"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Student Discount */}
            <div className={styles.section}>
              <div className={styles.studentDiscount}>
                <div className={styles.discountIcon}>🎓</div>
                <div className={styles.discountContent}>
                  <h4 className={styles.discountTitle}>Student Discount Available</h4>
                  <p className={styles.discountText}>Get 20% off with valid student ID</p>
                </div>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="studentStatus"
                    checked={formData.studentStatus}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxLabel}>I'm a student</span>
                </label>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className={styles.summarySection}>
              <div className={styles.pricingSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Plan:</span>
                  <span className={styles.summaryValue}>
                    {selectedPlan === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Daily Price:</span>
                  <span className={styles.summaryValue}>{currentPrice}</span>
                </div>
                {formData.studentStatus && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Student Discount:</span>
                    <span className={styles.summaryValue}>-20%</span>
                  </div>
                )}
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryRow}>
                  <span className={styles.totalLabel}>Total per day:</span>
                  <span className={styles.totalValue}>
                    {formData.studentStatus 
                      ? `₹${(parseFloat(currentPrice.replace('₹', '')) * 0.8).toFixed(2)}`
                      : currentPrice
                    }
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ''}`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className={styles.buttonIcon}>🚀</span>
                    Start My Subscription
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SubscriptionForm