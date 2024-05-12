import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById, updateProject } from 'store/reducers/projectReducer';
import Swal from 'sweetalert2';

function Feedback() {
  const { projectId } = useParams();
  const [feedback, setFeedback] = useState('');

  const { project } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [dispatch, projectId]);
  useEffect(() => {
    if (project) {
      setFeedback(project.feedback || ''); // If project feedback exists, populate the feedback state, otherwise set it to an empty string
    }
  }, [project]);

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Feedback submitted:', feedback);
    dispatch(updateProject({ id: projectId, feedback }))
      .unwrap()
      .then(() => {
        Swal.fire('Success', 'Feedback submitted successfully', 'success');
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
    // Optionally, you can reset the form state after submission
    setFeedback('');
  };

  return (
    <MainCard>
      <Typography variant="h4">{project?.name}</Typography>
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
    </MainCard>
  );
}

export default Feedback;
