import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAuthValue } from '@/stores';

import { Signup } from '../pages/signup';

import type { Route } from './+types/signup';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'UFO Sightings Dashboard | Signup' },
    { name: 'description', content: 'Signup to see sightings' },
  ];
}

export default function SignupRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useAuthValue('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { state: { from: location } });
  }, [isLoggedIn]);

  return <Signup />;
}
