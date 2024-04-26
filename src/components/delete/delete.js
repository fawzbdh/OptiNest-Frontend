import React from 'react';
import DeleteIcon from 'assets/images/icons/delete.svg';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import Swal from 'sweetalert2'; // Import Swal

function DeleteItem({ toggleDeleteDrawer, toggleDrawer, selectedUser }) {
  const handleDelete = () => {
    toggleDeleteDrawer(); // Close the delete drawer
    toggleDrawer(selectedUser);
    Swal.fire({
      // Show SweetAlert
      icon: 'success',
      title: 'Suppression réussie!',
      text: `Le profil de ${selectedUser.first_name} ${selectedUser.last_name} a été supprimé avec succès.`
    });
    // Handle delete operation here using selectedUser
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
        Suppression du profil de {selectedUser.first_name} {selectedUser.last_name}
      </Typography>
      <Typography variant="body1" style={{ fontStyle: 'italic', marginTop: '10px' }}>
        La suppression d’un profil d’utilisateur est définitive, tous les détails et l’achat seront supprimés
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button style={{ borderRadius: '20px', color: '#222C60', borderColor: '#222C60' }} onClick={toggleDeleteDrawer} variant="outlined">
          Annuler
        </Button>
        <Box mr={2}></Box>
        <Button style={{ borderRadius: '20px', backgroundColor: '#ED2E7E' }} variant="contained" color="primary" onClick={handleDelete}>
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
    first_name: PropTypes.string.isRequired, // Validate selectedUser's first_name as a string and required
    last_name: PropTypes.string.isRequired // Validate selectedUser's last_name as a string and required
    // Add validation for other properties of selectedUser if needed
  }).isRequired // Ensure selectedUser is an object and required
};

export default DeleteItem;
