// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import

import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      <Notification />
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
