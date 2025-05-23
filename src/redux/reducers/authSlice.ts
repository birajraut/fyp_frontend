import { createSlice } from '@reduxjs/toolkit';
import { IAuth, ILoginAs, IRestaurant } from '../../types/redux';
import { IUserResponse } from '../../types/user';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuth = {
  accessToken: '',
  refreshToken: '',
  user: null,
  loginAs: null,
  restaurant: {
    id: '',
    name: '',
  },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserResponse | null>) => {
      state.user = action.payload;
    },
    setRestaurant: (state, action: PayloadAction<IRestaurant | null>) => {
      state.restaurant = action.payload;
    },
    setLoginAs: (state, action: PayloadAction<ILoginAs>) => {
      state.loginAs = action.payload;
    },
    logout: (state) => {
      Object.assign(state, initialState); // Reset state to initial values
    },
  },
});

export const { setAccessToken, setRestaurant, setRefreshToken, setUser, setLoginAs ,logout} =
  authSlice.actions;

export default authSlice.reducer;
