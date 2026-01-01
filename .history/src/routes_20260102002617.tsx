import SafeRoute from './pages/SafeRoute';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'SafeRoute',
    path: '/',
    element: <SafeRoute />
  }
];

export default routes;
