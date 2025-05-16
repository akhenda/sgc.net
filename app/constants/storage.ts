export function getStorageKey<T extends string>(key: T) {
  return `sgc-storage@${key}` as const;
}

/**
 * storage keys
 */
export const STORAGE_KEYS = {
  app: { id: getStorageKey('app'), locale: getStorageKey('app.locale') },
  query: { id: getStorageKey('query'), client: getStorageKey('query.client') },
  zustand: {
    id: getStorageKey('zustand'),
    app: getStorageKey('zustand.app'),
    auth: getStorageKey('zustand.auth'),
  },
} as const;
