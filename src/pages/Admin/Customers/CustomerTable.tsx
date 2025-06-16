import React, { useState, useEffect, useMemo } from 'react'
import { 
  getCustomers, 
  deleteCustomer,
  updateCustomer,
  Customer 
} from '../../../services/firestore'
import styles from './CustomerTable.module.css'

// Extended interface to include status for demo purposes
interface CustomerWithStatus extends Customer {
  status: 'active' | 'cancelled'
}

type SortField = 'name' | 'deliverySlot' | 'orderDate'
type SortOrder = 'asc' | 'desc'

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerWithStatus[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'cancelled'>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [isLoading, setIsLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<CustomerWithStatus | null>(null)

  // Load customers from Firestore
  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setIsLoading(true)
      const customerData = await getCustomers()
      // Add status field for demo purposes (in real app this would be in Firestore)
      const customersWithStatus: CustomerWithStatus[] = customerData.map(customer => ({
        ...customer,
        status: Math.random() > 0.2 ? 'active' : 'cancelled' as 'active' | 'cancelled'
      }))
      setCustomers(customersWithStatus)
    } catch (error) {
      console.error('Error loading customers:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
        case 'orderDate':
          aValue = a.orderDate.toMillis()
          bValue = b.orderDate.toMillis()
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
    const vegCustomers = customers.filter(c => c.planType === 'veg').length

    return { total, active, cancelled, vegCustomers }
  }, [customers])

  const handleEdit = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    if (customer) {
      setEditingCustomer(customer)
      setShowEditModal(true)
    }
  }

  const handleDelete = async (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    if (customer && window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        await deleteCustomer(customerId)
        await loadCustomers()
      } catch (error) {
        console.error('Error deleting customer:', error)
      }
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('-') as [SortField, SortOrder]
    setSortField(field)
    setSortOrder(order)
  }

  const handleUpdateCustomer = async (updatedCustomer: CustomerWithStatus) => {
    try {
      if (!updatedCustomer.id) return
      
      // Extract fields that can be updated
      const { name, email, phone, address, deliverySlot, planType } = updatedCustomer
      
      await updateCustomer(updatedCustomer.id, {
        name, email, phone, address, deliverySlot, planType
      })
      
      setShowEditModal(false)
      setEditingCustomer(null)
      await loadCustomers()
      
      alert('✅ Customer updated successfully!')
    } catch (error) {
      console.error('Error updating customer:', error)
      alert('❌ Failed to update customer. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (editingCustomer) {
      setEditingCustomer({
        ...editingCustomer,
        [name]: value
      })
    }
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setEditingCustomer(null)
  }

  if (isLoading) {
    return (
      <div className={styles.customerTable}>
        <div className={styles.header}>
          <h1 className={styles.title}>Customer Management 👥</h1>
          <p className={styles.subtitle}>
            Loading customers...
          </p>
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
              <option value="orderDate-desc">Order Date (Newest)</option>
              <option value="orderDate-asc">Order Date (Oldest)</option>
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
                  <th className={styles.tableHeadCell}>Plan Type</th>
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
                          {customer.planType === 'veg' ? '🥬' : '🍗'}
                        </span>
                        {customer.planType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
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
                          onClick={() => handleEdit(customer.id!)}
                          aria-label={`Edit ${customer.name}`}
                        >
                          🖊️
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => handleDelete(customer.id!)}
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
                        onClick={() => handleEdit(customer.id!)}
                        aria-label={`Edit ${customer.name}`}
                      >
                        🖊️
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(customer.id!)}
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
                      <span className={styles.cardDetailLabel}>Plan Type</span>
                      <span className={styles.cardDetailValue}>
                        {customer.planType === 'veg' ? '🥬 Vegetarian' : '🍗 Non-Vegetarian'}
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

      {/* Edit Customer Modal */}
      {showEditModal && editingCustomer && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Edit Customer</h3>
              <button 
                className={styles.closeButton}
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editingCustomer.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editingCustomer.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editingCustomer.phone}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="deliverySlot" className={styles.formLabel}>Delivery Slot</label>
                  <select
                    id="deliverySlot"
                    name="deliverySlot"
                    value={editingCustomer.deliverySlot}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="planType" className={styles.formLabel}>Plan Type</label>
                  <select
                    id="planType"
                    name="planType"
                    value={editingCustomer.planType}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="address" className={styles.formLabel}>Delivery Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={editingCustomer.address}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className={styles.saveButton}
                onClick={() => handleUpdateCustomer(editingCustomer)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerTable