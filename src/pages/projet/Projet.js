import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, deleteProject, fetchprojectByUserId, updateProject } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { DatePicker } from 'antd';
import InputAdornment from '@mui/material/InputAdornment';

import { OutlinedInput, Box, CircularProgress } from '@mui/material';
const { RangePicker } = DatePicker;
function Projet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState(['', '']);
  const [confirmationState, setConfirmationState] = useState({}); // Track the confirmation state for each file

  const { projects, loading, error } = useSelector((state) => state.project);
  const handleDeleteProjet = (fileId) => {
    dispatch(deleteProject(fileId))
      .unwrap()
      .then((data) => {
        console.log('Projet supprimé :', data);
        // Handle success
        Swal.fire('Succès', 'Projet supprimé avec succès !', 'success');
      })
      .catch((error) => {
        // Handle error
        let errorMessage = 'Une erreur est survenue lors de la suppression du projet.';
        if (error.errors && error.errors.length > 0) {
          errorMessage = error.errors[0].msg;
        }
        if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire('Erreur', errorMessage, 'error');
      });
    setConfirmationState((prevState) => ({
      ...prevState,
      [fileId]: false
    }));
  };
  const handleNouveauProjetClick = () => {
    dispatch(createProject({})) // Dispatch the createProject action
      .then((data) => {
        console.log('Response data:', data); // Log the response data to see its structure
        const projectId = data.payload.id; // Access the ID from the data
        navigate(`/projet/${projectId}`); // Navigate to the project details page with the ID
        console.log('Nouveau projet created', projectId);
      })
      .catch((error) => {
        console.error('Error creating project:', error);
      });
  };

  useEffect(() => {
    dispatch(fetchprojectByUserId());
  }, [dispatch]);

  const handleEditCellChange = (params) => {
    const { id, field, value } = params;
    // Dispatch action to update project with new data
    dispatch(updateProject({ id, [field]: value }))
      .then(() => {
        console.log('Project updated successfully');
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  const toggleConfirmDelete = (fileId) => {
    setConfirmationState((prevState) => ({
      ...prevState,
      [fileId]: !prevState[fileId]
    }));
  };

  if (loading === true) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error === 'Request failed with status code 401') {
    return navigate('/login');
  }
  const columns = [
    {
      field: 'name',
      headerName: 'Nom projet',
      width: 200,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedInput
            type="text"
            id={params.id}
            name={params.field}
            placeholder={'Nom du projet'}
            value={params.value}
            onChange={(event) => handleEditCellChange({ ...params, value: event.target.value })}
            style={{
              width: '100%',
              height: '40px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '5px'
            }}
            endAdornment={
              <InputAdornment position="end">
                <EditIcon sx={{ cursor: 'pointer', color: '#28DCE7', fontSize: '20px' }} onClick={() => handleEditCellChange(params)} />
              </InputAdornment>
            }
          />
        </div>
      )
    },

    {
      field: 'createdAt',
      headerName: 'Date de creation',
      valueGetter: (value, row) => moment(row.createdAt).format('YYYY-MM-DD'),
      width: 200
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
          {params.row.status === 'Ebauche' && (
            <Button
              variant="outlined"
              onClick={() => {
                navigate('/projet/' + params.row.id);
              }}
              sx={{
                marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                color: '#28DCE7',
                border: '1px solid #28DCE7',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#28DCE7',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              startIcon={<ArrowRightIcon />}
            >
              Réprendre
            </Button>
          )}
          {params.row.status === 'Prêt' && (
            <Button
              variant="outlined"
              sx={{
                marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                textTransform: 'none',
                color: '#28DCE7',
                border: '1px solid #28DCE7',
                '&:hover': {
                  backgroundColor: '#28DCE7',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              startIcon={<CheckIcon />}
              onClick={async () => {
                await dispatch(updateProject({ id: params.row.id, steps: 3 }));
                navigate('/projet/' + params.row.id);
              }}
            >
              Résultat
            </Button>
          )}

          {params.row.status === 'Prêt' && (
            <Button
              sx={{
                marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                textTransform: 'none',
                color: '#C1B100',
                border: '1px solid #C1B100',
                '&:hover': {
                  backgroundColor: '#C1B100',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              onClick={async () => {
                await dispatch(updateProject({ id: params.row.id, steps: 2 }));
                navigate('/projet/' + params.row.id);
              }}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              Editer
            </Button>
          )}
          {!confirmationState[params.row.id] ? (
            <DeleteIcon
              sx={{ color: 'red', marginLeft: '10px', cursor: 'pointer', alignSelf: 'self' }}
              onClick={() => toggleConfirmDelete(params.row.id)}
            />
          ) : (
            <>
              <Button
                sx={{ cursor: 'pointer', textTransform: 'none', color: 'grey', borderRadius: '20px' }}
                variant="outlined"
                onClick={() => toggleConfirmDelete(params.row.id)}
              >
                Annuler
              </Button>
              <Button
                sx={{ cursor: 'pointer', textTransform: 'none', color: 'white', backgroundColor: 'red', borderRadius: '20px' }}
                variant="contained"
                onClick={() => handleDeleteProjet(params.row.id)}
              >
                Confirmer
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const onChange = (date, dateString) => {
    setFilterDate(dateString);
  };
  return (
    <MainCard>
      <Typography variant="h3">Projets</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={handleNouveauProjetClick}
          sx={{ borderRadius: '20px', textTransform: 'none', backgroundColor: '#28DCE7', marginTop: '20px', marginBottom: '20px' }}
          variant="contained"
        >
          Nouveau projet
        </Button>
        <RangePicker onChange={onChange} />
      </div>
      <DataGrid
        onEditCellChange={handleEditCellChange}
        pagination
        initialState={{
          ...projects.initialState,
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
        sx={{
          width: '99%',
          padding: '20px',
          margin: 'auto',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontSize: '18px',
            fontWeight: 'bold'
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            fontSize: '16px' // Change the font size of the content here
          }
        }}
        rows={projects.filter((item) =>
          filterDate[0] !== '' && filterDate[1] !== ''
            ? new Date(moment(item.createdAt).format('YYYY-MM-DD')) >= new Date(filterDate[0]) &&
              new Date(moment(item.createdAt).format('YYYY-MM-DD')) <= new Date(filterDate[1])
            : true
        )}
        columns={columns}
      />
    </MainCard>
  );
}

export default Projet;
