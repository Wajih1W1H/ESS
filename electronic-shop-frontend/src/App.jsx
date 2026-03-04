import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import PublicShop from './pages/PublicShop';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';

// Composant de route protégée
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={styles.loading}>Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/products" />;
  }
  
  return children;
};

// Composant de redirection
const HomeRedirect = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/products" />;
  }
  return <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Redirection automatique */}
      <Route path="/" element={<HomeRedirect />} />
      
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop/:shopId" element={<PublicShop />} />
      
      {/* Routes protégées (Admin et SuperAdmin) */}
      <Route path="/products" element={
        <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
          <Products />
        </ProtectedRoute>
      } />
      
      <Route path="/products/new" element={
        <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
          <ProductForm />
        </ProtectedRoute>
      } />
      
      <Route path="/products/edit/:id" element={
        <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
          <ProductForm />
        </ProtectedRoute>
      } />
      
      <Route path="/transactions" element={
        <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
          <Transactions />
        </ProtectedRoute>
      } />
      
      {/* Routes SuperAdmin uniquement */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['SuperAdmin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Route 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={styles.app}>
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }
};

export default App;