import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { verifyLoginStatus } from '../../store/slices/userSlice';
import UserPage from './UserPage';
import { store } from '../../store/store';

export default function RequireAuth({ children }) {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(
    useSelector((state) => state.user.isAuth),
  );

  useEffect(() => {
    dispatch(verifyLoginStatus());
    setLoggedIn(store.getState().user.isAuth);
  });

  return loggedIn ? (
    <UserPage>{children}</UserPage>
  ) : (
    <Navigate to="/login" replace />
  );
}
