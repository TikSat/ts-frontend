import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '@app/store/user/slice';
import { modalActions } from '@app/store/modal/slice';

export const useActions = () => {
  const dispatch = useDispatch();
  const actions = { ...modalActions, ...userActions };
  return bindActionCreators(actions, dispatch);
};
