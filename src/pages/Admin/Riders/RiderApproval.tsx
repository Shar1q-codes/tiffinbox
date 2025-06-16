import React, { useEffect, useState } from 'react'
import { getRiders, updateRider, Rider } from '../../../services/firestore'

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
    <div>
      <h1>Unapproved Riders</h1>
      {riders.length === 0 ? (
        <p>All riders approved.</p>
      ) : (
        <ul>
          {riders.map(r => (
            <li key={r.id} style={{ marginBottom: '0.5rem' }}>
              {r.name} ({r.email}){' '}
              <button onClick={() => handleApprove(r.id!)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RiderApproval
