import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjectById, updateProject } from 'store/reducers/projectReducer';
import Swal from 'sweetalert2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { addfeedback, deletefeedack, getfeedback, updateFeedback } from 'store/reducers/feedbackSlice';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import EditIcon from '@mui/icons-material/Edit';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

function Feedback() {
  const { projectId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [edititem, setEditItem] = React.useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const handeledit = (item) => {
    setFeedback(item.description);
    setEdit(true);
    setOpen(true);
  };
  const { feedbacks } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfeedback({ projectid: projectId }));
  }, [dispatch, projectId]);
  console.log(feedbacks);
  const handleSubmit = () => {
    handleClose();
    !edit
      ? dispatch(addfeedback({ ProjectId: projectId, description: feedback, UserId: user.id }))
          .unwrap()
          .then(() => {
            Swal.fire('Success', 'Feedback submitted successfully', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
          })
      : dispatch(updateFeedback({ id: edititem.id, feedbackData: { ...edititem, description: feedback } }))
          .unwrap()
          .then(() => {
            Swal.fire('Success', 'Feedback updated successfully', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', error.message, 'error');
          });
    setFeedback('');
  };
  const handleDeleteFeedback = (id) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce feedback ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('feedack supprimé :', id);
        // Dispatch deleteProject action
        dispatch(deletefeedack(id))
          .unwrap()
          .then((data) => {
            console.log('feedack supprimé :', data);
            Swal.fire('Succès', 'Feedback supprimé avec succès !', 'success');
          })
          .catch((error) => {
            // Handle error
            let errorMessage = 'Une erreur est survenue lors de la suppression du feedack.';
            if (error.errors && error.errors.length > 0) {
              errorMessage = error.errors[0].msg;
            }
            if (error.message) {
              errorMessage = error.message;
            }
            Swal.fire('Erreur', errorMessage, 'error');
          });
      }
    });
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          style={{ marginTop: '20px', borderRadius: '15px', backgroundColor: '#28DCE7', marginBottom: '10px' }}
          onClick={handleOpen}
        >
          <AddCircleIcon />
          Ajouter un Feedback
        </Button>
      </div>
      {/* modale  */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b> {edit ? 'Modifier feedback' : 'Ajouter un nouveau feedback'}</b>
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Feedback"
              multiline
              rows={4}
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              fullWidth
              style={{ marginTop: 16 }}
            />
            <Button variant="contained" type="submit" style={{ marginTop: 16 }}>
              Submit Feedback
            </Button>
          </form>
        </Box>
      </Modal>
      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {feedbacks.map((item) => (
          <MainCard key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p>Feedback by: {item?.User?.username}</p>
                <p>{item.description}</p>
              </div>
              <div style={{ width: '50px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <DeleteIcon style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteFeedback(item.id)} />
                <EditIcon
                  style={{ cursor: 'pointer', color: 'orange' }}
                  onClick={() => {
                    setEditItem(item);
                    handeledit(item);
                  }}
                />
              </div>
            </div>
          </MainCard>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
