import React, { useEffect, useState } from 'react'
import { getCustomers, getMenuItems, getDeliveryStatuses } from '../../../services/firestore'

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalMenuItems: 0,
    todaysOrders: 0,
    activeDeliveries: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      setLoading(true)
      
      const [customers, menuItems, deliveryStatuses] = await Promise.all([
        getCustomers(),
        getMenuItems(),
        getDeliveryStatuses()
      ])

      setStats({
        totalCustomers: customers.length,
        totalMenuItems: menuItems.length,
        todaysOrders: deliveryStatuses.length,
        activeDeliveries: deliveryStatuses.filter(d => d.status !== 'delivered').length
      })
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#2b2b2b', 
          marginBottom: '2rem',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Loading Dashboard... 📊
        </h1>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: '#2b2b2b', 
        marginBottom: '2rem',
        fontFamily: 'Poppins, sans-serif'
      }}>
        Welcome to Admin Dashboard 📊
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#fef6e4',
          border: '1px solid rgba(214, 40, 40, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2b2b2b', margin: '0 0 0.5rem 0' }}>
            Today's Orders
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            {stats.todaysOrders}
          </p>
        </div>
        
        <div style={{
          background: '#fef6e4',
          border: '1px solid rgba(214, 40, 40, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2b2b2b', margin: '0 0 0.5rem 0' }}>
            Total Customers
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            {stats.totalCustomers}
          </p>
        </div>
        
        <div style={{
          background: '#fef6e4',
          border: '1px solid rgba(214, 40, 40, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2b2b2b', margin: '0 0 0.5rem 0' }}>
            Active Deliveries
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            {stats.activeDeliveries}
          </p>
        </div>

        <div style={{
          background: '#fef6e4',
          border: '1px solid rgba(214, 40, 40, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2b2b2b', margin: '0 0 0.5rem 0' }}>
            Menu Items
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            {stats.totalMenuItems}
          </p>
        </div>
      </div>
      
      <div style={{
        background: '#fef6e4',
        border: '1px solid rgba(214, 40, 40, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2b2b2b', margin: '0 0 1rem 0' }}>
          🔥 Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            style={{
              background: '#d62828',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500'
            }}
            onClick={() => window.location.href = '/admin/menu'}
          >
            📝 Manage Menu
          </button>
          <button 
            style={{
              background: '#d62828',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500'
            }}
            onClick={() => window.location.href = '/admin/customers'}
          >
            👥 View Customers
          </button>
          <button 
            style={{
              background: '#d62828',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500'
            }}
            onClick={() => window.location.href = '/admin/delivery'}
          >
            🚚 Manage Deliveries
          </button>
        </div>
      </div>
      
      <p style={{ 
        fontSize: '1rem', 
        color: '#2b2b2b', 
        opacity: '0.8',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '1.6'
      }}>
        Your TiffinBox admin dashboard is now connected to Firebase! All data is being stored and retrieved from your Firestore database. Use the navigation menu to access different admin sections.
      </p>
    </div>
  )
}

export default AdminDashboard