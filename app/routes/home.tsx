import React from 'react';

import { Welcome } from '../welcome/welcome';

import type { Route } from './+types/home';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home({ children: _children }: React.PropsWithChildren) {
  return <Welcome />;
}
