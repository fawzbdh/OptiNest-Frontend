import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon

function Placer() {
  const [data, setData] = useState([]);
  const [margins, setMargins] = useState({
    top: '',
    bottom: '',
    left: '',
    right: ''
  });

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

  const handleDeleteRow = (index) => {
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
  const handleSubmit = () => {
    console.log(data);
    console.log(margins);
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
          // borderBottom: '1px solid gray'
        }}
      >
        <div style={{ width: '100%', borderRight: '1px solid gray' }}>
          {' '}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '10px', borderBottom: '1px solid gray' }}>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Nom</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Les dimensions</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Quantité</p>
          </div>
          {data?.map((item, index) => {
            return (
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
            );
          })}
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
                value={margins.top}
                onChange={(e) => handleMarginChange('top', e.target.value)}
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
                value={margins.bottom}
                onChange={(e) => handleMarginChange('bottom', e.target.value)}
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
                value={margins.left}
                onChange={(e) => handleMarginChange('left', e.target.value)}
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
                value={margins.right}
                onChange={(e) => handleMarginChange('right', e.target.value)}
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
