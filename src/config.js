// ==============================|| THEME CONFIG  ||============================== //
const user = JSON.parse(localStorage.getItem('user'));

const config = {
  defaultPath: '/projet/',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
export const drawerWidth = user?.role !== 'admin' ? 0 : 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
