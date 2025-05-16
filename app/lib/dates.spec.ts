import { describe, expect, it } from 'vitest';

import { convertDateFormat, getISOWeek } from './dates';

describe('dates', () => {
  describe('convertDateFormat', () => {
    it('should convert a valid DD/MM/YYYY string to a Date object', () => {
      const dateString = '01/05/2025';
      const expectedDate = new Date(2025, 4, 1); // Month is 0-indexed

      const result = convertDateFormat(dateString);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should throw an error for an invalid date string', () => {
      const dateString = 'asfdsfdsfd'; // Invalid day

      expect(() => convertDateFormat(dateString)).toThrow('Invalid Date');
    });
  });

  describe('getISOWeek', () => {
    it('should return the correct ISO week number for a date in the middle of the year', () => {
      const date = new Date(2025, 4, 15); // May 15, 2025

      expect(getISOWeek(date)).toBe(20);
    });

    it('should return the correct ISO week number for a date at the start of the year', () => {
      // Jan 1, 2023 (Sunday)
      const date = new Date(2023, 0, 1);

      // Or 53 depending on the year, need to verify ISO 8601 rules
      expect(getISOWeek(date)).toBe(52);

      // Let's check 2023-01-02 (Monday)
      const date2 = new Date(2023, 0, 2);

      expect(getISOWeek(date2)).toBe(1);
    });

    it('should return the correct ISO week number for a date at the end of the year', () => {
      const date = new Date(2023, 11, 31); // Dec 31, 2023 (Sunday)

      expect(getISOWeek(date)).toBe(52);

      // Let's check 2024-01-01 (Monday)
      const date2 = new Date(2024, 0, 1);

      expect(getISOWeek(date2)).toBe(1);
    });

    it('should handle leap years correctly', () => {
      const date = new Date(2024, 1, 29); // Feb 29, 2024 (Thursday)
      expect(getISOWeek(date)).toBe(9);
    });
  });
});
