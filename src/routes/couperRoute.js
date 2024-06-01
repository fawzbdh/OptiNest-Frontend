import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

import ProtectedRoutes from './ProtectedRoutes';

// render - dashboard

// render - sample page

// render - utilities
const Couper = Loadable(lazy(() => import('pages/couper/Couper')));

// ==============================|| MAIN ROUTING ||============================== //

const CouperRoute = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      path: 'couper',
      children: [
        {
          path: ':projectId',
          element: <Couper />
        }
      ]
    }
  ]
};

export default CouperRoute;
