import { Typography, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import PropTypes from 'prop-types';

const DashboardHeader = ({ title }) => (
  <>
    <Typography sx={{ fontFamily: 'Poppins' }} variant="h3">
      {title}
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ color: '#A0A3BD' }} variant="h6">
        Optinest
      </Typography>
      <Box sx={{ mx: 1 }}>
        {' '}
        <CircleIcon sx={{ fontSize: 10, color: 'blue' }} /> {/* Assuming CircleIcon is a custom component */}
      </Box>
      <Typography sx={{ color: '#A0A3BD' }} variant="h6">
        {title}
      </Typography>
    </Box>
  </>
);
DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired
};
export default DashboardHeader;
