import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';

// render - login
const StepperPage = Loadable(lazy(() => import('pages/stepper/StepperPage')));

// ==============================|| AUTH ROUTING ||============================== //

const StepperRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'stepper',
      element: <StepperPage />
    }
  ]
};

export default StepperRoute;
