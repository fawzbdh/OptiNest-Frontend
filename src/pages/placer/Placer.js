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
import { createMultipleFormats, deleteFormat, fetchFormatByProjectId, updateMultipleFormats } from 'store/reducers/formatReducer';

function Placer() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [data, setData] = useState([]);
  const [margins, setMargins] = useState({
    ecart_top: '',
    ecart_bottom: '',
    ecart_left: '',
    ecart_right: ''
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
        ecart_top: container.ecart_top || '',
        ecart_bottom: container.ecart_bottom || '',
        ecart_left: container.ecart_left || '',
        ecart_right: container.ecart_right || ''
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
      ecart_top: margins.ecart_top,
      ecart_bottom: margins.ecart_bottom,
      ecart_left: margins.ecart_left,
      ecart_right: margins.ecart_right
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
        style={{ marginTop: '20px', borderRadius: '15px', backgroundColor: '#12cc04', marginBottom: '10px' }}
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
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Nom</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Les dimensions</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Quantité</p>
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
                  id="outlined-adornment-weight"
                  type="number"
                  value={item.largeur}
                  onChange={(e) => handleDimensionChange(index, 'largeur', e.target.value)}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                  style={{ height: '40px' }}
                />
                <CloseIcon style={{ height: '40px' }} />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type="number"
                  value={item.hauteur}
                  onChange={(e) => handleDimensionChange(index, 'hauteur', e.target.value)}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                  style={{ height: '40px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  style={{
                    cursor: 'pointer',
                    background: 'rgb(18, 204, 4)',
                    color: 'white',
                    border: '0',
                    fontSize: '18px',
                    borderRadius: '5px',
                    width: '25px',
                    height: '25px'
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  style={{
                    cursor: 'pointer',
                    background: 'rgb(18, 204, 4)',
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
          <span style={{ color: '#12cc04', fontWeight: 'bold', fontSize: '30px' }}>Paramétres de placement :</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div>
              <p>Ecart haut</p>
              <OutlinedInput
                id="outlined-adornment-top"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={margins.ecart_top}
                onChange={(e) => handleMarginChange('ecart_top', e.target.value)}
                inputProps={{
                  'aria-label': 'top-margin'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart bas</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={margins.ecart_bottom}
                onChange={(e) => handleMarginChange('ecart_bottom', e.target.value)}
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart gauche</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={margins.ecart_left}
                onChange={(e) => handleMarginChange('ecart_left', e.target.value)}
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart droite</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                value={margins.ecart_right}
                onChange={(e) => handleMarginChange('ecart_right', e.target.value)}
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
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
