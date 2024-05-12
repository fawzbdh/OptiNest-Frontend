import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

import ProtectedRoutes from './ProtectedRoutes';

// render - dashboard

// render - sample page

// render - utilities
const Feedback = Loadable(lazy(() => import('pages/feedback/feedback')));

// ==============================|| MAIN ROUTING ||============================== //

const FeedbackRoute = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      path: 'feedback',
      children: [
        {
          path: ':projectId',
          element: <Feedback />
        }
      ]
    }
  ]
};

export default FeedbackRoute;
