import React from 'react';
import DeleteIcon from 'assets/images/icons/delete.svg';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import Swal from 'sweetalert2'; // Import Swal
import { useDispatch } from 'react-redux';
import { deleteUser } from 'store/reducers/authSlice';

function DeleteItem({ toggleDeleteDrawer, toggleDrawer, selectedUser }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    toggleDeleteDrawer(); // Close the delete drawer
    toggleDrawer(selectedUser);
    dispatch(deleteUser(selectedUser?.id))
      .unwrap()
      .then((data) => {
        console.log('Données de réponse :', data);
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        height: '100vh'
      }}
    >
      <img width={100} height={100} src={DeleteIcon} alt="delete" />
      <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '20px' }}>
        Suppression du profil de {selectedUser?.username}
      </Typography>
      <Typography variant="body1" style={{ fontStyle: 'italic', marginTop: '10px' }}>
        La suppression d’un profil d’utilisateur est définitive, tous les détails et l’achat seront supprimés
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60', textTransform: 'none' }}
          onClick={() => toggleDeleteDrawer()}
          variant="outlined"
        >
          Annuler
        </Button>
        <Box mr={2}></Box>
        <Button
          style={{ borderRadius: '20px', textTransform: 'none', backgroundColor: '#ED2E7E' }}
          variant="contained"
          color="primary"
          onClick={handleDelete}
        >
          Supprimer
        </Button>
      </Box>
    </div>
  );
}

// PropTypes validation
DeleteItem.propTypes = {
  toggleDeleteDrawer: PropTypes.func.isRequired, // Ensure toggleDeleteDrawer is a function and required
  toggleDrawer: PropTypes.func.isRequired, // Ensure toggleDeleteDrawer is a function and required

  selectedUser: PropTypes.shape({
    username: PropTypes.string.isRequired, // Validate selectedUser's first_name as a string and required
    id: PropTypes.number.isRequired
    // Add validation for other properties of selectedUser if needed
  }).isRequired // Ensure selectedUser is an object and required
};

export default DeleteItem;
