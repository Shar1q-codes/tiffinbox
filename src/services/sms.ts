// SMS Service with multiple provider options
// Choose the provider that works best for your region and budget

interface SMSProvider {
  name: string
  sendSMS: (phone: string, message: string) => Promise<boolean>
  cost: string
  features: string[]
}

// 1. TWILIO (Most Popular - Global)
class TwilioSMS implements SMSProvider {
  name = 'Twilio'
  cost = '$0.0075 per SMS'
  features = ['Global coverage', 'High reliability', 'Delivery reports', 'Two-way SMS']

  private accountSid = process.env.VITE_TWILIO_ACCOUNT_SID || ''
  private authToken = process.env.VITE_TWILIO_AUTH_TOKEN || ''
  private fromNumber = process.env.VITE_TWILIO_PHONE_NUMBER || ''

  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      // Note: In production, this should be called from your backend
      // Frontend SMS sending is not secure for API keys
      
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'twilio',
          to: phone,
          message: message
        })
      })

      return response.ok
    } catch (error) {
      console.error('Twilio SMS failed:', error)
      return false
    }
  }
}

// 2. TEXTLOCAL (UK Focused - Very Cheap)
class TextLocalSMS implements SMSProvider {
  name = 'TextLocal'
  cost = '£0.02-0.04 per SMS'
  features = ['UK focused', 'Very cheap', 'Bulk SMS', 'Unicode support']

  private apiKey = process.env.VITE_TEXTLOCAL_API_KEY || ''
  private sender = process.env.VITE_TEXTLOCAL_SENDER || 'TiffinBox'

  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'textlocal',
          to: phone,
          message: message
        })
      })

      return response.ok
    } catch (error) {
      console.error('TextLocal SMS failed:', error)
      return false
    }
  }
}

// 3. CLICKSEND (Global - Good Pricing)
class ClickSendSMS implements SMSProvider {
  name = 'ClickSend'
  cost = '$0.05-0.15 per SMS'
  features = ['Global coverage', 'Good pricing', 'Email to SMS', 'Voice messages']

  private username = process.env.VITE_CLICKSEND_USERNAME || ''
  private apiKey = process.env.VITE_CLICKSEND_API_KEY || ''

  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'clicksend',
          to: phone,
          message: message
        })
      })

      return response.ok
    } catch (error) {
      console.error('ClickSend SMS failed:', error)
      return false
    }
  }
}

// 4. MSG91 (India Focused - Very Cheap)
class MSG91SMS implements SMSProvider {
  name = 'MSG91'
  cost = '₹0.15-0.50 per SMS'
  features = ['India focused', 'Very cheap', 'OTP services', 'WhatsApp integration']

  private authKey = process.env.VITE_MSG91_AUTH_KEY || ''
  private senderId = process.env.VITE_MSG91_SENDER_ID || 'TIFFIN'

  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'msg91',
          to: phone,
          message: message
        })
      })

      return response.ok
    } catch (error) {
      console.error('MSG91 SMS failed:', error)
      return false
    }
  }
}

// SMS Service Manager
class SMSService {
  private providers: SMSProvider[]
  private currentProvider: SMSProvider

  constructor() {
    this.providers = [
      new TwilioSMS(),
      new TextLocalSMS(),
      new ClickSendSMS(),
      new MSG91SMS()
    ]
    
    // Default to Twilio, but you can change this
    this.currentProvider = this.providers[0]
  }

  setProvider(providerName: string) {
    const provider = this.providers.find(p => p.name.toLowerCase() === providerName.toLowerCase())
    if (provider) {
      this.currentProvider = provider
    }
  }

  async sendSMS(phone: string, message: string): Promise<boolean> {
    // Format phone number (remove spaces, add country code if needed)
    const formattedPhone = this.formatPhoneNumber(phone)
    
    try {
      return await this.currentProvider.sendSMS(formattedPhone, message)
    } catch (error) {
      console.error(`SMS failed with ${this.currentProvider.name}:`, error)
      return false
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '')
    
    // Add UK country code if needed (assuming UK numbers)
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      cleaned = '44' + cleaned.substring(1)
    } else if (cleaned.length === 11 && cleaned.startsWith('07')) {
      cleaned = '44' + cleaned.substring(1)
    }
    
    return '+' + cleaned
  }

  getProviderInfo(): { name: string; cost: string; features: string[] } {
    return {
      name: this.currentProvider.name,
      cost: this.currentProvider.cost,
      features: this.currentProvider.features
    }
  }

  getAllProviders(): { name: string; cost: string; features: string[] }[] {
    return this.providers.map(p => ({
      name: p.name,
      cost: p.cost,
      features: p.features
    }))
  }
}

// Export singleton instance
export const smsService = new SMSService()

// Convenience functions for different message types
export const sendSubscriptionSMS = async (phone: string, customerName: string, trackingCode: string): Promise<boolean> => {
  const message = `Hi ${customerName}! 🍱 Your TiffinBox subscription is confirmed! 

📱 Tracking Code: ${trackingCode}
🔗 Track: https://tiffinbox.com/tracking

We'll send updates as your meal is prepared and delivered. 

Need help? Call +44 7XXX XXXXXX

- TiffinBox Team`

  return await smsService.sendSMS(phone, message)
}

export const sendDeliveryStatusSMS = async (
  phone: string, 
  customerName: string, 
  status: string, 
  eta: string,
  trackingCode: string
): Promise<boolean> => {
  const statusMessages = {
    prepared: `Hi ${customerName}! 👨‍🍳 Your tiffin is being prepared with love!`,
    pickedUp: `Hi ${customerName}! 📦 Your tiffin has been picked up and is on its way!`,
    onTheWay: `Hi ${customerName}! 🚚 Your delivery partner is on the way! ETA: ${eta}`,
    delivered: `Hi ${customerName}! 🍱 Your tiffin has been delivered! Enjoy your meal!`
  }

  const message = `${statusMessages[status as keyof typeof statusMessages] || 'Delivery update!'}

📱 Track: ${trackingCode}
🔗 https://tiffinbox.com/tracking

- TiffinBox`

  return await smsService.sendSMS(phone, message)
}

export const sendTestSMS = async (phone: string): Promise<boolean> => {
  const message = `🧪 Test SMS from TiffinBox! 

This confirms SMS integration is working correctly.

If you received this, SMS notifications are ready! 🎉

- TiffinBox Team`

  return await smsService.sendSMS(phone, message)
}