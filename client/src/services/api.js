import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Report endpoints
export const reportAPI = {
  getAllReports: (params = {}) => api.get('/reports', { params }),
  getMyReports: (params = {}) => api.get('/reports/user/my-reports', { params }),
  createReport: (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('issueType', data.issueType);
    formData.append('description', data.description);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('address', data.address || '');
    if (data.image) {
      formData.append('image', data.image);
    }
    return api.post('/reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getReportById: (id) => api.get(`/reports/${id}`),
  updateReport: (id, data) => api.patch(`/reports/${id}`, data),
  deleteReport: (id) => api.delete(`/reports/${id}`),
  getStats: () => api.get('/reports/stats/dashboard'),
};

// User endpoints
export const userAPI = {
  getAllUsers: (params = {}) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.patch(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats/dashboard'),
};

export default api;
