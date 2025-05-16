import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { Sighting, Sightings } from './api/resources/ufos';

dayjs.extend(customParseFormat);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function convertDateFormat(dateString: string) {
  // Use dayjs to parse the date string with the specified format
  const dateObject = dayjs(dateString, 'DD/MM/YYYY');

  // Handle cases where the date string is not valid
  if (!dateObject.isValid()) throw new Error('Invalid Date');

  return dateObject.toDate();
}

export function getISOWeek(date: Date): number {
  const d = new Date(date.getTime());

  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return weekNo;
}

type ChartSighting = Sighting & { name: string; prettyDate: string; week: string };
type ChartSightings = ChartSighting[];

export interface WeekData {
  name: string;
  weekStartDate: string; // store the start date of the week
  sightings: ChartSightings; // array of daily sightings within this week
}

export interface WeeklySightings {
  [weekKey: string]: WeekData; // keys will be like "YYYY WNN"
}

export function groupDataByWeek(data: Sightings): WeeklySightings {
  const weeklyData: WeeklySightings = {};

  data.forEach((entry) => {
    const date = convertDateFormat(entry.date);

    const dayOfWeek = date.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 2;
    const weekStartDate = new Date(date);

    weekStartDate.setDate(date.getDate() - daysToSubtract);

    const weekStartDateString = weekStartDate.toISOString().split('T')[0];
    const weekYear = weekStartDate.getFullYear();
    const weekNumber = getISOWeek(date); // Calculate week based on the original date
    const weekKey = `${weekYear} W${weekNumber.toString().padStart(2, '0')}`;

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = { weekStartDate: weekStartDateString, sightings: [], name: weekKey };
    }

    weeklyData[weekKey].sightings.push({
      ...entry,
      name: days[dayOfWeek],
      prettyDate: date.toDateString(),
      week: weekKey,
    });
  });

  // Fill in missing dates for each week
  Object.entries(weeklyData).forEach(([_, weekData]) => {
    const weekStartDate = new Date(weekData.weekStartDate);
    const datesPresent = new Set(weekData.sightings.map((s) => s.date));
    const filledSightings: ChartSightings = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStartDate);

      currentDate.setDate(weekStartDate.getDate() + i);

      const currentDateString = dayjs(currentDate).format('DD/MM/YYYY');

      if (datesPresent.has(currentDateString)) {
        const existingEntry = weekData.sightings.find((s) => s.date === currentDateString);
        if (existingEntry) filledSightings.push(existingEntry);
      } else {
        filledSightings.push({
          date: currentDateString,
          sightings: 0,
          name: days[currentDate.getDay()],
          prettyDate: currentDate.toDateString(),
          week: weekData.name,
        });
      }
    }

    // Sort the sightings by date to ensure chronological order
    filledSightings.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });

    weekData.sightings = filledSightings;
  });

  return weeklyData;
}
