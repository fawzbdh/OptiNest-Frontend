import React, { useEffect, useImperativeHandle, useState } from 'react';
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import {
  createContainer,
  updateContainer,
  fetchContainerByProjectId,
} from 'store/reducers/containerReducer';
import {
  createMultipleFormats,
  deleteFormat,
  fetchFormatByProjectId,
  updateMultipleFormats,
} from 'store/reducers/formatReducer';
import { createOptimisation } from 'store/reducers/optimisationReducer';
import { updateProject } from 'store/reducers/projectReducer';
import { Padding } from '../../../node_modules/@mui/icons-material/index';

const Placer = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [confirmationState, setConfirmationState] = useState({});

  const [margins, setMargins] = useState({
    x: '',
    y: '',
  });

  const containers = useSelector((state) => state.container.containers);
  const formats = useSelector((state) => state.format.formats);
  const container = containers.length ? containers[0] : null;

  useEffect(() => {
    dispatch(fetchContainerByProjectId(projectId));
    dispatch(fetchFormatByProjectId(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (container) {
      setMargins({
        x: container.x || '',
        y: container.y || '',
      });
      setSelectedOption(container.vertical !== undefined ? container.vertical : '');
    }
  }, [container]);

  useEffect(() => {
    if (formats.length > 0) {
      setData(
        formats.map((format) => ({
          id: format.id,
          name: format.nom,
          hauteur: format.hauteur,
          largeur: format.largeur,
          quantity: format.quantity,
        }))
      );
    }
  }, [formats]);

  const addSheet = () => {
    setData([...data, { name: '', hauteur: '', largeur: '', quantity: 1 }]);
  };

  const handleNameChange = (index, value) => {
    const newData = [...data];
    newData[index].name = value;
    setData(newData);
  };

  const handleQuantityChange = (index, newValue) => {
    const newData = [...data];
    newData[index].quantity = Math.max(1, newValue);
    setData(newData);
  };

  const handleDeleteFormat = (fileId, index) => {
    handleDeleteRow(index);
    setConfirmationState((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  const handleDeleteRow = async (index) => {
    const formatToDelete = data[index];

    if (formatToDelete.id) {
      try {
        await dispatch(deleteFormat(formatToDelete.id));
      } catch (error) {
        return;
      }
    }

    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleMarginChange = (direction, value) => {
    setMargins((prevState) => ({
      ...prevState,
      [direction]: value,
    }));
  };

  const handleDimensionChange = (index, dimension, value) => {
    const newData = [...data];
    newData[index][dimension] = value;
    setData(newData);
  };

  const handleSubmit = async () => {
    const containerData = {
      x: margins.x,
      y: margins.y,
      vertical: selectedOption,
    };

    try {
      if (container) {
        await dispatch(updateContainer({ id: container.id, ...containerData }));
      } else {
        await dispatch(createContainer({ id: projectId, ...containerData }));
      }

      if (data.length > 0) {
        const existingFormatIds = formats.map((format) => format.id);
        const newFormats = data.filter((format) => !existingFormatIds.includes(format.id));
        const updateFormats = data.filter((format) => existingFormatIds.includes(format.id));

        if (newFormats.length > 0) {
          await dispatch(createMultipleFormats({ projectId, formatsData: newFormats }));
        }

        if (updateFormats.length > 0) {
          await dispatch(updateMultipleFormats(updateFormats));
        }
      }

      await dispatch(createOptimisation({ projectId: projectId }));

      await dispatch(updateProject({ id: projectId, status: 'Prêt' }));
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit,
  }));

  const toggleConfirmDelete = (index) => {
    setConfirmationState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Typography variant="h4" fontWeight="bold" color="black" sx={{ flexGrow: 1 }}>
        Format
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addSheet}
        sx={{ mb: 1, mt: 1, borderRadius: '30px', bgcolor: '#358e93d7', textTransform: 'none', fontWeight: 700, fontSize: '15px' ,'&:hover': {
                  backgroundColor: '#358e93d7',
                  color: 'white',
                  
                }}}
              
      >
      
        Ajouter un format
      </Button>

      <TableContainer component={Paper} sx={{ mt: 1, borderRadius: '15px', width: '100%' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F5F5F5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign:'center' }}>Nom de tole</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign:'center' }}>Les dimensions</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>Quantité</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: '20%' }}>
                  <OutlinedInput
                    id={`name-${index}`}
                    type="text"
                    placeholder="Nom du tole"
                    endAdornment={
                      <InputAdornment position="end">
                        <EditIcon sx={{ cursor: 'pointer', color: 'grey', fontSize: '20px' }} />
                      </InputAdornment>
                    }
                    value={item.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    sx={{ height: '30px', width: '100%' }}
                  />
                </TableCell>

                <TableCell>
                  <OutlinedInput
                    id={`largeur-${index}`}
                    type="number"
                    value={item.largeur}
                    onChange={(e) => handleDimensionChange(index, 'largeur', e.target.value)}
                    endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                    sx={{ height: '30px', width: '150px', mr: 1 }}
                  />
                  <CloseIcon />
                  <OutlinedInput
                    id={`hauteur-${index}`}
                    type="number"
                    value={item.hauteur}
                    onChange={(e) => handleDimensionChange(index, 'hauteur', e.target.value)}
                    endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                    sx={{ height: '30px', width: '150px', ml: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Diminuer">
                      <IconButton onClick={() => handleQuantityChange(index, item.quantity - 1)} sx={{ color: '#FF5722' }}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <Tooltip title="Augmenter">
                      <IconButton onClick={() => handleQuantityChange(index, item.quantity + 1)} sx={{ color: '#4CAF50' }}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {!confirmationState[index] ? (
                    <Tooltip title="Supprimer">
                      <IconButton onClick={() => toggleConfirmDelete(index)} sx={{ color: '#F44336' }}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => toggleConfirmDelete(index)}
                        sx={{ cursor: 'pointer', textTransform: 'none',    marginRight: '10px',
                borderRadius: '20px',
                backgroundColor: 'white',
                textTransform: 'none',
                color: 'grey',
                border: '2px solid grey',
                marginTop:'5px',
                fontWeight:600,

                '&:hover': {
                  backgroundColor: '#ffff',
                  color: 'grey',
                  border: '2px solid grey'
                }  }}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteFormat(item.id, index)}
                        sx={{ cursor: 'pointer', textTransform: 'none'  , marginRight: '10px',
                borderRadius: '30px',
                backgroundColor: '#d61717',
                textTransform: 'none',
                color: '#ffff',
                border: '2px solid #d61717',
                marginTop:'5px',
                fontWeight:600,

                '&:hover': {
                  backgroundColor: '#e22222',
                  color: 'white',
                  border: '2px solid #e22222'
                }   }}
                      >
                        Confirmer
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', pt: 2, mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="grey" sx={{ flexGrow: 1 }}>
          Paramètres de placement :
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={4} sx={{ mb: 1, mt: 1 }}>
            <Typography>Écart selon l'axe X :</Typography>
            <OutlinedInput
              id="x"
              type="number"
              value={margins.x}
              endAdornment={<InputAdornment position="end">mm</InputAdornment>}
              onChange={(e) => handleMarginChange('x', e.target.value)}
              sx={{ height: '35px', width: '100%' }}
            />
          </Grid>
          <Grid item xs={4} sx={{ mb: 1, mt: 1 }}>
            <Typography>Écart selon l'axe Y :</Typography>
            <OutlinedInput
              id="y"
              type="number"
              value={margins.y}
              endAdornment={<InputAdornment position="end">mm</InputAdornment>}
              onChange={(e) => handleMarginChange('y', e.target.value)}
              sx={{ height: '35px', width: '100%' }}
            />
          </Grid>
          <Grid item xs={4} sx={{ mb: 1, mt: 1 }}>
            <Typography>Orientation :</Typography>
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'orientation' }}
              sx={{ height: '35px', width: '100%' }}
            >
              <MenuItem value="">
                <em>Aucune</em>
              </MenuItem>
              <MenuItem value={false}>Horizontale</MenuItem>
              <MenuItem value={true}>Verticale</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default Placer;
