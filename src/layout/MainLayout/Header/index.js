import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';

// assets
import { MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import Logo from 'assets/images/icons/logo.png';
import { useNavigate } from 'react-router-dom';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const navigate = useNavigate();

  const iconBackColor = 'grey.100';
  // const iconBackColorOpen = 'grey.200';

  // common header
  const user = JSON.parse(window.localStorage.getItem('user'));
  const logOut = () => {
    window.localStorage.clear();
    navigate('/login');
  };

  const mainHeader = (
    <Toolbar style={{ width: '100%' }}>
      {!open && user?.role === 'admin' && (
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          color="secondary"
          sx={{ color: 'text.primary', bgcolor: iconBackColor, ml: { xs: 0, lg: -2 } }}
        >
          {!open && user?.role === 'admin' && <MenuUnfoldOutlined />}
        </IconButton>
      )}
      {user?.role !== 'admin' && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Box onClick={() => navigate('/projet')}>
            <img src={Logo} alt="logo" style={{ maxWidth: 200 }} />
          </Box>
          <IconButton sx={{ color: 'text.primary', bgcolor: iconBackColor, ml: { xs: 0, lg: 2 } }} onClick={() => logOut()}>
            <LogoutOutlined />
          </IconButton>
        </Box>
      )}
      {user?.role === 'admin' && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <IconButton sx={{ color: 'text.primary', bgcolor: iconBackColor, ml: { xs: 0, lg: 2 } }} onClick={() => logOut()}>
            <LogoutOutlined />
          </IconButton>
        </Box>
      )}
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: 70

      // boxShadow: theme.customShadows.z1
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
