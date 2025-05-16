import {
  Calendar1Icon,
  CalendarArrowDown,
  CalendarArrowUpIcon,
  CalendarCheckIcon,
} from 'lucide-react';

import { FullScreenLoader } from '@/components/full-screen-loader';
import { SightingCard } from '@/components/sighting-card';
import { SightingsChart } from '@/components/sightings-chart';
import { UFOs } from '@/lib/api';

export function Dashboard() {
  const { data, isLoading } = UFOs.useGetSightings();

  if (isLoading || !data) return <FullScreenLoader />;

  const { first, last, most, least } = data;

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto h-screen max-w-screen-xl space-y-6 pt-28 pb-20">
        <div className="flex flex-row gap-4">
          <SightingCard title="First UFO Sightings" sighting={first} Icon={Calendar1Icon} />
          <SightingCard title="Least UFO Sightings" sighting={least} Icon={CalendarArrowDown} />
          <SightingCard title="Most UFO Sightings" sighting={most} Icon={CalendarArrowUpIcon} />
          <SightingCard title="Last UFO Sightings" sighting={last} Icon={CalendarCheckIcon} />
        </div>
        <div className="min-h-80 flex-1 rounded-md bg-card p-6 shadow-lg">
          <SightingsChart />
        </div>
      </div>
    </div>
  );
}
