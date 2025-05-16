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

  const { first, last, most, least, data: sightings } = data;

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto min-h-screen max-w-screen-xl space-y-6 px-5 pt-28 pb-20">
        <div className="grid grid-cols-1 flex-row gap-4 sm:grid-cols-2 md:grid-cols-4">
          <SightingCard title="First UFO Sightings" sighting={first} Icon={Calendar1Icon} />
          <SightingCard title="Least UFO Sightings" sighting={least} Icon={CalendarArrowDown} />
          <SightingCard title="Most UFO Sightings" sighting={most} Icon={CalendarArrowUpIcon} />
          <SightingCard title="Last UFO Sightings" sighting={last} Icon={CalendarCheckIcon} />
        </div>
        <div className="min-h-80 flex-1 rounded-[1rem] bg-card p-6 shadow-lg">
          <SightingsChart data={sightings} />
        </div>
      </div>
    </div>
  );
}
