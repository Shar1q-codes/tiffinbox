import React, { useEffect, useState } from 'react'
import { getRiders, updateRider, Rider } from '../../../services/firestore'

<<<<<<< HEAD
=======
import styles from './RiderApproval.module.css'



>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
const RiderApproval: React.FC = () => {
  const [riders, setRiders] = useState<Rider[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const all = await getRiders()
    setRiders(all.filter(r => !r.approved))
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleApprove = async (id: string) => {
    await updateRider(id, { approved: true })
    await load()
  }

  if (loading) {
    return <p>Loading riders...</p>
  }

  return (
<<<<<<< HEAD
    <div>
=======

    <div className={styles.container}>

    <div>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
      <h1>Unapproved Riders</h1>
      {riders.length === 0 ? (
        <p>All riders approved.</p>
      ) : (
<<<<<<< HEAD
=======

        <ul className={styles.list}>
          {riders.map(r => (
            <li key={r.id} className={styles.listItem}>
              {r.name} ({r.email}){' '}
              <button
                onClick={() => handleApprove(r.id!)}
                className={styles.button}
              >
                Approve
              </button>

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
        <ul>
          {riders.map(r => (
            <li key={r.id} style={{ marginBottom: '0.5rem' }}>
              {r.name} ({r.email}){' '}
              <button onClick={() => handleApprove(r.id!)}>Approve</button>
<<<<<<< HEAD
=======

>>>>>>> 5b0e9ceaf6370e9bede2fdda4917e351f1be8c85
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RiderApproval
