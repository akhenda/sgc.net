import { UFOs } from '@/lib/api';
import { logger } from '@/lib/logger';

export function Dashboard() {
  const { data } = UFOs.useGetSightings();
  logger.info('data: ', data);

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto h-screen max-w-screen-xl space-y-6 pt-28 pb-20">
        <div className="flex flex-row gap-4">
          <div className="min-h-40 flex-1 rounded-md bg-card p-6 shadow-lg">Widget 1</div>
          <div className="min-h-40 flex-1 rounded-md bg-card p-6 shadow-lg">Widget 2</div>
          <div className="min-h-40 flex-1 rounded-md bg-card p-6 shadow-lg">Widget 3</div>
          <div className="min-h-40 flex-1 rounded-md bg-card p-6 shadow-lg">Widget 4</div>
        </div>
        <div className="min-h-80 flex-1 rounded-md bg-card p-6 shadow-lg">Chart Area</div>
      </div>
    </div>
  );
}
