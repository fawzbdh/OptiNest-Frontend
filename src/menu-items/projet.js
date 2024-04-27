// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const projet = {
  id: 'group-projet',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'projet',
      title: 'Projets',
      type: 'item',
      url: '/projet/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default projet;
