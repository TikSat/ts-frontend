import { createSlice } from '@reduxjs/toolkit';
import { ProfileProps } from '@app/components/models/Profile';

type TypeInitialState = {
  user: ProfileProps | null;
};

const initialState: TypeInitialState = {
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { reducer: userReducer, actions: userActions } = slice;
