import React from 'react'

const AdminDashboard: React.FC = () => {
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
            127
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
            Active Customers
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            89
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
            Deliveries
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d62828', margin: '0' }}>
            45
          </p>
        </div>
      </div>
      
      <p style={{ 
        fontSize: '1rem', 
        color: '#2b2b2b', 
        opacity: '0.8',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '1.6'
      }}>
        This is a placeholder dashboard. Use the navigation menu to access different admin sections like Menu Editor, Customers, and Delivery Assignments.
      </p>
    </div>
  )
}

export default AdminDashboard