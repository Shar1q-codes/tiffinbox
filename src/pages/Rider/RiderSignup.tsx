import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { createRiderProfile } from '../../services/firestore'

<<<<<<< HEAD
=======
import styles from './RiderSignup.module.css'



>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
const RiderSignup: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    try {
      setLoading(true)
      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await createRiderProfile(cred.user.uid, {
        email: formData.email,
        name: formData.name
      })
      navigate('/rider/dashboard')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError('Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
<<<<<<< HEAD
=======

    <div className={styles.authContainer}>
      <h1>Rider Signup</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Name</label>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
    <div style={{ padding: '2rem' }}>
      <h1>Rider Signup</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
<<<<<<< HEAD
=======

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
<<<<<<< HEAD
=======

            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email</label>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
<<<<<<< HEAD
=======

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
<<<<<<< HEAD
=======

            className={styles.input}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Password</label>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
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
<<<<<<< HEAD
=======

            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} className={styles.button}>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
<<<<<<< HEAD
=======

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/rider/login">Login</Link>
      </p>
    </div>
  )
}

export default RiderSignup
