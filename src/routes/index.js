import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import ProjetRoute from './ProjetRoute';
import StepperRoute from './StepperRoutes';
import GestionRoute from './GestionRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([ProjetRoute, LoginRoutes, StepperRoute, GestionRoute]);
}
