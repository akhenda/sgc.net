import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { groupDataByWeek } from '@/lib/dates';
import type { AnyValue } from '@/types';

import { SightingsChart } from './sightings-chart';
import { mockGroupedData, mockSightings } from './sightings-chart.mocks';

vi.mock('../lib/dates', () => {
  const mockGroupDataByWeek = vi.fn();

  return { groupDataByWeek: mockGroupDataByWeek };
});

const mockGroupDataByWeek = vi.mocked(groupDataByWeek);
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ data }: { data: AnyValue[] }) => (
    <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)}></div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid"></div>,
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="xaxis" data-data-key={dataKey}></div>
  ),
  YAxis: () => <div data-testid="yaxis"></div>,
  Tooltip: () => <div data-testid="tooltip"></div>,
  Legend: () => <div data-testid="legend"></div>,
  Bar: ({ dataKey, fill }: { dataKey: string; fill: string }) => (
    <div data-testid="bar" data-data-key={dataKey} data-fill={fill}></div>
  ),
  Rectangle: ({ fill, stroke }: { fill: string; stroke: string }) => (
    <div data-testid="rectangle" data-fill={fill} data-stroke={stroke}></div>
  ),
}));

describe('SightingsChart', () => {
  beforeEach(() => {
    // reset the mock before each test
    mockGroupDataByWeek.mockReturnValue(mockGroupedData);
  });

  it('should render the chart with the first week data on initial load', () => {
    render(<SightingsChart data={mockSightings} />);

    // check if groupDataByWeek was called
    expect(mockGroupDataByWeek).toHaveBeenCalledWith(mockSightings);

    // check if the BarChart is rendered with the first week's data
    const barChart = screen.getByTestId('bar-chart');
    expect(barChart).toBeInTheDocument();
    expect(JSON.parse(barChart.getAttribute('data-chart-data') || '[]')).toEqual(
      mockGroupedData['2022 W52'].sightings,
    );

    // check button states
    expect(screen.getByText('Prev Week')).toBeDisabled();
    expect(screen.getByText('Next Week')).toBeEnabled();
  });

  it('should navigate to the next week when "Next Week" button is clicked', () => {
    render(<SightingsChart data={mockSightings} />);

    const nextButton = screen.getByText('Next Week');
    fireEvent.click(nextButton);

    // check if the BarChart is updated with the next week's data
    const barChart = screen.getByTestId('bar-chart');
    expect(JSON.parse(barChart.getAttribute('data-chart-data') || '[]')).toEqual(
      mockGroupedData['2023 W01'].sightings,
    );

    // check button states
    expect(screen.getByText('Prev Week')).toBeEnabled();
    expect(screen.getByText('Next Week')).toBeEnabled();
  });

  it('should navigate to the previous week when "Prev Week" button is clicked', () => {
    render(<SightingsChart data={mockSightings} />);

    const nextButton = screen.getByText('Next Week');
    const prevButton = screen.getByText('Prev Week');

    // Navigate to the second week first
    fireEvent.click(nextButton);
    expect(
      JSON.parse(screen.getByTestId('bar-chart').getAttribute('data-chart-data') || '[]'),
    ).toEqual(mockGroupedData['2023 W01'].sightings);

    // Navigate back to the first week
    fireEvent.click(prevButton);
    expect(
      JSON.parse(screen.getByTestId('bar-chart').getAttribute('data-chart-data') || '[]'),
    ).toEqual(mockGroupedData['2022 W52'].sightings);

    // check button states
    expect(screen.getByText('Prev Week')).toBeDisabled();
    expect(screen.getByText('Next Week')).toBeEnabled();
  });

  it('should disable "Next Week" button on the last week', () => {
    render(<SightingsChart data={mockSightings} />);

    const nextButton = screen.getByText('Next Week');

    // Navigate to the last week (2023 W02)
    fireEvent.click(nextButton); // 2023 W01
    fireEvent.click(nextButton); // 2023 W02

    // check if the BarChart is updated with the last week's data
    const barChart = screen.getByTestId('bar-chart');
    expect(JSON.parse(barChart.getAttribute('data-chart-data') || '[]')).toEqual(
      mockGroupedData['2023 W02'].sightings,
    );

    // check button states
    expect(screen.getByText('Prev Week')).toBeEnabled();
    expect(screen.getByText('Next Week')).toBeDisabled();
  });

  it('should render null if groupedData is empty', () => {
    mockGroupDataByWeek.mockReturnValue({}); // Return empty grouped data
    const { container } = render(<SightingsChart data={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
