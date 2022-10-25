import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../src/helpers/cookieFuncs';

const initialState = {
  id: null,
  role: '',
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    setUserInfo: (state, action) => {
      state.id = action.payload.user.id;
      state.role = action.payload.user.rolename;
      state.isAuth = true;
    },
    clearUserInfo: (state) => {
      state.id = initialState.id;
      state.role = initialState.role;
      state.isAuth = initialState.isAuth;
    },
    verifyLoginStatus: (state) => {
      if (!getCookie('token')) state.isAuth = false;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const {
  setId,
  setRole,
  setUserInfo,
  setLoginStatus,
  clearUserInfo,
  verifyLoginStatus,
} = userSlice.actions;

export default userSlice.reducer;
