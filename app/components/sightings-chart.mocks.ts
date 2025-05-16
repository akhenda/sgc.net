import type { Sightings } from '@/lib/api/resources/ufos';
import type { WeeklySightings } from '@/lib/dates';

export const mockSightings: Sightings = [
  { date: '01/01/2023', sightings: 5 }, // Sunday, Week 52 of 2022
  { date: '02/01/2023', sightings: 10 }, // Monday, Week 1 of 2023
  { date: '03/01/2023', sightings: 15 }, // Tuesday, Week 1 of 2023
  { date: '09/01/2023', sightings: 25 }, // Monday, Week 2 of 2023
];

export const mockGroupedData: WeeklySightings = {
  '2022 W52': {
    name: '2022 W52',
    weekStartDate: '2022-12-26',
    sightings: [
      {
        date: '26/12/2022',
        sightings: 0,
        name: 'Monday',
        prettyDate: 'Mon Dec 26 2022',
        week: '2022 W52',
      },
      {
        date: '27/12/2022',
        sightings: 0,
        name: 'Tuesday',
        prettyDate: 'Tue Dec 27 2022',
        week: '2022 W52',
      },
      {
        date: '28/12/2022',
        sightings: 0,
        name: 'Wednesday',
        prettyDate: 'Wed Dec 28 2022',
        week: '2022 W52',
      },
      {
        date: '29/12/2022',
        sightings: 0,
        name: 'Thursday',
        prettyDate: 'Thu Dec 29 2022',
        week: '2022 W52',
      },
      {
        date: '30/12/2022',
        sightings: 0,
        name: 'Friday',
        prettyDate: 'Fri Dec 30 2022',
        week: '2022 W52',
      },
      {
        date: '31/12/2022',
        sightings: 0,
        name: 'Saturday',
        prettyDate: 'Sat Dec 31 2022',
        week: '2022 W52',
      },
      {
        date: '01/01/2023',
        sightings: 5,
        name: 'Sunday',
        prettyDate: 'Sun Jan 01 2023',
        week: '2022 W52',
      },
    ],
  },
  '2023 W01': {
    name: '2023 W01',
    weekStartDate: '2023-01-02',
    sightings: [
      {
        date: '02/01/2023',
        sightings: 10,
        name: 'Monday',
        prettyDate: 'Mon Jan 02 2023',
        week: '2023 W01',
      },
      {
        date: '03/01/2023',
        sightings: 15,
        name: 'Tuesday',
        prettyDate: 'Tue Jan 03 2023',
        week: '2023 W01',
      },
      {
        date: '04/01/2023',
        sightings: 0,
        name: 'Wednesday',
        prettyDate: 'Wed Jan 04 2023',
        week: '2023 W01',
      },
      {
        date: '05/01/2023',
        sightings: 0,
        name: 'Thursday',
        prettyDate: 'Thu Jan 05 2023',
        week: '2023 W01',
      },
      {
        date: '06/01/2023',
        sightings: 0,
        name: 'Friday',
        prettyDate: 'Fri Jan 06 2023',
        week: '2023 W01',
      },
      {
        date: '07/01/2023',
        sightings: 0,
        name: 'Saturday',
        prettyDate: 'Sat Jan 07 2023',
        week: '2023 W01',
      },
      {
        date: '08/01/2023',
        sightings: 0,
        name: 'Sunday',
        prettyDate: 'Sun Jan 08 2023',
        week: '2023 W01',
      },
    ],
  },
  '2023 W02': {
    name: '2023 W02',
    weekStartDate: '2023-01-09',
    sightings: [
      {
        date: '09/01/2023',
        sightings: 25,
        name: 'Monday',
        prettyDate: 'Mon Jan 09 2023',
        week: '2023 W02',
      },
      {
        date: '10/01/2023',
        sightings: 0,
        name: 'Tuesday',
        prettyDate: 'Tue Jan 10 2023',
        week: '2023 W02',
      },
      {
        date: '11/01/2023',
        sightings: 0,
        name: 'Wednesday',
        prettyDate: 'Wed Jan 11 2023',
        week: '2023 W02',
      },
      {
        date: '12/01/2023',
        sightings: 0,
        name: 'Thursday',
        prettyDate: 'Thu Jan 12 2023',
        week: '2023 W02',
      },
      {
        date: '13/01/2023',
        sightings: 0,
        name: 'Friday',
        prettyDate: 'Fri Jan 13 2023',
        week: '2023 W02',
      },
      {
        date: '14/01/2023',
        sightings: 0,
        name: 'Saturday',
        prettyDate: 'Sat Jan 14 2023',
        week: '2023 W02',
      },
      {
        date: '15/01/2023',
        sightings: 0,
        name: 'Sunday',
        prettyDate: 'Sun Jan 15 2023',
        week: '2023 W02',
      },
    ],
  },
};
