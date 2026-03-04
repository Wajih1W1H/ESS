import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Electronic Shop Management
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Solution complète de gestion multi-boutiques pour revendeurs d'électronique
        </p>
        <div className="space-x-4">
          <Link
            to="/shop/1"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <FiShoppingBag />
            <span>Voir la boutique</span>
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center space-x-2"
          >
            <FiUsers />
            <span>Espace admin</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-blue-600 text-4xl mb-4 flex justify-center">
            <FiShoppingBag />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multi-boutiques</h3>
          <p className="text-gray-600">
            Gérez plusieurs boutiques de manière isolée et sécurisée
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-blue-600 text-4xl mb-4 flex justify-center">
            <FiShield />
          </div>
          <h3 className="text-xl font-semibold mb-2">Rôles & Permissions</h3>
          <p className="text-gray-600">
            SuperAdmin et Admin avec des accès différenciés
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-blue-600 text-4xl mb-4 flex justify-center">
            <FiTrendingUp />
          </div>
          <h3 className="text-xl font-semibold mb-2">Dashboard en temps réel</h3>
          <p className="text-gray-600">
            Suivez vos ventes, dépenses et profits en direct
          </p>
        </div>
      </section>

      {/* Public Shop Preview */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Boutique publique</h2>
        <p className="text-gray-600 mb-4">
          Les clients peuvent voir les produits et contacter via WhatsApp sans créer de compte
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <code className="text-sm">
            GET /public/shop/1/products
          </code>
        </div>
      </section>
    </div>
  );
};

export default Home;