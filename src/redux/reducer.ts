import { combineReducers } from '@reduxjs/toolkit';

import { profileReducer } from '@core/store/profile/slice';

export const rootReducer = combineReducers({
  profile: profileReducer,
});
