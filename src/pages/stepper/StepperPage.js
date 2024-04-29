import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Steps } from 'antd';
import Couper from 'pages/couper/Couper';
import Placer from 'pages/placer/Placer';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Breadcrumb.css';
import { useNavigate } from 'react-router-dom';
import ImporterFiles from 'pages/preparer/ImporterFiles';

function StepperPage() {
  const [current, setCurrent] = useState(0); // Start from 0
  const totalSteps = 4; // Total number of steps/pages
  const navigate = useNavigate();

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleNext = () => {
    setCurrent((prevCurrent) => Math.min(prevCurrent + 1, totalSteps - 1)); // Ensure not to exceed the total steps
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => Math.max(prevCurrent - 1, 0)); // Ensure not to go below zero
  };

  return (
    <MainCard>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
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
      {current === 0 && <ImporterFiles />}
      {current === 1 && (
        <div>
          <p>second page</p>
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

        <Button style={{ width: '50%' }} variant="contained" onClick={handleNext} disabled={current === totalSteps - 1}>
          Suivant
        </Button>
      </div>
    </MainCard>
  );
}

export default StepperPage;
