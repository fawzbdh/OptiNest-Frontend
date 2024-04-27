// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'gestion-utilisateurs',
      title: 'Gestion des utilisateurs',
      type: 'item',
      url: '/gestion-utilisateurs',
      icon: icons.ProfileOutlined
    }
  ]
};

export default pages;
