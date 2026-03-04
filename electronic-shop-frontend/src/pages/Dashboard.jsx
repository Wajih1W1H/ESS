import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPackage } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pieData = {
    labels: ['Ventes', 'Dépenses'],
    datasets: [
      {
        data: [stats?.totalSales || 0, stats?.totalExpenses || 0],
        backgroundColor: ['#10B981', '#EF4444'],
        borderColor: ['#059669', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total ventes</p>
              <p className="text-2xl font-bold text-green-600">
                {stats?.totalSales?.toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total dépenses</p>
              <p className="text-2xl font-bold text-red-600">
                {stats?.totalExpenses?.toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FiTrendingDown className="text-red-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Profit net</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats?.netProfit?.toLocaleString()} FCFA
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock faible</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats?.lowStockCount}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FiPackage className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Répartition des flux</h2>
          <div className="h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Résumé</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-medium">Ventes</span>
              <span className="text-green-600 font-bold">
                {stats?.totalSales?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-medium">Dépenses</span>
              <span className="text-red-600 font-bold">
                {stats?.totalExpenses?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">Profit</span>
              <span className="text-blue-600 font-bold">
                {stats?.netProfit?.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;