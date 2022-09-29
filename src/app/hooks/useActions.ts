import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '@app/store/user/slice';
import { modalActions } from '@app/store/modal/slice';
import { preferencesActions } from '@app/store/preferences/slice';

export const useActions = () => {
  const dispatch = useDispatch();
  const actions = { ...modalActions, ...userActions, ...preferencesActions };
  return bindActionCreators(actions, dispatch);
};
