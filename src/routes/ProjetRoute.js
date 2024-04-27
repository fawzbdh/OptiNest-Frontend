import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProjetSuivi from 'pages/projet/Projetsuivi';

// render - dashboard

// render - sample page

// render - utilities
const Projet = Loadable(lazy(() => import('pages/projet/Projet')));

// ==============================|| MAIN ROUTING ||============================== //

const ProjetRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Projet />
    },

    {
      path: 'Projet',
      children: [
        {
          path: 'default',
          element: <Projet />
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
