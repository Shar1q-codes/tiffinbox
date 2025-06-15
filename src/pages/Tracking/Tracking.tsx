import React from 'react'
import DeliverySummaryCard from './DeliverySummaryCard/DeliverySummaryCard'
import DeliveryMap from './DeliveryMap/DeliveryMap'
import DeliveryFooterStatus from './DeliveryFooterStatus/DeliveryFooterStatus'

const Tracking: React.FC = () => {
  return (
    <div>
      <DeliverySummaryCard />
      <DeliveryMap />
      <DeliveryFooterStatus />
    </div>
  )
}

export default Tracking