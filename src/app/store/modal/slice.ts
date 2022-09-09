import { createSlice } from '@reduxjs/toolkit';

interface ModalProps {
  name?: string;
}

type TypeInitialState = {
  modal: ModalProps | null;
};

const initialState: TypeInitialState = {
  modal: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { reducer: modalReducer, actions: modalActions } = slice;
