import { createSlice } from '@reduxjs/toolkit';

type TypeInitialState = {
  user: {
    id: string;
    email: string;
    profile: {
      first_name: string;
      last_name: string;
    };
  } | null;
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
