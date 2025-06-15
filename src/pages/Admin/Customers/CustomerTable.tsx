import React, { useState, useEffect, useMemo } from 'react'
import styles from './CustomerTable.module.css'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  deliverySlot: string
  subscriptionType: 'veg' | 'non-veg'
  status: 'active' | 'cancelled'
  joinDate: string
}

type SortField = 'name' | 'deliverySlot' | 'joinDate'
type SortOrder = 'asc' | 'desc'

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'cancelled'>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with dummy data
  useEffect(() => {
    const dummyCustomers: Customer[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        deliverySlot: '7:00 PM',
        subscriptionType: 'veg',
        status: 'active',
        joinDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        phone: '+91 87654 32109',
        deliverySlot: '8:00 PM',
        subscriptionType: 'non-veg',
        status: 'active',
        joinDate: '2024-01-20'
      },
      {
        id: '3',
        name: 'Anjali Patel',
        email: 'anjali.patel@email.com',
        phone: '+91 76543 21098',
        deliverySlot: '6:00 PM',
        subscriptionType: 'veg',
        status: 'cancelled',
        joinDate: '2024-01-10'
      },
      {
        id: '4',
        name: 'Vikash Singh',
        email: 'vikash.singh@email.com',
        phone: '+91 65432 10987',
        deliverySlot: '7:30 PM',
        subscriptionType: 'non-veg',
        status: 'active',
        joinDate: '2024-01-25'
      },
      {
        id: '5',
        name: 'Meera Reddy',
        email: 'meera.reddy@email.com',
        phone: '+91 54321 09876',
        deliverySlot: '8:30 PM',
        subscriptionType: 'veg',
        status: 'active',
        joinDate: '2024-01-18'
      },
      {
        id: '6',
        name: 'Arjun Gupta',
        email: 'arjun.gupta@email.com',
        phone: '+91 43210 98765',
        deliverySlot: '9:00 PM',
        subscriptionType: 'non-veg',
        status: 'cancelled',
        joinDate: '2024-01-12'
      }
    ]

    // Simulate loading delay
    setTimeout(() => {
      setCustomers(dummyCustomers)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    // Sort customers
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'deliverySlot':
          aValue = a.deliverySlot
          bValue = b.deliverySlot
          break
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime()
          bValue = new Date(b.joinDate).getTime()
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [customers, searchTerm, statusFilter, sortField, sortOrder])

  // Statistics
  const stats = useMemo(() => {
    const total = customers.length
    const active = customers.filter(c => c.status === 'active').length
    const cancelled = customers.filter(c => c.status === 'cancelled').length
    const vegCustomers = customers.filter(c => c.subscriptionType === 'veg').length

    return { total, active, cancelled, vegCustomers }
  }, [customers])

  const handleEdit = (customerId: string) => {
    console.log('Edit customer:', customerId)
    // In a real app, this would open an edit modal or navigate to edit page
    alert(`Edit customer functionality would be implemented here for customer ID: ${customerId}`)
  }

  const handleDelete = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    if (customer && window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      setCustomers(prev => prev.filter(c => c.id !== customerId))
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('-') as [SortField, SortOrder]
    setSortField(field)
    setSortOrder(order)
  }

  if (isLoading) {
    return (
      <div className={styles.customerTable}>
        <div className={styles.header}>
          <h1 className={styles.title}>Customer Management 👥</h1>
          <p className={styles.subtitle}>
            Manage all subscribed customers and their details
          </p>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.loadingState}>
            <span className={styles.loadingIcon}>⏳</span>
            <div className={styles.loadingText}>Loading customers...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.customerTable}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Management 👥</h1>
        <p className={styles.subtitle}>
          Manage all subscribed customers and their details
        </p>
      </div>

      {/* Controls Section */}
      <div className={styles.controlsSection}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlGroup}>
            <label htmlFor="search" className={styles.controlLabel}>
              Search Customers
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              placeholder="Search by name, email, or phone..."
            />
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="statusFilter" className={styles.controlLabel}>
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className={styles.filterSelect}
            >
              <option value="all">All Customers</option>
              <option value="active">Active Only</option>
              <option value="cancelled">Cancelled Only</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="sort" className={styles.controlLabel}>
              Sort By
            </label>
            <select
              id="sort"
              value={`${sortField}-${sortOrder}`}
              onChange={handleSortChange}
              className={styles.sortSelect}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="deliverySlot-asc">Delivery Slot (Early)</option>
              <option value="deliverySlot-desc">Delivery Slot (Late)</option>
              <option value="joinDate-desc">Join Date (Newest)</option>
              <option value="joinDate-asc">Join Date (Oldest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsSection}>
        <div className={styles.statsCards}>
          <div className={styles.statsCard}>
            <span className={styles.statsIcon}>👥</span>
            <div className={styles.statsValue}>{stats.total}</div>
            <div className={styles.statsLabel}>Total Customers</div>
          </div>
          <div className={styles.statsCard}>
            <span className={styles.statsIcon}>✅</span>
            <div className={styles.statsValue}>{stats.active}</div>
            <div className={styles.statsLabel}>Active Subscriptions</div>
          </div>
          <div className={styles.statsCard}>
            <span className={styles.statsIcon}>❌</span>
            <div className={styles.statsValue}>{stats.cancelled}</div>
            <div className={styles.statsLabel}>Cancelled</div>
          </div>
          <div className={styles.statsCard}>
            <span className={styles.statsIcon}>🥬</span>
            <div className={styles.statsValue}>{stats.vegCustomers}</div>
            <div className={styles.statsLabel}>Vegetarian</div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            <span className={styles.tableIcon}>📋</span>
            Customer List
          </h2>
          <span className={styles.resultCount}>
            Showing {filteredAndSortedCustomers.length} of {customers.length} customers
          </span>
        </div>

        {filteredAndSortedCustomers.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <div className={styles.emptyText}>No customers found</div>
            <div className={styles.emptySubtext}>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No customers have been added yet'
              }
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.tableHeadCell}>Customer Name</th>
                  <th className={styles.tableHeadCell}>Email</th>
                  <th className={styles.tableHeadCell}>Phone Number</th>
                  <th className={styles.tableHeadCell}>Delivery Slot</th>
                  <th className={styles.tableHeadCell}>Subscription Type</th>
                  <th className={styles.tableHeadCell}>Status</th>
                  <th className={styles.tableHeadCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredAndSortedCustomers.map((customer) => (
                  <tr key={customer.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.customerName}>{customer.name}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.customerEmail}>{customer.email}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.customerPhone}>{customer.phone}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.deliverySlot}>{customer.deliverySlot}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.subscriptionType}>
                        <span className={styles.typeIcon}>
                          {customer.subscriptionType === 'veg' ? '🥬' : '🍗'}
                        </span>
                        {customer.subscriptionType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${styles[customer.status]}`}>
                        <span className={styles.statusIcon}>
                          {customer.status === 'active' ? '✅' : '❌'}
                        </span>
                        {customer.status === 'active' ? 'Active' : 'Cancelled'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionsCell}>
                        <button
                          className={`${styles.actionButton} ${styles.editButton}`}
                          onClick={() => handleEdit(customer.id)}
                          aria-label={`Edit ${customer.name}`}
                        >
                          🖊️
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => handleDelete(customer.id)}
                          aria-label={`Delete ${customer.name}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className={styles.mobileCards}>
              {filteredAndSortedCustomers.map((customer) => (
                <div key={customer.id} className={styles.customerCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardCustomerInfo}>
                      <div className={styles.cardCustomerName}>{customer.name}</div>
                      <div className={styles.cardCustomerEmail}>{customer.email}</div>
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => handleEdit(customer.id)}
                        aria-label={`Edit ${customer.name}`}
                      >
                        🖊️
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(customer.id)}
                        aria-label={`Delete ${customer.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardDetails}>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Phone</span>
                      <span className={styles.cardDetailValue}>{customer.phone}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Delivery Slot</span>
                      <span className={styles.cardDetailValue}>{customer.deliverySlot}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Subscription</span>
                      <span className={styles.cardDetailValue}>
                        {customer.subscriptionType === 'veg' ? '🥬 Vegetarian' : '🍗 Non-Vegetarian'}
                      </span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.cardDetailLabel}>Status</span>
                      <span className={styles.cardDetailValue}>
                        {customer.status === 'active' ? '✅ Active' : '❌ Cancelled'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomerTable