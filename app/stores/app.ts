import { createStore } from 'zustand-x';

import { STORAGE_KEYS } from '../constants';
import { logger } from '../lib/logger';

export type AppTheme = 'light' | 'dark' | 'system';
export type AppState = { theme: AppTheme; isDarkTheme?: boolean };

export const appStore = createStore<AppState>(
  { theme: 'system' },
  {
    name: 'app',
    persist: {
      enabled: true,
      name: STORAGE_KEYS.zustand.app,
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => {
        logger.debug('App store hydration starting...');

        return (_, error) => {
          if (error) logger.error('An error occured during app store hydration!', error);
          else logger.success('App store hydration complete');
        };
      },
    },
  },
)
  .extendSelectors(({ get }) => ({
    isDarkTheme: () => get('theme') === 'dark',
  }))
  .extendActions(({ set }) => ({
    changeTheme: (theme: AppTheme) => {
      logger.debug(`changing theme to ${theme}`);

      set('theme', theme);
    },
  }));

export const {
  useState: useAppState,
  useValue: useAppValue,
  useTracked: useTrackedApp,
  useTrackedStore: useTrackedAppStore,
  useStore: useAppStore,
  set: appActions,
} = appStore;
