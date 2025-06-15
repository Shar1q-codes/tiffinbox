import React, { useState } from 'react'
import { smsService, sendTestSMS } from '../../../services/sms'

const SMSTest: React.FC = () => {
  const [testPhone, setTestPhone] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('twilio')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const providers = smsService.getAllProviders()

  const handleProviderChange = (providerName: string) => {
    setSelectedProvider(providerName)
    smsService.setProvider(providerName)
  }

  const handleTestSMS = async () => {
    if (!testPhone.trim()) {
      setResult('Please enter a phone number')
      return
    }

    setIsLoading(true)
    setResult('')

    try {
      const success = await sendTestSMS(testPhone)
      setResult(success ? 
        '✅ Test SMS sent successfully!' : 
        '❌ Failed to send SMS. Check your provider configuration.'
      )
    } catch (error) {
      setResult(`❌ Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const currentProvider = smsService.getProviderInfo()

  return (
    <div style={{ 
      fontFamily: 'Poppins, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: '#2b2b2b', 
        marginBottom: '2rem' 
      }}>
        SMS Configuration & Testing 📱
      </h1>

      {/* Provider Selection */}
      <div style={{ 
        background: '#fef6e4',
        border: '1px solid rgba(214, 40, 40, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#2b2b2b'
        }}>
          Choose SMS Provider
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {providers.map((provider) => (
            <div
              key={provider.name}
              onClick={() => handleProviderChange(provider.name.toLowerCase())}
              style={{
                background: selectedProvider === provider.name.toLowerCase() ? '#d62828' : '#ffffff',
                color: selectedProvider === provider.name.toLowerCase() ? '#ffffff' : '#2b2b2b',
                border: '2px solid #d62828',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                margin: '0 0 0.5rem 0'
              }}>
                {provider.name}
              </h4>
              <p style={{ 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                margin: '0 0 0.5rem 0',
                opacity: 0.8
              }}>
                {provider.cost}
              </p>
              <ul style={{ 
                fontSize: '0.8rem', 
                margin: '0',
                paddingLeft: '1rem',
                opacity: 0.7
              }}>
                {provider.features.slice(0, 2).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(214, 40, 40, 0.2)',
          borderRadius: '8px',
          padding: '1rem'
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#d62828',
            margin: '0 0 0.5rem 0'
          }}>
            Current: {currentProvider.name}
          </h4>
          <p style={{ 
            fontSize: '0.9rem', 
            margin: '0 0 0.5rem 0',
            color: '#2b2b2b'
          }}>
            Cost: {currentProvider.cost}
          </p>
          <p style={{ 
            fontSize: '0.8rem', 
            margin: '0',
            color: '#2b2b2b',
            opacity: 0.7
          }}>
            Features: {currentProvider.features.join(', ')}
          </p>
        </div>
      </div>

      {/* Test SMS */}
      <div style={{ 
        background: '#ffffff',
        border: '1px solid rgba(214, 40, 40, 0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#2b2b2b'
        }}>
          Test SMS
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#2b2b2b'
          }}>
            Phone Number (with country code)
          </label>
          <input
            type="tel"
            value={testPhone}
            onChange={(e) => setTestPhone(e.target.value)}
            placeholder="+44 7XXX XXXXXX"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #f5ebe0',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Poppins, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleTestSMS}
          disabled={isLoading || !testPhone.trim()}
          style={{
            background: isLoading || !testPhone.trim() ? '#cccccc' : '#d62828',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isLoading || !testPhone.trim() ? 'not-allowed' : 'pointer',
            fontFamily: 'Poppins, sans-serif',
            width: '100%'
          }}
        >
          {isLoading ? 'Sending...' : 'Send Test SMS'}
        </button>

        {result && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: result.includes('✅') ? '#e8f5e8' : '#fef2f2',
            border: `1px solid ${result.includes('✅') ? '#25d366' : '#dc2626'}`,
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {result}
          </div>
        )}
      </div>

      {/* Setup Instructions */}
      <div style={{ 
        background: '#f0f9ff',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#2b2b2b'
        }}>
          Setup Instructions
        </h3>
        
        <ol style={{ 
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: '#2b2b2b',
          paddingLeft: '1.5rem'
        }}>
          <li>Choose your preferred SMS provider above</li>
          <li>Sign up for an account with that provider</li>
          <li>Get your API credentials from their dashboard</li>
          <li>Add the credentials to your .env file</li>
          <li>Test SMS functionality using the form above</li>
          <li>SMS will automatically be sent with email notifications</li>
        </ol>

        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#2b2b2b'
        }}>
          <strong>💡 Recommendation for UK:</strong> TextLocal offers the cheapest rates for UK SMS (£0.02-0.04 per SMS). 
          For global coverage, Twilio is the most reliable option.
        </div>
      </div>
    </div>
  )
}

export default SMSTest