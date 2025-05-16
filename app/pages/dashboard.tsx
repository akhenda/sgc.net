import {
  Calendar1Icon,
  CalendarArrowDown,
  CalendarArrowUpIcon,
  CalendarCheckIcon,
  type LucideIcon,
} from 'lucide-react';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';

import { FullScreenLoader } from '@/components/full-screen-loader';
import { UFOs } from '@/lib/api';
import type { Sighting } from '@/lib/api/resources/ufos';
import { convertDateFormat } from '@/lib/dates';
import { logger } from '@/lib/logger';

type SightingCardProps = { title: string; sighting?: Sighting | null; Icon: LucideIcon };

function SightingCard({ title, sighting, Icon }: SightingCardProps) {
  if (!sighting) return null;

  const { date, sightings } = sighting;
  console.log('date: ', date);

  return (
    <div className="relative flex min-h-40 flex-1 flex-col justify-between overflow-hidden rounded-md bg-card p-6 shadow-lg">
      <h3 className="font-bold text-sm">{title}</h3>
      {date && <p className="text-muted-foreground">{convertDateFormat(date).toDateString()}</p>}
      {(sightings || sightings === 0) && (
        <p className="text-4xl text-muted-foreground">{sightings}</p>
      )}
      <Icon className="absolute right-4 bottom-4 h-22 w-22 opacity-5" />
    </div>
  );
}

function SightingsGraph() {
  return (
    <VictoryChart theme={VictoryTheme.clean} domain={{ y: [0.5, 5.5] }} domainPadding={{ x: 40 }}>
      <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 1 },
            { x: '2023 Q2', y: 2 },
            { x: '2023 Q3', y: 3 },
            { x: '2023 Q4', y: 2 },
          ]}
        />
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 2 },
            { x: '2023 Q2', y: 3 },
            { x: '2023 Q3', y: 4 },
            { x: '2023 Q4', y: 5 },
          ]}
        />
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 1 },
            { x: '2023 Q2', y: 2 },
            { x: '2023 Q3', y: 3 },
            { x: '2023 Q4', y: 4 },
          ]}
        />
      </VictoryGroup>
    </VictoryChart>
  );
}

export function Dashboard() {
  const { data, isLoading } = UFOs.useGetSightings();
  logger.info('data: ', data);

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
          <SightingsGraph />
        </div>
      </div>
    </div>
  );
}
