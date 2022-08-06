// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/rootReducer';
import { User } from '@prisma/client';

export const initialState: User = {
  id: '',
  name: '',
  email: '',
  emailVerified: null,
  image: '',
  isAdmin: false,
  phone: '',
  phoneVerified: null,
  verificationCode: '',
  walletAvailable: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: User, action: PayloadAction<User>) => action.payload,
  },
});

export const { updateUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
