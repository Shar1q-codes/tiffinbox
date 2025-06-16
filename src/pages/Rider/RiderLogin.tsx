import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import styles from './RiderLogin.module.css'



const RiderLogin: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(formData.email, formData.password)
      navigate('/rider/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className={styles.authContainer}>
      <h1>Rider Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email</label>

    <div style={{ padding: '2rem' }}>
      <h1>Rider Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required

            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Password</label>

          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
       <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required

            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} className={styles.button}>

          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>

          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Need an account? <Link to="/rider/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default RiderLogin
