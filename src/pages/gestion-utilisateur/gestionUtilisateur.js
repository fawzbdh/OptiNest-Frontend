import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUser } from 'utils/usersApi';
import { Box, Button, TextField, Drawer, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Swal from 'sweetalert2';
import DashboardHeader from './title';
import UserCards from './userCards';
import MainCard from 'components/MainCard';

function GestionUtilisateurs() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});

  const [newUser, setNewUser] = React.useState({ username: '', email: '', role: '' });
  const handleAddUser = () => {
    setSelectedUser({ username: '', email: '', role: '' });

    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditDrawerOpen(false);
  };
  // const handleEditUser = (user) => {
  //   setSelectedUser(user); // Set the selected user to populate the form fields
  //   setIsEditDrawerOpen(true);
  // };
  const handleEditDrawerClose = () => {
    setSelectedUser({ username: '', email: '', role: '' });
    setIsEditDrawerOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const handleSubmit = () => {
    // Handle form submission, e.g., dispatch an action to add the new user
    console.log('New User:', newUser);
    dispatch(createUser(newUser));
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'utilisateur created successfully'
    });
    dispatch(fetchUser());

    // Reset the form and close the drawer
    setNewUser({ username: '', email: '', role: '' });
    setIsDrawerOpen(false);
  };
  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainCard>
        <Box m="8px 0 0 0" width="100%" height="80vh">
          <DashboardHeader title={'Gérer les utilisateurs'} />
          <Button onClick={handleAddUser} variant="contained" color="primary" style={{ marginBottom: '50px', marginTop: '50px' }}>
            Ajouter un utilisateur
          </Button>
          <Drawer
            sx={{
              width: '40vw',
              zIndex: 1300,
              '& .MuiDrawer-paper': {
                width: '40vw',
                minWidth: '360px'
              }
            }}
            anchor="right"
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '10px' }}>
                  <Typography variant="h4">Nouveau utilisateur</Typography>
                  <Typography sx={{ color: '#A0A3BD' }} variant="subtitle1">
                    Entrez les détails du utilisateur
                  </Typography>
                </div>
              </div>
              <Box m={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={close} style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60' }} variant="outlined">
                  Annuler
                </Button>
                <Box mr={2}></Box>
                <Button
                  onClick={handleSubmit}
                  style={{ borderRadius: '20px', backgroundColor: '#00BA88' }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Publier
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', ml: 2, mt: 5 }}>
              <Typography
                sx={{
                  color: '#A0A3BD',
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '28px',
                  letterSpacing: '0.75px',
                  textTransform: 'uppercase'
                }}
                variant="subtitle1"
              >
                détails du utilisateurs
              </Typography>
            </Box>
            <Box p={2} width="100%">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nom utilisateur"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Email" name="email" value={newUser.email} onChange={handleChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      value={newUser.role}
                      onChange={handleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="utilisateur">Utilisateur</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="mot de passe"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Drawer>
          <Drawer
            sx={{
              width: '40vw',
              zIndex: 1300,
              '& .MuiDrawer-paper': {
                width: '40vw',
                minWidth: '360px'
              }
            }}
            anchor="right"
            open={isEditDrawerOpen}
            onClose={handleEditDrawerClose}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '10px' }}>
                  <Typography variant="h4">Modifier utilisateur</Typography>
                  <Typography sx={{ color: '#A0A3BD' }} variant="subtitle1">
                    Entrez les détails du utilisateur
                  </Typography>
                </div>
              </div>
              <Box m={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  onClick={handleEditDrawerClose}
                  style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60' }}
                  variant="outlined"
                >
                  Annuler
                </Button>
                <Box mr={2}></Box>
                <Button
                  onClick={handleSubmit}
                  style={{ borderRadius: '20px', backgroundColor: '#F1BE15' }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Modifier
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', ml: 2, mt: 5 }}>
              <Typography
                sx={{
                  color: '#A0A3BD',
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '28px',
                  letterSpacing: '0.75px',
                  textTransform: 'uppercase'
                }}
                variant="subtitle1"
              >
                détails du utilisateurs
              </Typography>
            </Box>
            <Box p={2} width="100%">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nom utilisateur"
                    name="username"
                    value={selectedUser.username || newUser.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={selectedUser.email || newUser.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Rôle"
                    name="role"
                    value={selectedUser.role || newUser.role}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Drawer>
          <UserCards users={users} />
        </Box>
      </MainCard>
    </div>
  );
}
export default GestionUtilisateurs;
