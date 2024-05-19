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
const { RangePicker } = DatePicker;
function Projet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState(['', '']);

  const { projects, loading, error } = useSelector((state) => state.project);

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

  const handleDeleteProject = (id) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Projet supprimé :', id);
        // Dispatch deleteProject action
        dispatch(deleteProject(id))
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
      }
    });
  };

  if (loading === true) {
    return <div>Loading...</div>;
  }

  if (error === 'Request failed with status code 401') {
    return navigate('/login');
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Nom projet',
      width: 200,
      editable: true
    },

    {
      field: 'createdAt',
      headerName: 'Date de creation',
      valueGetter: (value, row) => moment(row.createdAt).format('YYYY-MM-DD'),
      width: 150
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 150
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
                color: '#12cc04',
                border: '1px solid #12cc04',
                '&:hover': {
                  backgroundColor: '#12cc04',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              startIcon={<ArrowRightIcon />}
            >
              Répondre
            </Button>
          )}
          {params.row.status === 'Prêt' && (
            <Button
              variant="outlined"
              sx={{
                marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                color: '#12cc04',
                border: '1px solid #12cc04',
                '&:hover': {
                  backgroundColor: '#12cc04',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              startIcon={<CheckIcon />}
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
                color: '#C1B100',
                border: '1px solid #C1B100',
                '&:hover': {
                  backgroundColor: '#C1B100',
                  color: 'white',
                  border: '1px solid white'
                }
              }}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              Editer
            </Button>
          )}
          <DeleteIcon sx={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteProject(params.id)} />
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
          sx={{ borderRadius: '20px', backgroundColor: '#12cc04', marginTop: '20px', marginBottom: '20px' }}
          variant="contained"
        >
          Nouveau projet
        </Button>
        <RangePicker onChange={onChange} />
      </div>
      <DataGrid
        onEditCellChange={handleEditCellChange}
        autoHeight
        sx={{ width: '99%', margin: 'auto' }}
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
