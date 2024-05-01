import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import ProjetSuivi from 'pages/projet/Projetsuivi';
import ProjetById from 'pages/projet/ProjetById';
import ProtectedRoutes from './ProtectedRoutes';

// render - dashboard

// render - sample page

// render - utilities
const Projet = Loadable(lazy(() => import('pages/projet/Projet')));

// ==============================|| MAIN ROUTING ||============================== //

const ProjetRoute = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      path: '/',
      element: <Projet />
    },

    {
      path: 'Projet',
      children: [
        {
          path: '',
          element: <Projet />
        },
        {
          path: ':projectId',
          element: <ProjetById />
        },
        {
          path: 'suivi',
          element: <ProjetSuivi />
        }
      ]
    }
  ]
};

export default ProjetRoute;
