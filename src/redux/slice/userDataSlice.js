import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('adminInfo');
const storedToken = localStorage.getItem('token');


const initialState = {
  user: storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null,
  token: storedToken && storedToken !== 'undefined' ? storedToken : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('adminInfo', JSON.stringify(user, null, 2));
      localStorage.setItem('token', token);
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('adminInfo');
      localStorage.removeItem('token');
    },
  },
});

export const { setUserCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
