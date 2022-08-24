import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@core/store/user/slice';

export const rootReducer = combineReducers({
  user: userReducer,
});
