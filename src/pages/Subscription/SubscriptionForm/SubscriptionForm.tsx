import React, { useState, useEffect } from 'react'
import styles from './SubscriptionForm.module.css'

interface FormData {
  name: string
  contactNumber: string
  email: string
  address: string
  deliverySlot: string
}

const SubscriptionForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
    deliverySlot: ''
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

  const deliverySlots = [
    { time: '18:00', label: '6:00 PM' },
    { time: '19:00', label: '7:00 PM' },
    { time: '20:00', label: '8:00 PM' },
    { time: '21:00', label: '9:00 PM' },
    { time: '22:00', label: '10:00 PM' }
  ]

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time)
    setFormData(prev => ({ ...prev, deliverySlot: time }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const isFormValid = formData.name && formData.contactNumber && formData.email && formData.address && formData.deliverySlot

  return (
    <section id="subscription-form" className={styles.subscriptionForm}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Start Your Tiffin Subscription</h2>
          <p className={styles.subtitle}>
            Choose your delivery time and provide your details to get started
          </p>
        </div>

        <div className={styles.formWrapper}>
          <div className={`${styles.content} ${isVisible ? styles.slideUp : ''}`}>
            {/* Delivery Slot Picker */}
            <div className={styles.slotSection}>
              <div className={styles.slotCard}>
                <div className={styles.slotHeader}>
                  <h3 className={styles.slotTitle}>Choose Your Delivery Time</h3>
                  <p className={styles.slotSubtext}>Available slots: 6 PM to 10 PM</p>
                </div>

                <div className={styles.slotsGrid}>
                  {deliverySlots.map((slot, index) => (
                    <button
                      key={slot.time}
                      type="button"
                      className={`${styles.slotButton} ${selectedSlot === slot.time ? styles.active : ''} ${isVisible ? styles.fadeIn : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleSlotSelect(slot.time)}
                    >
                      <span className={styles.slotTime}>{slot.label}</span>
                      <span className={styles.slotIcon}>🕐</span>
                    </button>
                  ))}
                </div>

                {selectedSlot && (
                  <div className={styles.selectedSlotDisplay}>
                    <span className={styles.selectedIcon}>✅</span>
                    <span className={styles.selectedText}>
                      Selected: {deliverySlots.find(slot => slot.time === selectedSlot)?.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit} className={styles.customerForm}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Your Details</h3>
                  <p className={styles.formSubtext}>We need these details to deliver your tiffin</p>
                </div>

                <div className={styles.formFields}>
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
                      Contact Number *
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
                      placeholder="Enter your complete delivery address including landmark"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formFooter}>
                  <div className={styles.priceDisplay}>
                    <span className={styles.priceLabel}>Starting from</span>
                    <span className={styles.priceAmount}>₹181.99/day</span>
                  </div>
                  
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ''}`}
                    disabled={!isFormValid}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscriptionForm