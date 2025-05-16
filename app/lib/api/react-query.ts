import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import { GC_TIME, STALE_TIME, STORAGE_KEYS, THIRTY_DAYS } from '../../constants';

type PersistorOptions = Omit<PersistQueryClientOptions, 'queryClient'>;

const persistorKey = STORAGE_KEYS.query.client;
const persistorStorage = typeof window !== 'undefined' ? window.localStorage : null;
const defaultMutationConfig = { retry: false };
const defaultQueryConfig = {
  retry: false,
  staleTime: STALE_TIME, // 5 minutes
  gcTime: GC_TIME, // 24 hours
  refetchOnWindowFocus: false,
};
const defaultOptions = { mutations: defaultMutationConfig, queries: defaultQueryConfig };
const persister = createSyncStoragePersister({
  key: persistorKey,
  storage: persistorStorage,
  throttleTime: 1000,
});

export const persistOptions: PersistorOptions = {
  persister,
  buster: 'sgc.net',
  maxAge: THIRTY_DAYS,
};

export const queryClient = new QueryClient({ defaultOptions });

persistQueryClient({ queryClient, persister });
