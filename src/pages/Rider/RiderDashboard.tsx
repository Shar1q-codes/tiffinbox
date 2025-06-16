import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getRiders } from '../../services/firestore'

import styles from './RiderDashboard.module.css'




import styles from './RiderDashboard.module.css'




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

    <div className={styles.dashboard}>


    <div style={{ padding: '2rem' }}>


    <div className={styles.dashboard}>

    <div style={{ padding: '2rem' }}>


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
