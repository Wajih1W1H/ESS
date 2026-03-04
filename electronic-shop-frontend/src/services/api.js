import axios from 'axios';

const API_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Requête:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log('📥 Réponse:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Erreur API:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/login', data),
  register: (data) => api.post('/register', data),
};

export const productAPI = {
  getAll: () => api.get('/api/products'),
  create: (data) => api.post('/api/products', data),
  getPublic: (shopId) => api.get(`/public/shop/${shopId}/products`),
  getWhatsAppLink: (shopId, productId) => 
    api.get(`/public/shop/${shopId}/product/${productId}/whatsapp`),
};

export const transactionAPI = {
  getAll: () => api.get('/api/transactions'),
  create: (data) => api.post('/api/transactions', data),
};

export const dashboardAPI = {
  getStats: () => api.get('/api/reports/dashboard'),
};

export default api;