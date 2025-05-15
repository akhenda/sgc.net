import React from 'react';

import { Welcome } from '../pages/welcome';

import type { Route } from './+types/home';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'UFO Sightings Dashboard | Procode' },
    {
      name: 'description',
      content: 'Track anomalous crafts circling over the Procode headquarters',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
