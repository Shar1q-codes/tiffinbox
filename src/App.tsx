import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin login route (no layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin routes (with admin layout) */}
          <Route path="/admin/*" element={
            <PrivateRoute requireAdmin>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<MenuEditor />} />
            <Route path="customers" element={<CustomerTable />} />
            <Route path="delivery" element={<DeliveryTable />} />
          </Route>
          
          {/* Main app routes (with navbar) */}
          <Route path="/*" element={
            <>
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