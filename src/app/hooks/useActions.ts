import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '@app/store/user/slice';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(userActions, dispatch);
};
