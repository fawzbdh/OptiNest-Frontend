import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Steps } from 'antd';
import Couper from 'pages/couper/Couper';
import Placer from 'pages/placer/Placer';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById } from 'store/reducers/projectReducer';
import ImporterFiles from 'pages/preparer/ImporterFiles';

function ProjetById() {
  const { selectedProject, status } = useSelector((state) => state.project);

  // Access the project ID from the URL parameters
  const { projectId } = useParams();
  const totalSteps = 4; // Total number of steps/pages
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0); // Track the number of uploaded files
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(selectedProject?.steps || 0); // Start from 0 or selectedProject.steps

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
    setCurrent(selectedProject?.steps || 0);
  }, [dispatch, projectId, selectedProject?.steps]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleNext = () => {
    if (current === 1 && uploadedFilesCount === 0) {
      // If on the preparer page and no files are uploaded, prevent moving to the next step
      return;
    }
    setCurrent((prevCurrent) => Math.min(prevCurrent + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => Math.max(prevCurrent - 1, 0)); // Minimum step 0
  };

  // Function to handle file selection
  const handleFileSelect = (files) => {
    // Update uploaded files count based on the number of selected files
    setUploadedFilesCount(files.length);
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
      {current === 0 && <ImporterFiles handleFileSelect={handleFileSelect} />}
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

        <Button
          style={{ width: '50%' }}
          variant="contained"
          onClick={handleNext}
          disabled={current === totalSteps - 1 || (current === 0 && uploadedFilesCount === 0 && selectedProject?.fileCount === 0)}
        >
          Suivant
        </Button>
      </div>
    </MainCard>
  );
}

export default ProjetById;
