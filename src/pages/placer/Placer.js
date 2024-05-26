import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { createContainer, updateContainer, fetchContainerByProjectId } from 'store/reducers/containerReducer';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import { createMultipleFormats, deleteFormat, fetchFormatByProjectId, updateMultipleFormats } from 'store/reducers/formatReducer';

function Placer() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [margins, setMargins] = useState({
    offset: '',
    merge: ''
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
        offset: container.offset || '',
        merge: container.merge || ''
      });
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
          quantity: format.quantity
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
    newData[index].quantity = Math.max(1, newValue); // Ensure quantity is at least 1
    setData(newData);
  };

  const handleDeleteRow = async (index) => {
    const formatToDelete = data[index];

    if (formatToDelete.id) {
      // If the format has an ID, it means it exists in the database
      try {
        await dispatch(deleteFormat(formatToDelete.id));
        Swal.fire('Format deleted successfully!', '', 'success');
      } catch (error) {
        Swal.fire('Error:', error.message, 'error');
        return;
      }
    }

    // Remove the item from local state
    const newData = [...data];
    newData.splice(index, 1); // Remove the item at the specified index
    setData(newData);
  };

  const handleMarginChange = (direction, value) => {
    setMargins((prevState) => ({
      ...prevState,
      [direction]: value
    }));
  };

  const handleDimensionChange = (index, dimension, value) => {
    const newData = [...data];
    newData[index][dimension] = value;
    setData(newData);
  };

  const handleSubmit = async () => {
    const containerData = {
      offset: margins.offset,
      merge: margins.merge
    };

    try {
      if (container) {
        await dispatch(updateContainer({ id: container.id, ...containerData }));
        Swal.fire('Container updated successfully!', '', 'success');
      } else {
        await dispatch(createContainer({ id: projectId, ...containerData }));
        Swal.fire('Container created successfully!', '', 'success');
      }
    } catch (error) {
      Swal.fire('Error:', error.message, 'error');
    }

    try {
      if (data.length > 0) {
        const existingFormatIds = formats.map((format) => format.id);
        const newFormats = data.filter((format) => !existingFormatIds.includes(format.id));
        const updateFormats = data.filter((format) => existingFormatIds.includes(format.id));
        console.log('**********************************');
        console.log(updateFormats);
        console.log('**********************************');

        console.log(newFormats);
        console.log('**********************************');

        if (newFormats.length > 0) {
          await dispatch(createMultipleFormats({ projectId, formatsData: newFormats }));
        }

        if (updateFormats.length > 0) {
          await dispatch(updateMultipleFormats(updateFormats));
        }

        Swal.fire('Formats processed successfully!', '', 'success');
      }
    } catch (error) {
      Swal.fire('Error:', error.message, 'error');
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: '20px', borderRadius: '15px', backgroundColor: '#28DCE7', marginBottom: '10px' }}
        onClick={addSheet}
      >
        <AddCircleIcon />
        {'    '} Ajouter Format
      </Button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderTop: '1px solid gray',
          marginTop: '10px'
        }}
      >
        <div style={{ width: '100%', borderRight: '1px solid gray' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '10px', borderBottom: '1px solid gray' }}>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Nom de tole</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Les dimensions</p>
            <p style={{ fontSize: '18px', fontWeight: '700', marginLeft: '10px' }}>Quantité</p>
          </div>
          {data?.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                gap: '5px',
                alignItems: 'center',
                borderBottom: '1px solid gray',
                paddingTop: '10px',
                paddingBottom: '10px'
              }}
            >
              <OutlinedInput
                id={`name-${index}`}
                aria-describedby="outlined-weight-helper-text"
                value={item.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                style={{ height: '40px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <OutlinedInput
                  id={`largeur-${index}`}
                  type="number"
                  value={item.largeur}
                  onChange={(e) => handleDimensionChange(index, 'largeur', e.target.value)}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'largeur'
                  }}
                  style={{ height: '40px' }}
                />
                <CloseIcon style={{ height: '40px' }} />
                <OutlinedInput
                  id={`hauteur-${index}`}
                  type="number"
                  value={item.hauteur}
                  onChange={(e) => handleDimensionChange(index, 'hauteur', e.target.value)}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'hauteur'
                  }}
                  style={{ height: '40px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  style={{
                    cursor: 'pointer',
                    background: 'grey',
                    color: 'white',
                    border: '0',
                    fontSize: '18px',
                    borderRadius: '5px',
                    width: '25px',
                    height: '25px',
                    marginLeft: '10px'
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  style={{
                    cursor: 'pointer',
                    background: 'grey',
                    color: 'white',
                    border: '0',
                    fontSize: '18px',
                    borderRadius: '5px',
                    width: '25px',
                    height: '25px'
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <DeleteIcon onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', paddingTop: '10px' }}>
          <span style={{ color: 'grey', fontWeight: 'bold', fontSize: '30px' }}>Paramétres de placement :</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '100%' }}>
              <p>Offset</p>
              <OutlinedInput
                id="offset"
                type="number"
                aria-describedby="offset-helper-text"
                value={margins.offset}
                onChange={(e) => handleMarginChange('offset', e.target.value)}
                inputProps={{
                  'aria-label': 'offset'
                }}
                style={{ height: '40px', width: '100%' }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <p>Mergs </p>
              <OutlinedInput
                id="merge"
                type="number"
                aria-describedby="merge-helper-text"
                value={margins.merge}
                onChange={(e) => handleMarginChange('merge', e.target.value)}
                inputProps={{
                  'aria-label': 'merge'
                }}
                style={{ height: '40px', width: '100%' }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <p>Orientation </p>

              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'orientation' }}
                style={{ height: '40px', width: '100%' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={false}>horizontal</MenuItem>
                <MenuItem value={true}>vertical</MenuItem>
              </Select>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', borderRadius: '15px', backgroundColor: '#1976d2', marginBottom: '10px' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Placer;
