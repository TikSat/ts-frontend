import { createSlice } from '@reduxjs/toolkit';

interface PreferencesProps {
  language: string;
  location: string;
}

type TypeInitialState = {
  preferences: PreferencesProps;
};

const initialState: TypeInitialState = {
  preferences: { language: 'en', location: 'Istanbul, Turkey' },
};

const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.preferences.location = action.payload;
    },
    setLanguage: (state, action) => {
      state.preferences.language = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
  },
});

export const { reducer: preferencesReducer, actions: preferencesActions } = slice;
