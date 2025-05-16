import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getSightings, type SightingsWithStats } from '../endpoints';

const QUERY_KEY = 'applications';

export function getSightingsQueryKey() {
  return [QUERY_KEY];
}

export function useGetSightings() {
  const query = useQuery<SightingsWithStats | undefined>({
    queryKey: getSightingsQueryKey(),
    queryFn: ({ signal }) => getSightings({ signal }),
    placeholderData: keepPreviousData,
  });

  return query;
}
