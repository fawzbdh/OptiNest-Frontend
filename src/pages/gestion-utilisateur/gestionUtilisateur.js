import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Drawer, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import DashboardHeader from './title';
import UserCards from './userCards';
import MainCard from 'components/MainCard';
import { fetchUsers, signupUser } from 'store/reducers/authSlice';

function GestionUtilisateurs() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ username: '', email: '', role: '', password: '' });
  const [errors, setErrors] = React.useState({});
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!newUser.username) {
      newErrors.username = "Nom d'utilisateur requis";
      isValid = false;
    }

    if (!newUser.email) {
      newErrors.email = 'Email requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Adresse email invalide';
      isValid = false;
    }
    if (!newUser.role) {
      newErrors.role = 'Rôle requis';
      isValid = false;
    }
    if (!newUser.password) {
      newErrors.password = 'Mot de passe requis';
      isValid = false;
    } else if (newUser.password.length < 6) {
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(signupUser(newUser))
        .unwrap()
        .then((data) => {
          console.log('Données de réponse :', data);
          Swal.fire('Succès', 'Inscription réussie !', 'success');
        })
        .catch((error) => {
          Swal.fire('Erreur', error.errors[0].msg || 'Une erreur est survenue', 'error');
        });

      // Réinitialiser le formulaire et fermer le tiroir
      setNewUser({ username: '', email: '', role: '', password: '' });
      setIsDrawerOpen(false);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MainCard>
        <Box m="8px 0 0 0" width="100%" height="80vh">
          <DashboardHeader title={'Gérer les utilisateurs'} />
          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => setIsDrawerOpen(true)}
            variant="contained"
            color="primary"
            style={{ marginBottom: '50px', marginTop: '50px' }}
          >
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
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '10px' }}>
                  <Typography variant="h4">Nouvel utilisateur</Typography>
                  <Typography sx={{ color: '#A0A3BD' }} variant="subtitle1">
                    Entrez les détails de l&apos;utilisateur
                  </Typography>
                </div>
              </div>
              <Box m={2} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={() => setIsDrawerOpen(false)}
                  style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60' }}
                  variant="outlined"
                >
                  Annuler
                </Button>
                <Box mr={2}></Box>
                <Button
                  sx={{ textTransform: 'none' }}
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
                Détails de l&apos;utilisateur
              </Typography>
            </Box>
            <Box p={2} width="100%">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nom d'utilisateur"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={errors.username !== undefined}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={errors.email !== undefined}
                    helperText={errors.email}
                  />
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
                      error={errors.role !== undefined}
                    >
                      <MenuItem value="">Sélectionner un rôle</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="utilisateur">Utilisateur</MenuItem>
                    </Select>
                    {errors.role && (
                      <Typography variant="caption" color="error">
                        {errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Mot de passe"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={errors.password !== undefined}
                    helperText={errors.password}
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
