import React, { useState, useEffect, useMemo } from 'react'
import { 
  getDeliveryStatuses, 
  updateDeliveryStatus,
  DeliveryStatus 
} from '../../../services/firestore'
import styles from './DeliveryTable.module.css'

type SortField = 'deliverySlot' | 'status' | 'lastUpdated'
type SortOrder = 'asc' | 'desc'

const DeliveryTable: React.FC = () => {
  const [orders, setOrders] = useState<DeliveryStatus[]>([])
  const [partnerFilter, setPartnerFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('lastUpdated')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [isLoading, setIsLoading] = useState(true)

  // Delivery partners list
  const deliveryPartners = [
    { id: 'unassigned', name: 'Unassigned' },
    { id: 'ravi', name: 'Ravi Kumar' },
    { id: 'anjali', name: 'Anjali Sharma' },
    { id: 'faiz', name: 'Faiz Ahmed' },
    { id: 'priya', name: 'Priya Patel' }
  ]

  // Status options
  const statusOptions = [
    { value: 'prepared', label: 'Prepared', icon: '🍽️' },
    { value: 'pickedUp', label: 'Picked Up', icon: '📦' },
    { value: 'onTheWay', label: 'On the Way', icon: '🚚' },
    { value: 'delivered', label: 'Delivered', icon: '✅' }
  ]

  // Load delivery statuses from Firestore
  useEffect(() => {
    loadDeliveryStatuses()
  }, [])

  const loadDeliveryStatuses = async () => {
    try {
      setIsLoading(true)
      const deliveryData = await getDeliveryStatuses()
      setOrders(deliveryData)
    } catch (error) {
      console.error('Error loading delivery statuses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesPartner = partnerFilter === 'all' || order.assignedPartner === partnerFilter
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
      return matchesPartner && matchesStatus
    })

    // Sort orders
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'deliverySlot':
          aValue = a.estimatedArrival
          bValue = b.estimatedArrival
          break
        case 'status':
          const statusOrder = { 'prepared': 1, 'pickedUp': 2, 'onTheWay': 3, 'delivered': 4 }
          aValue = statusOrder[a.status]
          bValue = statusOrder[b.status]
          break
        case 'lastUpdated':
          aValue = a.lastUpdated.toMillis()
          bValue = b.lastUpdated.toMillis()
          break
        default:
          aValue = a.lastUpdated.toMillis()
          bValue = b.lastUpdated.toMillis()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [orders, partnerFilter, statusFilter, sortField, sortOrder])

  // Statistics
  const stats = useMemo(() => {
    const total = orders.length
    const delivered = orders.filter(o => o.status === 'delivered').length
    const pending = orders.filter(o => o.status !== 'delivered').length
    const unassigned = orders.filter(o => o.assignedPartner === 'unassigned').length

    return { total, delivered, pending, unassigned }
  }, [orders])

  const handlePartnerChange = async (orderId: string, partnerId: string) => {
    try {
      await updateDeliveryStatus(orderId, { assignedPartner: partnerId })
      await loadDeliveryStatuses()
    } catch (error) {
      console.error('Error updating partner assignment:', error)
    }
  }

  const handleStatusChange = async (orderId: string, status: DeliveryStatus['status']) => {
    try {
      await updateDeliveryStatus(orderId, { status })
      await loadDeliveryStatuses()
    } catch (error) {
      console.error('Error updating delivery status:', error)
    }
  }

  const handleView = (orderId: string) => {
    console.log('View order:', orderId)
    // In a real app, this would open a detailed view modal or navigate to order details
    alert(`View order functionality would be implemented here for order: ${orderId}`)
  }

  const handleRemove = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    if (order && window.confirm(`Are you sure you want to remove order ${order.orderId}?`)) {
      // In a real app, you might want to delete or archive the order
      console.log('Remove order:', orderId)
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('-') as [SortField, SortOrder]
    setSortField(field)
    setSortOrder(order)
  }

  const getPartnerName = (partnerId: string) => {
    const partner = deliveryPartners.find(p => p.id === partnerId)
    return partner?.name || 'Unassigned'
  }

  const getStatusInfo = (status: DeliveryStatus['status']) => {
    const statusInfo = statusOptions.find(s => s.value === status)
    return statusInfo || { value: status, label: status, icon: '❓' }
  }

  if (isLoading) {
    return (
      <div className={styles.deliveryTable}>
        <div className={styles.header}>
          <h1 className={styles.title}>Delivery Management 🚚</h1>
          <p className={styles.subtitle}>
            Loading delivery orders...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.deliveryTable}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Delivery Management 🚚</h1>
        <p className={styles.subtitle}>
          Manage today's delivery assignments and track order status
        </p>
      </div>

      {/* Summary Cards */}
      <div className={styles.summarySection}>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>📦</span>
            <div className={styles.summaryValue}>{stats.total}</div>
            <div className={styles.summaryLabel}>Total Orders Today</div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>✅</span>
            <div className={styles.summaryValue}>{stats.delivered}</div>
            <div className={styles.summaryLabel}>Delivered</div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>⏳</span>
            <div className={styles.summaryValue}>{stats.pending}</div>
            <div className={styles.summaryLabel}>Pending</div>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryIcon}>❓</span>
            <div className={styles.summaryValue}>{stats.unassigned}</div>
            <div className={styles.summaryLabel}>Unassigned</div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className={styles.controlsSection}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlGroup}>
            <label htmlFor="partnerFilter" className={styles.controlLabel}>
              Filter by Partner
            </label>
            <select
              id="partnerFilter"
              value={partnerFilter}
              onChange={(e) => setPartnerFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Partners</option>
              {deliveryPartners.map(partner => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="statusFilter" className={styles.controlLabel}>
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
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
              <option value="lastUpdated-desc">Last Updated (Newest)</option>
              <option value="lastUpdated-asc">Last Updated (Oldest)</option>
              <option value="deliverySlot-asc">Delivery Slot (Early)</option>
              <option value="deliverySlot-desc">Delivery Slot (Late)</option>
              <option value="status-asc">Status (Prepared First)</option>
              <option value="status-desc">Status (Delivered First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            <span className={styles.tableIcon}>📋</span>
            Today's Deliveries
          </h2>
          <span className={styles.resultCount}>
            Showing {filteredAndSortedOrders.length} of {orders.length} orders
          </span>
        </div>

        {filteredAndSortedOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <div className={styles.emptyText}>No delivery orders found</div>
            <div className={styles.emptySubtext}>
              {partnerFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your filter criteria'
                : 'No delivery orders have been placed today'
              }
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.tableHeadCell}>Order ID</th>
                  <th className={styles.tableHeadCell}>Customer Name</th>
                  <th className={styles.tableHeadCell}>Delivery Slot</th>
                  <th className={styles.tableHeadCell}>Location</th>
                  <th className={styles.tableHeadCell}>Assigned Partner</th>
                  <th className={styles.tableHeadCell}>Status</th>
                  <th className={styles.tableHeadCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredAndSortedOrders.map((order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.orderId}>#{order.orderId}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.customerName}>{order.customerName}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.deliverySlot}>{order.estimatedArrival}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.mealType}>
                        <span className={styles.mealIcon}>📍</span>
                        {order.currentLocation}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={order.assignedPartner}
                        onChange={(e) => handlePartnerChange(order.id!, e.target.value)}
                        className={`${styles.partnerSelect} ${order.assignedPartner === 'unassigned' ? styles.unassigned : styles.assigned}`}
                      >
                        {deliveryPartners.map(partner => (
                          <option key={partner.id} value={partner.id}>
                            {partner.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id!, e.target.value as DeliveryStatus['status'])}
                        className={`${styles.statusSelect} ${styles[order.status]}`}
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.icon} {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionsCell}>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => handleView(order.orderId)}
                          aria-label={`View order ${order.orderId}`}
                        >
                          🔍
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.removeButton}`}
                          onClick={() => handleRemove(order.id!)}
                          aria-label={`Remove order ${order.orderId}`}
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
              {filteredAndSortedOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                return (
                  <div key={order.id} className={styles.deliveryCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardOrderInfo}>
                        <div className={styles.cardOrderId}>#{order.orderId}</div>
                        <div className={styles.cardCustomerName}>{order.customerName}</div>
                      </div>
                      <div className={styles.cardActions}>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => handleView(order.orderId)}
                          aria-label={`View order ${order.orderId}`}
                        >
                          🔍
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.removeButton}`}
                          onClick={() => handleRemove(order.id!)}
                          aria-label={`Remove order ${order.orderId}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className={styles.cardDetails}>
                      <div className={styles.cardDetail}>
                        <span className={styles.cardDetailLabel}>Delivery Time</span>
                        <span className={styles.cardDetailValue}>{order.estimatedArrival}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <span className={styles.cardDetailLabel}>Location</span>
                        <span className={styles.cardDetailValue}>{order.currentLocation}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <span className={styles.cardDetailLabel}>Current Status</span>
                        <span className={styles.cardDetailValue}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                      </div>
                      <div className={styles.cardDetail}>
                        <span className={styles.cardDetailLabel}>Assigned Partner</span>
                        <span className={styles.cardDetailValue}>
                          {getPartnerName(order.assignedPartner)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.cardControls}>
                      <div className={styles.cardControlGroup}>
                        <span className={styles.cardControlLabel}>Assign Partner</span>
                        <select
                          value={order.assignedPartner}
                          onChange={(e) => handlePartnerChange(order.id!, e.target.value)}
                          className={styles.cardSelect}
                        >
                          {deliveryPartners.map(partner => (
                            <option key={partner.id} value={partner.id}>
                              {partner.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className={styles.cardControlGroup}>
                        <span className={styles.cardControlLabel}>Update Status</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id!, e.target.value as DeliveryStatus['status'])}
                          className={styles.cardSelect}
                        >
                          {statusOptions.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.icon} {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DeliveryTable