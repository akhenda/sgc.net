import { render, screen } from '@testing-library/react';
import type { LucideIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import type { Sighting } from '../lib/api/resources/ufos';
import { convertDateFormat } from '../lib/dates';

import { SightingCard } from './sighting-card';

const MockIcon = vi.fn(({ className }) => (
  <svg data-testid="mock-icon" className={className} />
)) as unknown as LucideIcon;

vi.mock('../lib/dates', () => ({
  convertDateFormat: vi.fn((dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);

    return new Date(year, month - 1, day);
  }),
}));

describe('SightingCard', () => {
  const mockTitle = 'Total Sightings';
  const mockSighting: Sighting = { date: '15/05/2023', sightings: 42 };

  it('should render the card with sighting data', () => {
    render(<SightingCard title={mockTitle} sighting={mockSighting} Icon={MockIcon} />);

    const expectedDateString = new Date(2023, 4, 15).toDateString(); // May 15, 2023

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
    expect(screen.getByText(mockSighting.sightings.toString())).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(MockIcon).toHaveBeenCalled();
  });

  it('should return null if no sighting data is provided', () => {
    const { container } = render(
      <SightingCard title={mockTitle} sighting={null} Icon={MockIcon} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render with 0 sightings', () => {
    const sightingWithZero: Sighting = { date: '01/01/2024', sightings: 0 };

    render(<SightingCard title={mockTitle} sighting={sightingWithZero} Icon={MockIcon} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should call convertDateFormat with the correct date string', () => {
    render(<SightingCard title={mockTitle} sighting={mockSighting} Icon={MockIcon} />);

    expect(convertDateFormat).toHaveBeenCalledWith(mockSighting.date);
  });

  it('should match snapshot with sighting data', () => {
    const { container } = render(
      <SightingCard title={mockTitle} sighting={mockSighting} Icon={MockIcon} />,
    );

    expect(container).toMatchSnapshot();
  });
});
