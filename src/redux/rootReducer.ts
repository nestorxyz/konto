import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from 'redux/userSlice';
import { appSlice } from 'redux/appSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  app: appSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
