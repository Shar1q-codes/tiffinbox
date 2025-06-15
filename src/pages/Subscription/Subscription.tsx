import React from 'react'
import SubscriptionForm from './SubscriptionForm/SubscriptionForm'
import PaymentPlaceholder from './PaymentPlaceholder/PaymentPlaceholder'

const Subscription: React.FC = () => {
  return (
    <div>
      <SubscriptionForm />
      <PaymentPlaceholder />
    </div>
  )
}

export default Subscription