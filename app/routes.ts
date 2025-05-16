import { index, layout, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('components/layouts/authed.tsx', [
    route('login', 'routes/login.tsx'),
    route('signup', 'routes/signup.tsx'),
  ]),
  layout('components/layouts/unauthenticated.tsx', [route('dashboard', 'routes/dashboard.tsx')]),
] satisfies RouteConfig;
