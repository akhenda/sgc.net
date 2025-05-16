import { type PropsWithChildren, useEffect } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router';

import { authStore, useAuthValue } from '@/stores';

export async function clientLoader() {
  const isLoggedIn = authStore.get('isLoggedIn');

  if (!isLoggedIn) throw redirect('/login');
}

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useAuthValue('isLoggedIn');

  useEffect(() => {
    if (!isLoggedIn) navigate('/', { state: { from: location } });
  }, [isLoggedIn]);

  return (
    <>
      <Outlet />
      {children}
    </>
  );
};
