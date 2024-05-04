import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, fetchprojectByUserId, updateProject } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
function Projet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status, error } = useSelector((state) => state.project);

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
    console.log('Project deleted:', id);
    // Implement logic to delete project
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    if (error === 'Request failed with status code 401') {
      return navigate('/login');
    }
    return <div>Error: {error}</div>;
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
    console.log(date, dateString);
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
        <DatePicker onChange={onChange} />
      </div>
      <DataGrid onEditCellChange={handleEditCellChange} autoHeight sx={{ width: '99%', margin: 'auto' }} rows={data} columns={columns} />
    </MainCard>
  );
}

export default Projet;
