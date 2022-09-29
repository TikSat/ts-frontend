import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@app/store/user/slice';
import { modalReducer } from '@app/store/modal/slice';
import { preferencesReducer } from '@app/store/preferences/slice';

export const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  preferences: preferencesReducer,
});
