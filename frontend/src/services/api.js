import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
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

export const authAPI = {
  login: (credentials) => api.post('auth/login/', credentials),
  refresh: (token) => api.post('auth/refresh/', { refresh: token }),
};

export const portfolioAPI = {
  getAll: () => api.get('portfolio/'),
  getById: (id) => api.get(`portfolio/${id}/`),
  create: (data) => api.post('portfolio/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`portfolio/${id}/`, data),
  delete: (id) => api.delete(`portfolio/${id}/`),
};

export const filmsAPI = {
  getAll: () => api.get('films/'),
  getById: (id) => api.get(`films/${id}/`),
  create: (data) => api.post('films/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`films/${id}/`, data),
  delete: (id) => api.delete(`films/${id}/`),
};

export const testimonialsAPI = {
  getAll: () => api.get('testimonials/'),
  create: (data) => api.post('testimonials/', data),
};

export const inquiriesAPI = {
  getAll: () => api.get('inquiries/'),
  create: (data) => api.post('inquiries/', data), // Updated since it's a viewset now
  updateStatus: (id, status) => api.patch(`inquiries/${id}/`, { status }),
};

export const productsAPI = {
  getAll: () => api.get('products/'),
  create: (data) => api.post('products/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const homepageAPI = {
  getAll: () => api.get('homepage/'),
  update: (id, data) => api.put(`homepage/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
