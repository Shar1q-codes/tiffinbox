import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

const RiderPrivateRoute: React.FC<Props> = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? <>{children}</> : <Navigate to="/rider/login" />
}

export default RiderPrivateRoute
