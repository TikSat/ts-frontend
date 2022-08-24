import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '@core/store/user/slice';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(userActions, dispatch);
};
