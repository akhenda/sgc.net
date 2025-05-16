import { redirect } from 'react-router';

import { createStore } from 'zustand-x';

import { STORAGE_KEYS } from '../constants';
import { logger } from '../lib/logger';

export type User = {
  id: `SGC-${string}`;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // we'll store string passwords for now. in the real world, this would be hashed
};
export type UserSession = { userId: User['id']; token: string; expires: number };
export type AuthState = { users: User[]; session: UserSession | null };

const getExpires = () => Date.now() + 1000 * 60 * 60 * 24;
const anonymousUser: User = {
  id: 'SGC-Anon',
  firstName: 'Anonymous',
  lastName: 'Legion',
  email: '',
  password: '',
};

export const authStore = createStore<AuthState>(
  { users: [anonymousUser], session: null },
  {
    name: 'auth',
    mutative: true,
    persist: {
      enabled: true,
      name: STORAGE_KEYS.zustand.auth,
      partialize: (state) => ({ users: state.users, session: state.session }),
      onRehydrateStorage: () => {
        logger.debug('Auth store hydration starting...');

        return (_, error) => {
          if (error) logger.error('An error occured during auth store hydration!', error);
          else logger.success('Auth store hydration complete');
        };
      },
    },
  },
)
  .extendSelectors(({ get }) => ({
    user: () => get('users').find((u) => u.id === get('session')?.userId),
  }))
  .extendSelectors(({ get }) => ({
    user: () => get('users').find((u) => u.id === get('session')?.userId),
    isLoggedIn: () => {
      const session = get('session');

      if (session === null) return false;

      const user = get('user');

      return !!(session !== null && session.expires > Date.now() && user);
    },
  }))
  .extendActions(({ get, set }) => ({
    logout: () => {
      logger.debug('logging out...');

      set('session', null);
      redirect('/');

      logger.success('Logged out successfully').toast();
    },
    login: (email: string, password: string) => {
      logger.debug('logging in...', { email, password });

      const user = get('users').find((u) => u.email === email && u.password === password);

      if (!user) {
        logger.error('User not found').toast();
        return;
      }

      const token = `${email}-${password}`;

      set('session', { userId: user.id, token, expires: getExpires() });
      redirect('/dashboard');
    },
    loginAnonymously: () => {
      logger.debug('logging in anonymously...');

      set('session', { userId: 'SGC-Anon', token: 'anonymous', expires: getExpires() });
      redirect('/dashboard');
    },
  }))
  .extendActions(({ set, actions: { login } }) => ({
    signup: (user: User) => {
      logger.debug('signing up...', user);

      set('state', (draft) => {
        if (!draft.users) draft.users = [];

        draft.users.push(user);
      });

      login(user.email, user.password);
    },
  }));

export const {
  useState: useAuthState,
  useValue: useAuthValue,
  useTracked: useTrackedAuth,
  useTrackedStore: useTrackedAuthStore,
  useStore: useAuthStore,
  set: authActions,
} = authStore;
