import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, deleteProject, fetchprojectByUserId, updateProject } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
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
      width: 180,
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
              padding: '5px',
              marginTop: '5px'
            }}
            endAdornment={
              <InputAdornment position="end">
                <EditNoteOutlinedIcon sx={{ cursor: 'pointer', color: 'grey', fontSize: '20px' }} onClick={() => handleEditCellChange(params)} />
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
      width: 200,
      alignItems:'center'
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      width: 300,
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
                color: '#1cbac2',
                border: '2px solid #1cbac2',
                textTransform: 'none',
                marginTop: '5px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#1cbac2',
                  color: 'white',
                  border: '1px solid #1cbac2'
                }
              }}
              startIcon={<ArrowRightIcon />}
            >
              Reprendre
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
                color: '#20de69',
                border: '2px solid #20de69',
                marginTop: '5px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#20de69',
                  color: 'white',
                  border: '1px solid #20de69'
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
                border: '2px solid #C1B100',
                marginTop: '5px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#C1B100',
                  color: 'white',
                  border: '1px solid #C1B100'
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
            <DeleteOutlineOutlinedIcon
              sx={{ color: '#FF5722', marginLeft: '10px', cursor: 'pointer', alignSelf: 'self' }}
              onClick={() => toggleConfirmDelete(params.row.id)}
            />
          ) : (
            <>
              <Button
                sx={{
                  cursor: 'pointer',
                  textTransform: 'none',
                  marginRight: '10px',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  textTransform: 'none',
                  color: 'grey',
                  border: '2px solid grey',
                  marginTop: '5px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#ffff',
                    color: 'grey',
                    border: '2px solid grey'
                  }
                }}
                variant="outlined"
                onClick={() => toggleConfirmDelete(params.row.id)}
              >
                Annuler
              </Button>
              <Button
                sx={{
                  cursor: 'pointer',
                  textTransform: 'none',
                  marginRight: '10px',
                  borderRadius: '30px',
                  backgroundColor: '#d61717',
                  textTransform: 'none',
                  color: '#ffff',
                  border: '2px solid #d61717',
                  marginTop: '5px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#e22222',
                    color: 'white',
                    border: '2px solid #e22222'
                  }
                }}
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
      <Typography variant="h3">Liste des projets :</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={handleNouveauProjetClick}
          sx={{
            borderRadius: '30px',
            textTransform: 'none',
            backgroundColor: '#358e93d7',
            color: 'white',
            border: '2px solid #358e93d7',
            fontWeight: 600,
            fontSize: '16px',
            marginTop: '20px',
            marginLeft: '20px',
            padding: '6px 25px',
            marginBottom: '20px',
            padding:'6px 20px',
            '&:hover': {
              backgroundColor: '#3da0a5d7',
              color: 'white',
              border: '2px solid #3da0a5d7 ',
            }
          }}
          variant="s"
        >
          Nouveau projet
        </Button>
        <RangePicker onChange={onChange} />
      </div>

      <DataGrid
      autoHeight
        onEditCellChange={handleEditCellChange}
        pagination
        initialState={{
          ...projects.initialState,
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
        sx={{
          width: '99%',
          margin: 'auto',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: '30px',
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold',
            borderBottom: '2px solid #f2f2f2 '
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#f2f2f2 '
            }
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f2f2f2 ',
            borderTop: '1px solid #f2f2f2 '
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
