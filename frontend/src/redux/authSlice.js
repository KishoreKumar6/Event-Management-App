// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Helper: Safely parse localStorage
const safeParse = (item) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error parsing localStorage item:', error);
    return null;
  }
};

const storedUser = safeParse(localStorage.getItem('user'));
const storedAdmin = safeParse(localStorage.getItem('admin'));
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser || storedAdmin || null,
  token: storedToken || null,
  role: storedAdmin ? 'admin' : storedUser ? 'user' : null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.role = user.role;

      if (user.role === 'admin') {
        localStorage.setItem('admin', JSON.stringify(user));
        localStorage.removeItem('user');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('admin');
      }
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
