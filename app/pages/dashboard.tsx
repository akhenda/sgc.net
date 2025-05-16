import {
  Calendar1Icon,
  CalendarArrowDown,
  CalendarArrowUpIcon,
  CalendarCheckIcon,
  type LucideIcon,
} from 'lucide-react';

import { UFOs } from '@/lib/api';
import { logger } from '@/lib/logger';

type SightingCardProps = { title: string; date?: string; sightings?: number; Icon: LucideIcon };

function SightingCard({ title, date, sightings, Icon }: SightingCardProps) {
  return (
    <div className="relative flex min-h-40 flex-1 flex-col justify-between overflow-hidden rounded-md bg-card p-6 shadow-lg">
      <h3 className="font-bold text-sm">{title}</h3>
      {date && <p className="text-muted-foreground">{new Date(date).toDateString()}</p>}
      {sightings && <p className="text-4xl text-muted-foreground">{sightings}</p>}
      <Icon className="absolute right-4 bottom-4 h-22 w-22 opacity-5" />
    </div>
  );
}

export function Dashboard() {
  const { data } = UFOs.useGetSightings();
  logger.info('data: ', data);

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto h-screen max-w-screen-xl space-y-6 pt-28 pb-20">
        <div className="flex flex-row gap-4">
          <SightingCard title="First UFO Sightings" date="2023-09-25" Icon={Calendar1Icon} />
          <SightingCard title="Least UFO Sightings" sightings={1} Icon={CalendarArrowDown} />
          <SightingCard title="Most UFO Sightings" sightings={147} Icon={CalendarArrowUpIcon} />
          <SightingCard title="Last UFO Sightings" date="2023-09-25" Icon={CalendarCheckIcon} />
        </div>
        <div className="min-h-80 flex-1 rounded-md bg-card p-6 shadow-lg">Chart Area</div>
      </div>
    </div>
  );
}
