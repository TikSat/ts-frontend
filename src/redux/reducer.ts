import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '@app/store/user/slice';
import { modalReducer } from '@app/store/modal/slice';

export const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});
