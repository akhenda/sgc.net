import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function convertDateFormat(dateString: string) {
  // Use dayjs to parse the date string with the specified format
  const dateObject = dayjs(dateString, 'DD/MM/YYYY');

  // Handle cases where the date string is not valid
  if (!dateObject.isValid()) throw new Error('Invalid Date');

  return dateObject.toDate();
}
