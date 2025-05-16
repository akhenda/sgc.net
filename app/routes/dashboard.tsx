import { Dashboard } from '../pages/dashboard';

import type { Route } from './+types/dashboard';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'UFO Sightings Dashboard | Dashboard' },
    { name: 'description', content: 'UFO Sightings Data' },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
