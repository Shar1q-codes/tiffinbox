import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import styles from './AdminLogin.module.css'

interface LoginFormData {
  email: string
  password: string
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, error: authError } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      await login(formData.email, formData.password)
      
      // Get the redirect path from location state or default to dashboard
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard'
      navigate(from, { replace: true })
    } catch (error) {
      setErrorMessage(authError || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className={styles.adminLogin}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>🔐</div>
              <h1 className={styles.logoText}>TiffinBox Admin</h1>
            </div>
            <p className={styles.tagline}>
              <span className={styles.taglineIcon}>🧑‍🍳</span>
              Staff Only
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Email Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.fieldLabel}>
                <span className={styles.labelIcon}>📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.fieldInput}
                placeholder="admin@tiffinbox.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.fieldLabel}>
                <span className={styles.labelIcon}>🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.fieldInput}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className={styles.errorMessage}>
                <span className={styles.errorIcon}>⚠️</span>
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Secure admin access for TiffinBox staff
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin