import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Steps } from 'antd';
import TextField from '@mui/material/TextField';
import Preparer from 'pages/preparer/Preparer';
import Couper from 'pages/couper/Couper';
import Placer from 'pages/placer/Placer';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ProjetById() {
  // Access the project ID from the URL parameters
  const { projectId } = useParams();
  const [current, setCurrent] = useState(0); // Start from 1
  const totalSteps = 3; // Total number of steps/pages
  const navigate = useNavigate();

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleNext = () => {
    setCurrent((prevCurrent) => Math.min(prevCurrent + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => Math.max(prevCurrent - 1, 1)); // Minimum step 1
  };
  return (
    <MainCard>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '40%' }}>
          {projectId}
          <TextField label="Nom du projet" variant="outlined" style={{ marginBottom: '20px' }} fullWidth />
        </div>
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
          items={[
            {
              title: 'Importer'
            },
            {
              title: 'Préparer'
            },
            {
              title: 'Placer'
            },
            {
              title: 'Couper'
            }
          ]}
        />
      </div>
      {current === 0 && <Preparer />}
      {current === 1 && (
        <div>
          {' '}
          <p>second page</p>{' '}
        </div>
      )}

      {current === 2 && <Placer />}
      {current === 3 && <Couper />}

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
        {current === 0 ? (
          <Button startIcon={<ArrowBackIcon />} style={{ marginRight: '8px', width: '50%' }} onClick={() => navigate('/projet')}>
            List de projet
          </Button>
        ) : (
          <Button style={{ marginRight: '8px', width: '50%' }} onClick={handlePrev}>
            Précédent
          </Button>
        )}

        <Button style={{ width: '50%' }} variant="contained" onClick={handleNext} disabled={current >= totalSteps - 1}>
          Suivant
        </Button>
      </div>
    </MainCard>
  );
}

export default ProjetById;
