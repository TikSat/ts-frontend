import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@app/store/user/slice';

export const rootReducer = combineReducers({
  user: userReducer,
});
