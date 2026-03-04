import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiHome, FiBox, FiShoppingCart, FiBarChart2, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FiHome className="text-2xl" />
            <span className="font-bold text-xl">Electronic Shop</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="flex items-center space-x-1 hover:text-blue-200">
                  <FiBox />
                  <span>Produits</span>
                </Link>
                
                <Link to="/transactions" className="flex items-center space-x-1 hover:text-blue-200">
                  <FiShoppingCart />
                  <span>Transactions</span>
                </Link>
                
                {isSuperAdmin && (
                  <Link to="/dashboard" className="flex items-center space-x-1 hover:text-blue-200">
                    <FiBarChart2 />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-1">
                    <FiUser />
                    <span className="text-sm">{user?.name}</span>
                    <span className="text-xs bg-blue-700 px-2 py-1 rounded-full ml-2">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 hover:text-blue-200"
                  >
                    <FiLogOut />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-blue-200">Connexion</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;