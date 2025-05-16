import type { LucideIcon } from 'lucide-react';

import type { Sighting } from '@/lib/api/resources/ufos';
import { convertDateFormat } from '@/lib/dates';

type SightingCardProps = { title: string; sighting?: Sighting | null; Icon: LucideIcon };

export function SightingCard({ title, sighting, Icon }: SightingCardProps) {
  if (!sighting) return null;

  const { date, sightings } = sighting;

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
