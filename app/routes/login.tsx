import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAuthValue } from '@/stores';

import { Login } from '../pages/login';

import type { Route } from './+types/login';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'UFO Sightings Dashboard | Login' },
    { name: 'description', content: 'Login to see sightings' },
  ];
}

export default function LoginRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useAuthValue('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { state: { from: location } });
  }, [isLoggedIn]);

  return <Login />;
}
