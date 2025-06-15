import React from 'react'
import Hero from './Hero/Hero'
import HowItWorks from './HowItWorks/HowItWorks'
import WhatYouGet from './WhatYouGet/WhatYouGet'
import ChefStory from './ChefStory/ChefStory'
import StudentDiscount from './StudentDiscount/StudentDiscount'
import WhatsAppReviews from './WhatsAppReviews/WhatsAppReviews'
import DeliveryPreview from './DeliveryPreview/DeliveryPreview'
import FinalCTA from './FinalCTA/FinalCTA'
import Footer from './Footer/Footer'

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhatYouGet />
      <ChefStory />
      <StudentDiscount />
      <WhatsAppReviews />
      <DeliveryPreview />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default Home