// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/rootReducer';
import { AppRedux } from 'types/AppRedux';

export const initialState: AppRedux = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateApp: (state: AppRedux, action: PayloadAction<AppRedux>) =>
      action.payload,
  },
});

export const { updateApp } = appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
