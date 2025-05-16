import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getSightings, type Sightings } from '../endpoints';

const QUERY_KEY = 'applications';

export function getSightingsQueryKey() {
  return [QUERY_KEY];
}

export function useGetSightings() {
  const query = useQuery<Sightings | undefined>({
    queryKey: getSightingsQueryKey(),
    queryFn: ({ signal }) => getSightings({ signal }),
    placeholderData: keepPreviousData,
  });

  return query;
}
