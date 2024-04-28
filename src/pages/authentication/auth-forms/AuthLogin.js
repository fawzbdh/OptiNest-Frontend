import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
  FormHelperText
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import Logo from 'assets/images/logo/logo.png';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from 'assets/images/icons/logo.png';

function AuthLogin() {
  // Initial state values for email, password, and "save session" checkbox

  const [showPassword, setShowPassword] = React.useState(false);
  const [saveSession, setSaveSession] = React.useState(false);
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState(null);

  const handleFormSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(true);

      // Make API request to login
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        email: values.email,
        password: values.password
      });

      // If login successful, save access token to local storage
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));

      // Reset form
      setSubmitting(false);
      setLoginError(null);
      navigate('/');
      Swal.fire({
        title: 'Connexion réussie!',
        icon: 'success',
        text: 'Vous êtes maintenant connecté.'
      });

      // Redirect user or perform any other action upon successful login
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
      setLoginError(error.response?.data?.detail || 'An error occurred while logging in');
      setSubmitting(false);
      console.log(loginError);
      if (loginError === 'Invalid credentials, try again') {
        Swal.fire({
          title: 'Erreur de connexion',
          icon: 'error',
          text: 'Email ou mot de passe incorrect.'
        });
      } else {
        Swal.fire({
          title: 'Erreur de connexion',
          icon: 'error',
          text: "Une erreur s'est produite lors de la connexion."
        });
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputStyle = {
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(102, 102, 102, 0.35)',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(102, 102, 102, 0.35)',
        borderRadius: '12px'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(102, 102, 102, 0.35)',
        borderRadius: '12px'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(102, 102, 102, 0.35)',
        borderRadius: '12px'
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to left, #12cc04, #42b603,#a4f678, #FFFFFF)', // Change direction to bottom left
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Formik
        initialValues={{
          email: 'alibenbrahimpro@gmail.com',
          password: '12345678',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Grid container spacing={3} display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display={'flex'} justifyContent="center" flexDirection={'column'} alignItems={'center'}>
                <Box sx={{ mr: 10, ml: 10, alignSelf: 'flex-start' }}>
                  <img src={Logo} alt="logo" />
                </Box>
                <Box sx={{ mr: 10, ml: 10, alignSelf: 'flex-start' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: '24px',
                      lineHeight: '36px',
                      color: '#4E4B66'
                    }}
                    variant="body1"
                    gutterBottom
                  >
                    Découpez avec ingéniosité, optimisez chaque millimètre
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid align="center" item xs={12} md={6}>
              <Card
                sx={{
                  background: '#F7F7FC',
                  padding: 4,
                  borderRadius: 4,
                  width: '80%',
                  m: 0
                }}
              >
                <CardContent sx={{ pb: 0, pt: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '32px',
                      lineHeight: '48px',
                      color: '#333333'
                    }}
                  >
                    Se connecter
                  </Typography>
                </CardContent>
                <CardContent mt={0}>
                  <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                      <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} mt={2} mb={0}>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: '#666666',
                            mt: 0,
                            alignSelf: 'flex-start'
                          }}
                          variant="subtitle1"
                          gutterBottom
                        >
                          Email
                        </Typography>
                      </Box>

                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={inputStyle}
                        required
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>

                    <Stack spacing={1} mt={2}>
                      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: '#666666'
                          }}
                          variant="subtitle1"
                          gutterBottom
                        >
                          Mot de passe
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                          {showPassword ? (
                            <Typography
                              sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '20px',
                                textAlign: 'right'
                              }}
                            >
                              Cacher
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '20px',
                                textAlign: 'right'
                              }}
                            >
                              Afficher
                            </Typography>
                          )}
                        </div>
                      </Box>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={inputStyle}
                        required
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />{' '}
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>

                    <Box sx={{ display: 'flex', alignSelf: 'flex-start' }}>
                      <FormControlLabel
                        control={
                          <Checkbox checked={saveSession} onChange={(event) => setSaveSession(event.target.checked)} color="primary" />
                        }
                        label="Enregistrer cette session"
                        sx={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px'
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Grid container justifyContent="start" alignItems="center" gap={2}>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{
                              borderRadius: '40px',
                              fontWeight: 500,
                              fontSize: '16px',
                              lineHeight: '24px',
                              color: '#FFFFFF',
                              backgroundColor: '#0A8401',
                              width: '150px',
                              '&:hover': {
                                backgroundColor: '#0A8401',
                                opacity: 0.8
                              }
                            }}
                          >
                            Se connecter
                          </Button>
                        </Grid>

                        <Grid item>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'Poppins',
                              fontWeight: 400,
                              fontSize: '12px',
                              lineHeight: '24px',
                              color: '#333333'
                            }}
                          >
                            Vous avez déjà un compte?{' '}
                            <Link href="#" component={RouterLink} underline="always" sx={{ color: '#0A8401' }}>
                              Se connecter
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
}

export default AuthLogin;
