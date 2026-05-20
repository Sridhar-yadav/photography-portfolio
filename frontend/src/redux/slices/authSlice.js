import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refresh_token');
let initialUser = null;

if (token) {
  try {
    initialUser = jwtDecode(token);
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
}

const initialState = {
  user: initialUser,
  token: token || null,
  refreshToken: refreshToken || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.token = access;
      if (refresh) {
        state.refreshToken = refresh;
        localStorage.setItem('refresh_token', refresh);
      }
      state.user = jwtDecode(access);
      state.isAuthenticated = true;
      localStorage.setItem('token', access);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
