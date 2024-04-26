import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import DashboardHeader from 'layout/MainLayout/Header/title';
import UserCards from './userCards';
import { Button, Box, Tab, Tabs, Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from 'utils/api';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchRequests } from 'utils/requestApi';
import PendingUsers from './pendingUser';
import UpdateRequest from './updateRequest';
import AddClient from './addClient';

const ListClient = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const loading = useSelector((state) => state.user.loading);
  const status = useSelector((state) => state.user.status);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { requests, loadingRequests } = useSelector((state) => state.request);
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const navigate = useNavigate();
  const [value, setValue] = useState(0); // State for tab value
  const filterUsers = (users) => {
    return users.filter((user) => user.is_verified && user.is_register_device);
  };
  const pendingUsers = (users) => {
    return users.filter((user) => user.is_verified === false);
  };
  const users = filterUsers(userData.users);
  const pendingsers = pendingUsers(userData.users);

  const newRequests = requests.filter((request) => request.guest.registered_imei === null);
  const updateRequests = requests.filter(
    (request) => request.guest.registered_imei !== null && request.guest.registered_imei !== request.registered_imei
  );
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading || loadingRequests) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={48} />
        <p style={{ marginLeft: '12px' }}>Loading user data...</p>
      </div>
    );
  }
  if (status === 401) {
    return navigate('/login');
  }
  if (!users || users.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <MainCard>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <div>
          {' '}
          <DashboardHeader title="Gérer les clients" />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '16px'
          }}
        >
          <Button
            style={{ height: '48px', width: '120px', borderRadius: '25px', color: 'white', backgroundColor: '#222C60', marginRight: '8px' }}
            variant="contained"
            onClick={openDrawer}
          >
            Nouveau
          </Button>
        </div>
      </Box>
      <Box mt={2}>
        <Tabs variant="fullWidth" style={{ width: '100%' }} value={value} onChange={handleChange} centered>
          {' '}
          <Tab
            xs={6}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ marginRight: '8px', color: 'black' }}>Clients Actif</p>{' '}
                <Box
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {users.length}
                </Box>{' '}
              </Box>
            }
          />
          <Tab
            xs={6}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ marginRight: '8px', color: 'black' }}>Nouveaux clients</p>{' '}
                <Box
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {newRequests.length}
                </Box>{' '}
              </Box>
            }
          />{' '}
          <Tab
            xs={6}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ marginRight: '8px', color: 'black' }}>Demande changement de téléphone</p>{' '}
                <Box
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {updateRequests.length}
                </Box>{' '}
              </Box>
            }
          />{' '}
          <Tab
            xs={6}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ marginRight: '8px', color: 'black' }}>client en attente</p>{' '}
                <Box
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {pendingsers.length}
                </Box>{' '}
              </Box>
            }
          />{' '}
          {/* Add additional tabs as needed */}
        </Tabs>
        {value === 0 /* Render UserCards component only if first tab is active */ && (
          <Box mt={2}>
            <UserCards users={users} />
          </Box>
        )}
        {value === 1 /* Render content for the second tab */ && (
          <Box mt={2}>
            <PendingUsers request={newRequests} />
          </Box>
        )}
        {value === 2 /* Render content for the second tab */ && (
          <Box mt={2}>
            <UpdateRequest request={updateRequests} />
          </Box>
        )}
        {value === 3 /* Render content for the second tab */ && (
          <Box mt={2}>
            <UserCards users={pendingsers} />
          </Box>
        )}
      </Box>
      <Drawer
        title="Nouveau"
        anchor="right"
        sx={{
          width: '50vw',
          zIndex: 1300,
          '& .MuiDrawer-paper': {
            width: '50vw',
            minWidth: '360px'
          }
        }}
        onClose={closeDrawer} // Close drawer when clicked outside or on close button
        open={drawerOpen}
      >
        <AddClient close={closeDrawer} />
      </Drawer>
    </MainCard>
  );
};

export default ListClient;
