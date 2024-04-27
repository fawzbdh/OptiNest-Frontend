import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';

// render - login
const ListClient = Loadable(lazy(() => import('pages/gestion-utilisateur/gestionUtilisateur')));

// ==============================|| AUTH ROUTING ||============================== //

const GestionRoute = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'gestion-utilisateurs',
      element: <ListClient />
    }
  ]
};

export default GestionRoute;
