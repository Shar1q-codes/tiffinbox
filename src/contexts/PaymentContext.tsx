// src/contexts/PaymentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { 
  PaymentIntent, 
  PaymentHistoryItem,
  CustomerPaymentInfo, 
  getPaymentHistory, 
  calculatePrice, 
  formatPrice,
  PaymentMethodType 
} from '../services/paymentService';

interface PaymentContextType {
  isProcessing: boolean;
  paymentError: string | null;
  paymentSuccess: boolean;
  paymentIntent: PaymentIntent | null;
  paymentHistory: PaymentHistoryItem[];
  processingPayment: (intent: PaymentIntent | null) => void;
  setProcessingStatus: (status: boolean) => void;
  setPaymentError: (error: string | null) => void;
  setPaymentSuccess: (success: boolean) => void;
  refreshPaymentHistory: () => Promise<void>;
  calculateSubscriptionPrice: (planType: 'veg' | 'non-veg', subscriptionType: 'daily' | 'monthly', studentStatus: boolean) => number;
  formatCurrency: (amount: number, currency?: string) => string;
  clearPaymentState: () => void;
  lastPayment: PaymentHistoryItem | null;
  selectedPaymentMethod: PaymentMethodType;
  setSelectedPaymentMethod: (method: PaymentMethodType) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
  const [lastPayment, setLastPayment] = useState<PaymentHistoryItem | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('card');

  // Load payment history when user changes
  useEffect(() => {
    if (currentUser) {
      refreshPaymentHistory();
    } else {
      setPaymentHistory([]);
      setLastPayment(null);
    }
  }, [currentUser]);

  // Refresh payment history
  const refreshPaymentHistory = async () => {
    if (!currentUser) return;
    
    try {
      const history = await getPaymentHistory(currentUser.uid);
      setPaymentHistory(history);
      
      if (history.length > 0) {
        setLastPayment(history[0]);
      } else {
        setLastPayment(null);
      }
    } catch (error) {
      console.error('Error loading payment history:', error);
    }
  };

  // Update payment intent
  const processingPayment = (intent: PaymentIntent | null) => {
    setPaymentIntent(intent);
  };

  // Set processing status
  const setProcessingStatus = (status: boolean) => {
    setIsProcessing(status);
  };

  // Calculate subscription price
  const calculateSubscriptionPrice = (
    planType: 'veg' | 'non-veg',
    subscriptionType: 'daily' | 'monthly',
    studentStatus: boolean
  ): number => {
    return calculatePrice(planType, subscriptionType, studentStatus);
  };

  // Format currency
  const formatCurrency = (amount: number, currency?: string): string => {
    return formatPrice(amount, currency);
  };

  // Clear payment state
  const clearPaymentState = () => {
    setPaymentIntent(null);
    setPaymentError(null);
    setPaymentSuccess(false);
    setIsProcessing(false);
  };

  const value = {
    isProcessing,
    paymentError,
    paymentSuccess,
    paymentIntent,
    paymentHistory,
    processingPayment,
    setProcessingStatus,
    setPaymentError,
    setPaymentSuccess,
    refreshPaymentHistory,
    calculateSubscriptionPrice,
    formatCurrency,
    clearPaymentState,
    lastPayment,
    selectedPaymentMethod,
    setSelectedPaymentMethod
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};