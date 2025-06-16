import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getRiders } from '../../services/firestore'

<<<<<<< HEAD
=======
import styles from './RiderDashboard.module.css'



>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
const RiderDashboard: React.FC = () => {
  const { currentUser } = useAuth()
  const [approved, setApproved] = useState<boolean | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return
      const riders = await getRiders()
      const rider = riders.find(r => r.id === currentUser.uid)
      setApproved(rider?.approved ?? false)
    }
    load()
  }, [currentUser])

  if (!currentUser) return null

  return (
<<<<<<< HEAD
    <div style={{ padding: '2rem' }}>
=======

    <div className={styles.dashboard}>

    <div style={{ padding: '2rem' }}>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
      <h1>Rider Dashboard</h1>
      {approved === null ? (
        <p>Loading...</p>
      ) : approved ? (
        <p>Welcome {currentUser.email}</p>
      ) : (
        <p>Your account is awaiting approval.</p>
      )}
    </div>
  )
}

export default RiderDashboard
