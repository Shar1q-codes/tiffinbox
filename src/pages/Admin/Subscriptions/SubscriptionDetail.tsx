import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getSubscriptionById, 
  Subscription, 
  updateSubscription,
  cancelSubscription,
  pauseSubscription,
  resumeSubscription,
  getSubscriptionPaymentHistory
} from '../../../services/subscriptionService';
import { PaymentHistoryItem, formatPrice } from '../../../services/paymentService';

/**
 * SubscriptionDetail component displays detailed information about a subscription
 * and provides actions to manage it (pause, resume, cancel)
 */
const SubscriptionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'cancel' | 'pause' | 'resume'>('cancel');
  const [pauseUntil, setPauseUntil] = useState<string>(
    new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Styles
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#2b2b2b',
    margin: '0'
  };

  const backButtonStyle = {
    background: 'transparent',
    color: '#d62828',
    border: '1px solid #d62828',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    marginRight: '1rem'
  };

  const cardStyle = {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem'
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2b2b2b',
    marginTop: '0',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #eaeaea'
  };

  const labelStyle = {
    fontWeight: '500',
    color: '#666',
    marginBottom: '0.25rem'
  };

  const valueStyle = {
    fontWeight: '600',
    color: '#2b2b2b',
    marginBottom: '1rem'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    border: 'none'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: '#d62828',
    color: '#ffffff'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: '#f8d7d7',
    color: '#d62828',
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: '#ff4a4a',
    color: '#ffffff'
  };

  const warningButtonStyle = {
    ...buttonStyle,
    background: '#ffc107',
    color: '#212529'
  };

  const successButtonStyle = {
    ...buttonStyle,
    background: '#28a745',
    color: '#ffffff'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '1rem'
  };

  const thStyle = {
    padding: '0.75rem',
    textAlign: 'left' as const,
    borderBottom: '1px solid #eaeaea',
    color: '#666'
  };

  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #eaeaea'
  };

  const modalBackdropStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    marginBottom: '1rem'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical' as const
  };

  const alertStyle = (type: 'success' | 'error') => ({
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    color: type === 'success' ? '#155724' : '#721c24',
  });

  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    const baseStyle = {
      padding: '0.25rem 0.5rem',
      borderRadius: '100px',
      fontSize: '0.8rem',
      fontWeight: '500',
      display: 'inline-block'
    };

    const statusColors: any = {
      active: { bg: '#e1fae1', color: '#1a8917' },
      paused: { bg: '#f9f3d9', color: '#c5a60c' },
      canceled: { bg: '#ffefef', color: '#d12828' },
      expired: { bg: '#f2f2f2', color: '#666666' },
      pending: { bg: '#e7f1ff', color: '#1a56db' }
    };

    const statusColor = statusColors[status] || statusColors.pending;

    return {
      ...baseStyle,
      backgroundColor: statusColor.bg,
      color: statusColor.color
    };
  };

  // Format date to readable string
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      // Handle Firestore Timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setErrorMessage('');
        
        const subscriptionData = await getSubscriptionById(id);
        setSubscription(subscriptionData);
        
        if (subscriptionData) {
          const payments = await getSubscriptionPaymentHistory(id);
          setPaymentHistory(payments);
        }
      } catch (error) {
        console.error('Error fetching subscription details:', error);
        setErrorMessage('Failed to load subscription details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [id]);

  // Handle modal open for different actions
  const handleActionModal = (type: 'cancel' | 'pause' | 'resume') => {
    setModalType(type);
    setIsModalOpen(true);
    setErrorMessage('');
  };

  // Handle cancel subscription
  const handleCancelSubscription = async () => {
    if (!id) return;

    try {
      await cancelSubscription(id, cancellationReason);
      
      // Update local state to reflect the change
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'canceled'
        });
      }
      
      setIsModalOpen(false);
      setCancellationReason('');
      setSuccessMessage('Subscription has been canceled successfully.');
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setErrorMessage('Failed to cancel subscription. Please try again.');
    }
  };

  // Handle pause subscription
  const handlePauseSubscription = async () => {
    if (!id) return;

    try {
      await pauseSubscription(id, new Date(pauseUntil));
      
      // Update local state to reflect the change
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'paused'
        });
      }
      
      setIsModalOpen(false);
      setSuccessMessage('Subscription has been paused successfully.');
    } catch (error) {
      console.error('Error pausing subscription:', error);
      setErrorMessage('Failed to pause subscription. Please try again.');
    }
  };

  // Handle resume subscription
  const handleResumeSubscription = async () => {
    if (!id) return;

    try {
      await resumeSubscription(id);
      
      // Update local state to reflect the change
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'active'
        });
      }
      
      setIsModalOpen(false);
      setSuccessMessage('Subscription has been resumed successfully.');
    } catch (error) {
      console.error('Error resuming subscription:', error);
      setErrorMessage('Failed to resume subscription. Please try again.');
    }
  };

  // Render the modal based on action type
  const renderModal = () => {
    if (!isModalOpen) return null;

    let title = '';
    let content = null;
    let action = () => {};

    switch (modalType) {
      case 'cancel':
        title = 'Cancel Subscription';
        content = (
          <>
            <p>Are you sure you want to cancel this subscription? This action cannot be undone.</p>
            <label htmlFor="cancellationReason" style={labelStyle}>Reason for cancellation:</label>
            <textarea 
              id="cancellationReason" 
              style={textareaStyle}
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Please provide a reason for cancellation..."
            />
          </>
        );
        action = handleCancelSubscription;
        break;

      case 'pause':
        title = 'Pause Subscription';
        content = (
          <>
            <p>The subscription will be temporarily paused until the selected date.</p>
            <label htmlFor="pauseUntil" style={labelStyle}>Pause until:</label>
            <input 
              id="pauseUntil" 
              type="date" 
              style={inputStyle}
              value={pauseUntil}
              onChange={(e) => setPauseUntil(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </>
        );
        action = handlePauseSubscription;
        break;

      case 'resume':
        title = 'Resume Subscription';
        content = (
          <p>Are you sure you want to resume this subscription? The customer will be billed on the next billing cycle.</p>
        );
        action = handleResumeSubscription;
        break;

      default:
        break;
    }

    return (
      <div style={modalBackdropStyle} onClick={() => setIsModalOpen(false)}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ ...titleStyle, marginBottom: '1rem' }}>{title}</h2>
          {content}

          {errorMessage && (
            <div style={alertStyle('error')}>
              {errorMessage}
            </div>
          )}

          <div style={buttonGroupStyle}>
            <button 
              style={secondaryButtonStyle} 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              style={
                modalType === 'cancel' 
                  ? dangerButtonStyle 
                  : modalType === 'pause' 
                    ? warningButtonStyle 
                    : successButtonStyle
              } 
              onClick={action}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle navigation back to subscriptions list
  const handleBack = () => {
    navigate('/admin/subscriptions');
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading subscription details...
        </div>
      </div>
    );
  }

  if (!subscription && !loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Subscription not found</h2>
          <p>The subscription you're looking for doesn't exist or has been removed.</p>
          <button style={primaryButtonStyle} onClick={handleBack}>
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          Subscription Details
          {subscription && (
            <span style={{ 
              ...getStatusBadgeStyle(subscription.status),
              marginLeft: '1rem', 
              fontSize: '0.9rem',
              verticalAlign: 'middle'
            }}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          )}
        </h1>
        <button style={backButtonStyle} onClick={handleBack}>
          Back to Subscriptions
        </button>
      </div>

      {successMessage && (
        <div style={alertStyle('success')}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={alertStyle('error')}>
          {errorMessage}
        </div>
      )}

      {subscription && (
        <>
          <div style={gridContainerStyle}>
            {/* Customer Information */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}>Customer Information</h2>
              
              <div>
                <p style={labelStyle}>Name</p>
                <p style={valueStyle}>{subscription.customerName}</p>
              </div>
              
              <div>
                <p style={labelStyle}>Email</p>
                <p style={valueStyle}>{subscription.customerEmail}</p>
              </div>
              
              {subscription.customerPhone && (
                <div>
                  <p style={labelStyle}>Phone</p>
                  <p style={valueStyle}>{subscription.customerPhone}</p>
                </div>
              )}
              
              <div>
                <p style={labelStyle}>Delivery Address</p>
                <p style={valueStyle}>{subscription.deliveryAddress}</p>
              </div>
            </div>
            
            {/* Subscription Details */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}>Subscription Details</h2>
              
              <div>
                <p style={labelStyle}>Plan Type</p>
                <p style={valueStyle}>
                  {subscription.planType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </p>
              </div>
              
              <div>
                <p style={labelStyle}>Frequency</p>
                <p style={valueStyle}>
                  {subscription.frequency.charAt(0).toUpperCase() + subscription.frequency.slice(1)}
                </p>
              </div>
              
              <div>
                <p style={labelStyle}>Student Discount</p>
                <p style={valueStyle}>{subscription.studentDiscount ? 'Yes' : 'No'}</p>
              </div>
              
              <div>
                <p style={labelStyle}>Amount</p>
                <p style={valueStyle}>
                  {formatPrice(subscription.amount, subscription.currency)}
                </p>
              </div>
              
              <div>
                <p style={labelStyle}>Delivery Days</p>
                <p style={valueStyle}>
                  {subscription.deliveryDays && subscription.deliveryDays.length > 0
                    ? subscription.deliveryDays
                        .map(day => day.charAt(0).toUpperCase() + day.slice(1))
                        .join(', ')
                    : 'No delivery days specified'
                  }
                </p>
              </div>
            </div>
            
            {/* Subscription Dates */}
            <div style={cardStyle}>
              <h2 style={sectionTitleStyle}>Important Dates</h2>
              
              <div>
                <p style={labelStyle}>Start Date</p>
                <p style={valueStyle}>{formatDate(subscription.startDate)}</p>
              </div>
              
              {subscription.endDate && (
                <div>
                  <p style={labelStyle}>End Date</p>
                  <p style={valueStyle}>{formatDate(subscription.endDate)}</p>
                </div>
              )}
              
              {subscription.nextDeliveryDate && (
                <div>
                  <p style={labelStyle}>Next Delivery</p>
                  <p style={valueStyle}>{formatDate(subscription.nextDeliveryDate)}</p>
                </div>
              )}
              
              {subscription.nextBillingDate && (
                <div>
                  <p style={labelStyle}>Next Billing</p>
                  <p style={valueStyle}>{formatDate(subscription.nextBillingDate)}</p>
                </div>
              )}
              
              <div>
                <p style={labelStyle}>Created At</p>
                <p style={valueStyle}>{formatDate(subscription.createdAt)}</p>
              </div>
              
              <div>
                <p style={labelStyle}>Last Updated</p>
                <p style={valueStyle}>{formatDate(subscription.updatedAt)}</p>
              </div>
            </div>
          </div>
          
          {/* Actions Card */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Subscription Management</h2>
            <div style={buttonGroupStyle}>
              {subscription.status === 'active' && (
                <>
                  <button 
                    style={warningButtonStyle}
                    onClick={() => handleActionModal('pause')}
                  >
                    Pause Subscription
                  </button>
                  <button 
                    style={dangerButtonStyle}
                    onClick={() => handleActionModal('cancel')}
                  >
                    Cancel Subscription
                  </button>
                </>
              )}
              
              {subscription.status === 'paused' && (
                <button 
                  style={successButtonStyle}
                  onClick={() => handleActionModal('resume')}
                >
                  Resume Subscription
                </button>
              )}
              
              {subscription.status === 'canceled' && (
                <div>
                  <p>This subscription has been canceled and cannot be reactivated.</p>
                  <p>Create a new subscription for this customer if needed.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Payment History */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Payment History</h2>
            
            {paymentHistory.length === 0 ? (
              <p>No payment history available for this subscription.</p>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Payment Method</th>
                    <th style={thStyle}>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id}>
                      <td style={tdStyle}>{formatDate(payment.created)}</td>
                      <td style={tdStyle}>{formatPrice(payment.amount, payment.currency)}</td>
                      <td style={tdStyle}>
                        <span style={getStatusBadgeStyle(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td style={tdStyle}>{payment.paymentMethod}</td>
                      <td style={tdStyle}>
                        {payment.receiptUrl ? (
                          <a 
                            href={payment.receiptUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#d62828' }}
                          >
                            View Receipt
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      
      {renderModal()}
    </div>
  );
};

export default SubscriptionDetail;