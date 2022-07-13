import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export const { reducer: profileReducer } = slice;
