import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import GlasgowBanner from './components/GlasgowBanner/GlasgowBanner'
import Navbar from './layout/Navbar/Navbar'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Subscription from './pages/Subscription/Subscription'
import Tracking from './pages/Tracking/Tracking'
import AdminLogin from './pages/Admin/Login/AdminLogin'
import AdminLayout from './pages/Admin/Layout/AdminLayout'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard'
import MenuEditor from './pages/Admin/MenuEditor/MenuEditor'
import CustomerTable from './pages/Admin/Customers/CustomerTable'
import DeliveryTable from './pages/Admin/Delivery/DeliveryTable'
import RiderLogin from './pages/Rider/RiderLogin'
import RiderSignup from './pages/Rider/RiderSignup'
import RiderDashboard from './pages/Rider/RiderDashboard'
import RiderPrivateRoute from './components/RiderPrivateRoute'
import RiderApproval from './pages/Admin/Riders/RiderApproval'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin login route (no layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin routes (with admin layout and auth protection) */}
          <Route path="/admin/*" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<MenuEditor />} />
            <Route path="customers" element={<CustomerTable />} />
            <Route path="delivery" element={<DeliveryTable />} />
            <Route path="riders" element={<RiderApproval />} />
          </Route>

          {/* Rider authentication */}
          <Route path="/rider/login" element={<RiderLogin />} />
          <Route path="/rider/signup" element={<RiderSignup />} />
          <Route path="/rider/dashboard" element={
            <RiderPrivateRoute>
              <RiderDashboard />
            </RiderPrivateRoute>
          } />

          {/* Main app routes (with navbar and Glasgow banner) */}
          <Route path="/*" element={
            <>
              <GlasgowBanner />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/tracking" element={<Tracking />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App