import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
  Drawer,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { Formik, Form } from 'formik';
import circleUser from 'assets/images/icons/circle-user.png';
import CloseIcon from '@mui/icons-material/Close';
import DeleteItem from 'components/delete/delete';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateUser } from 'store/reducers/authSlice';

function UserCards({ users }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false);
  const [userColors, setUserColors] = useState({});

  const toggleDeleteDrawer = () => {
    setDeleteDrawerOpen(!deleteDrawerOpen);
  };

  const dispatch = useDispatch();

  const toggleDrawer = (user) => {
    console.log(user);
    setSelectedUser(user);
    setOpenDrawer(!openDrawer);
  };

  const handleSubmit = (values) => {
    console.log('Values:', values);
    dispatch(updateUser({ userId: selectedUser.id, userData: values }))
      .unwrap()
      .then((data) => {
        console.log('Données de sélection :', data);
        setOpenDrawer(false);
        Swal.fire('Succès', 'Utilisateur mis à jour', 'success');
      })
      .catch((error) => {
        let errorMessage = 'Une erreur est survenue'; // Default error message

        // Check if the error object has errors array and extract the error message
        if (error.errors && error.errors.length > 0) {
          errorMessage = error.errors[0].msg;
        }
        if (error.message) {
          // If the error has a response and data, extract the error message
          errorMessage = error.message;
        }

        Swal.fire('Erreur', errorMessage, 'error');
      });
  };

  const handleDelete = () => {
    toggleDeleteDrawer();
    toggleDrawer(selectedUser);
  };

  const getRandomColor = (userId) => {
    if (!userColors[userId]) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      setUserColors((prevColors) => ({ ...prevColors, [userId]: color }));
    }
    return userColors[userId];
  };

  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <Card onClick={() => toggleDrawer(user)} sx={{ backgroundColor: '#F7F7FC', cursor: 'pointer' }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item xs>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Avatar
                      sx={{
                        height: '80px',
                        width: '80px',
                        backgroundColor: getRandomColor(user.id),
                        color: '#fff'
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h5">{user.username}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {user.role}
                    </Typography>
                    <Chip
                      variant="combined"
                      icon={<img src={circleUser} alt="user" />}
                      label={`Actif`}
                      sx={{ ml: 1.25, pl: 1, borderRadius: '16px', color: '#00BA88', backgroundColor: '#F2FFFB' }}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => toggleDrawer(selectedUser)}
        sx={{
          width: '50vw',
          zIndex: 1300,
          '& .MuiDrawer-paper': {
            width: '50vw',
            minWidth: '500px'
          }
        }}
      >
        <Formik
          initialValues={{
            username: selectedUser?.username || '',
            role: selectedUser?.role || '',
            email: selectedUser?.email || ''
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Box sx={{ width: '100%', p: 2 }}>
                <Box m={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                  <IconButton onClick={() => toggleDrawer(selectedUser)}>
                    <Avatar sx={{ backgroundColor: '#EFF0F6' }}>
                      <CloseIcon sx={{ color: '#222C60' }} />
                    </Avatar>
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        height: '70px',
                        width: '70px',
                        backgroundColor: getRandomColor(selectedUser.id),
                        color: '#fff'
                      }}
                    >
                      {selectedUser?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div style={{ marginLeft: '10px' }}>
                      <Typography variant="h6">{selectedUser?.username}</Typography>
                      <Typography variant="subtitle1">{selectedUser?.role}</Typography>
                    </div>
                  </div>
                  <Box m={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60' }} type="submit" variant="outlined">
                      Modifier
                    </Button>
                    <Box mr={2}></Box>
                    <Button
                      style={{ borderRadius: '20px', backgroundColor: '#ED2E7E' }}
                      onClick={toggleDeleteDrawer}
                      variant="contained"
                      color="primary"
                    >
                      Supprimer
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="username"
                      type="text"
                      label="Nom d'utilisateur"
                      fullWidth
                      margin="normal"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      type="text"
                      label="Email"
                      fullWidth
                      margin="normal"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="utilisateur">utilisateur</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Drawer>
      {/* Delete Confirmation Drawer */}
      <Drawer
        anchor="right"
        open={deleteDrawerOpen}
        onClose={toggleDeleteDrawer}
        sx={{
          width: '50vw',
          zIndex: 1301,
          '& .MuiDrawer-paper': {
            width: '50vw',
            minWidth: '500px'
          }
        }}
      >
        <Box sx={{ width: '100%', p: 2 }}>
          {selectedUser && (
            <DeleteItem
              toggleDeleteDrawer={toggleDeleteDrawer}
              toggleDrawer={toggleDrawer}
              selectedUser={selectedUser}
              onDelete={handleDelete}
            />
          )}{' '}
        </Box>
      </Drawer>
    </Grid>
  );
}

UserCards.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserCards;
