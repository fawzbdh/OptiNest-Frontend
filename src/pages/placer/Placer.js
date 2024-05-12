import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';

function Placer() {
  const [data, setData] = useState([]);
  const [sheetName, setSheetName] = useState('');

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: '20px', borderRadius: '15px', backgroundColor: '#12cc04', marginBottom: '10px' }}
        onClick={() => {
          setData([...data, { name: 'test', hauteur: '', largeur: '', priority: 1, quantity: 1 }]);
        }}
      >
        <AddCircleIcon />
        {'    '} Ajouter Sheet
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
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Name</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Size</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>quantity</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Priorité</p>
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
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                  value={sheetName || item?.name || ''}
                  onChange={(e) => setSheetName(e.target.value)}
                  style={{ height: '40px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    type="number"
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
                    // onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
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
                    // onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                {/* <div>{item.width && item.width.toFixed(2)}</div>
                <div>{item.height && item.height.toFixed(2)}</div> */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <button
                    // onClick={() => handlePriorityChange(item.id, Math.max(0, item.priority - 1))}
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
                  <span>{item.priority}</span>
                  <button
                    // onClick={() => handlePriorityChange(item.id, item.priority + 1)}
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
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%', paddingTop: '10px' }}>
          <span style={{ color: '#12cc04', fontWeight: 'bold', fontSize: '30px' }}>Ecart :</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div>
              <p>Ecart top</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart bottom</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart left</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <p>Ecart rigth</p>
              <OutlinedInput
                id="outlined-adornment-weight"
                type="number"
                endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
                style={{ height: '40px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placer;
