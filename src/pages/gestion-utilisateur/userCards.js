import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Avatar, IconButton, Typography, Box, Chip, Drawer, Button, TextField } from '@mui/material';
import { Formik, Form } from 'formik'; // Import Formik components
import circleUser from 'assets/images/icons/circle-user.png';
import CloseIcon from '@mui/icons-material/Close';
import DeleteItem from 'components/delete/delete';

function UserCards({ users }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ username: '', email: '', role: '' }); // Initialize selectedUser with a new UsersModel instance
  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false);
  const toggleDeleteDrawer = () => {
    setDeleteDrawerOpen(!deleteDrawerOpen);
  };

  const toggleDrawer = (user) => {
    console.log(user);
    setSelectedUser(user);
    setOpenDrawer(!openDrawer);
  };

  const handleSubmit = (values) => {
    console.log(values); // Handle form data submission
  };
  const inputStyles = {
    '& .MuiFilledInput-root': {
      color: '#6E7191',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      borderColor: 'transparent',
      backgroundColor: '#EFF0F6',
      borderRadius: '18px',
      '&:before': {
        borderColor: 'transparent',
        borderWidth: '2px'
      },
      '&:after': {
        borderWidth: '2px',

        borderColor: 'transparent'
      }
    },
    '& .MuiInputLabel-filled': {
      color: '#6E7191',
      fontWeight: 'bold',
      '&.Mui-focused': {
        borderWidth: '2px',
        color: '#6E7191',

        borderColor: 'transparent',
        fontWeight: 'bold'
      }
    },
    '&:hover .MuiFilledInput-root': {
      borderColor: 'transparent',
      backgroundColor: '#EFF0F6',

      '&:before': {
        borderWidth: '2px',

        borderColor: 'transparent'
      }
    },
    '&:hover .MuiInputLabel-filled': {
      '&.Mui-focused': {
        borderWidth: '2px',
        backgroundColor: '#EFF0F6',

        borderColor: 'transparent'
      }
    }
  };

  const getRandomColor = () => {
    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
      '#ffc107',
      '#ff9800',
      '#ff5722',
      '#795548',
      '#9e9e9e',
      '#607d8b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  console.log('selected :  ', selectedUser);
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <Card onClick={() => toggleDrawer(user)} sx={{ backgroundColor: '#F7F7FC', cursor: 'pointer' }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item xs>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box mt={2}></Box>

                    <Avatar
                      sx={{
                        height: '80px',
                        width: '80px',
                        backgroundColor: getRandomColor(),
                        color: '#fff' // You may need to adjust the text color based on the background color
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box mt={2}></Box>
                    <Typography variant="h5">{user.username}</Typography>

                    <Typography variant="subtitle1" color="textSecondary">
                      {user.role}
                    </Typography>
                    <Box mt={1}></Box>

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
                  backgroundColor: getRandomColor(),
                  color: '#fff' // You may need to adjust the text color based on the background color
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

          {/* Formik form */}
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="username"
                      variant="filled"
                      type="text"
                      label="Nom d'utilisateur"
                      sx={inputStyles}
                      fullWidth
                      margin="normal"
                      value={values.username}
                      onChange={handleChange}
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="email"
                      variant="filled"
                      type="text"
                      label="Email"
                      sx={inputStyles}
                      fullWidth
                      margin="normal"
                      value={values.email}
                      onChange={handleChange}
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="role"
                      variant="filled"
                      type="text"
                      sx={inputStyles}
                      label="Role"
                      fullWidth
                      margin="normal"
                      value={values.role}
                      onChange={handleChange}
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>
      {/* Delete Confirmation Drawer */}
      <Drawer
        anchor="right"
        open={deleteDrawerOpen}
        onClose={toggleDeleteDrawer}
        sx={{
          width: '50vw',
          zIndex: 1301, // higher zIndex than the main drawer to display on top
          '& .MuiDrawer-paper': {
            width: '50vw',
            minWidth: '500px'
          }
        }}
      >
        {/* Content of the delete confirmation drawer */}
        <Box sx={{ width: '100%', p: 2 }}>
          <DeleteItem toggleDrawer={toggleDrawer} selectedUser={selectedUser} toggleDeleteDrawer={toggleDeleteDrawer} />
        </Box>
      </Drawer>
    </Grid>
  );
}

UserCards.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserCards;
