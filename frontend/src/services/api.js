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

// Interceptor to automatically refresh access token on 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          // Call the refresh endpoint directly using a clean axios call to avoid auth headers loop
          const res = await axios.post(`${API_URL}auth/refresh/`, { refresh: refreshToken });
          if (res.status === 200) {
            const { access } = res.data;
            localStorage.setItem('token', access);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh token is expired or invalid, clear everything and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
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
  create: (data) => api.post('homepage/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`homepage/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
