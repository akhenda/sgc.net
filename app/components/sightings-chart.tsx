import { useEffect, useMemo, useState } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { Sightings } from '@/lib/api/resources/ufos';
import { groupDataByWeek } from '@/lib/dates';

import { Button } from './ui/button';

export function SightingsChart({ data }: { data: Sightings }) {
  const groupedData = groupDataByWeek(data);
  const weeks = Object.keys(groupedData);

  const [selectedWeek, setSelectedWeek] = useState('');
  const selectedWeekData = useMemo(() => groupedData[selectedWeek], [selectedWeek]);
  const currentWeekIndex = weeks.indexOf(selectedWeek);

  useEffect(() => {
    if (groupedData) setSelectedWeek(weeks[0]);
  }, []);

  const onPrevWeek = () => {
    if (currentWeekIndex === 0) return;

    const prevWeek = currentWeekIndex - 1;

    setSelectedWeek(weeks[prevWeek]);
  };

  const onNextWeek = () => {
    if (currentWeekIndex === weeks.length - 1) return;

    const nextWeek = currentWeekIndex + 1;

    setSelectedWeek(weeks[nextWeek]);
  };

  if (!selectedWeekData) return null;
  console.log('selectedWeekData: ', selectedWeekData);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between">
        <Button size="lg" variant="outline" disabled={currentWeekIndex === 0} onClick={onPrevWeek}>
          Prev Week
        </Button>
        <Button
          size="lg"
          variant="outline"
          disabled={currentWeekIndex === weeks.length - 1}
          onClick={onNextWeek}
        >
          Next Week
        </Button>
      </div>

      <div className="h-[600px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={selectedWeekData.sightings}
            margin={{ top: 20, right: 30, left: 5, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="prettyDate" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={50} iconSize={20} />
            <Bar
              dataKey="sightings"
              fill="#333"
              activeBar={<Rectangle fill="#222" stroke="#111" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
