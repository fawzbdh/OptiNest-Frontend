// assets
import { ProjectOutlined } from '@ant-design/icons';

// icons
const icons = {
  ProjectOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const projetSuivi = {
  id: 'group-projet-suivi',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'projetsuivi',
      title: 'Suivi projet',
      type: 'item',
      url: '/projet/suivi',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    }
  ]
};

export default projetSuivi;
