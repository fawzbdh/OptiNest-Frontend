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
import { fetchProjectById, updateProject } from 'store/reducers/projectReducer';
import { fetchFichiersByProjectId, updatePriority, updateQuantity } from 'store/reducers/fichierReducer'; // Import the updateQuantity and updatePriority actions
import { useMediaQuery, Box, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImporterFiles from 'pages/preparer/ImporterFiles';
import { drawerWidth } from 'config';
const presedent = ['Liste des projets', 'importer plus de pièces', ' Configurer les quantités'];
const suivent = ['Configurer les quantités', 'Configurer le placement', "Démarrer l'optimisation"];

function ProjetById() {
  const { project, status } = useSelector((state) => state.project);
  const { files } = useSelector((state) => state.fichier); // Get files from redux state
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0); // Track the number of uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(project?.steps || 0); // Start from 0 or project.steps
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // Access the project ID from the URL parameters
  const { projectId } = useParams();
  const totalSteps = 4; // Total number of steps/pages

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
    dispatch(fetchFichiersByProjectId(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    setCurrent(project?.steps || 0);
  }, [project]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleUploadedFiles = (files) => {
    setUploadedFiles(files);
    setUploadedFilesCount(files.length);
  };

  const onChange = (value) => {
    setCurrent(value);
  };

  const handleNext = async () => {
    if (current === 0 && project?.fileCount === 0 && uploadedFilesCount === 0 && uploadedFiles.length === 0) {
      console.log('No files uploaded yet');
      return;
    }

    const nextStep = Math.min(current + 1, totalSteps);
    setCurrent(nextStep);
    updateSteps(nextStep);
    dispatch(fetchFichiersByProjectId(projectId));
  };

  const handlePrev = () => {
    const prevStep = Math.max(current - 1, 0);
    setCurrent(prevStep);
    updateSteps(prevStep);
  };

  const handleFileSelect = (files) => {
    setUploadedFilesCount(files.length);
  };
  const updateSteps = (step) => {
    if (step === 0 && project?.fileCount === 0) {
      console.log('No files uploaded yet');
      return;
    }
    dispatch(updateProject({ id: projectId, steps: step }));
  };

  const handleQuantityChange = (fileId, newQuantity) => {
    dispatch(updateQuantity({ fileId, quantity: newQuantity }));
  };

  const handlePriorityChange = (fileId, newPriority) => {
    dispatch(updatePriority({ fileId, priority: newPriority }));
  };

  const handleUpdateProjectName = (newName) => {
    dispatch(updateProject({ id: projectId, name: newName }));
    dispatch(fetchFichiersByProjectId(projectId));
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
              title: 'Importer',
              onClick: () => {}
            },
            {
              title: 'Préparer',
              onClick: () => {}
            },
            {
              title: 'Placer',
              onClick: () => {}
            },
            {
              title: 'Couper',
              onClick: () => {}
            }
          ]}
        />
      </div>
      {current === 0 && (
        <ImporterFiles
          handleUpdateProjectName={handleUpdateProjectName}
          handleFileSelect={handleFileSelect}
          handleUploadedFiles={handleUploadedFiles}
          projectId={projectId}
        />
      )}
      {current === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', borderBottom: '1px solid gray' }}>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Image</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Quantité</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Largeur</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Hauteur</p>
            <p style={{ fontSize: '18px', fontWeight: '700' }}>Priorité</p>
          </div>
          {files?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '10px',
                  alignItems: 'center',
                  borderBottom: '1px solid gray'
                }}
              >
                <img src={item.path} alt={`image` + index} style={{ width: '200px', height: '150px' }} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
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
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                <div>{item.width && item.width.toFixed(2)}</div>
                <div>{item.height && item.height.toFixed(2)}</div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handlePriorityChange(item.id, Math.max(0, item.priority - 1))}
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
                    onClick={() => handlePriorityChange(item.id, item.priority + 1)}
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
      )}

      {current === 2 && <Placer />}
      {current === 3 && <Couper />}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: `calc(100% - ${matchesXs ? 0 : drawerWidth}px)`,
          padding: '0px',
          backgroundColor: 'white',
          borderTop: '1px solid #ddd',
          display: 'flex', // Set display to flex
          justifyContent: 'space-between' // Align items in a row with space between them
        }}
      >
        {current === 0 ? (
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            style={{
              width: '50%',
              height: '70px',
              backgroundColor: '#4a4a4a',
              color: 'white',
              borderRadius: '0px',
              '&:hover': {
                backgroundColor: '#4a4a4a',
                color: 'white',
                border: '1px solid white'
              }
            }}
            onClick={() => navigate('/projet')}
          >
            List de projet
          </Button>
        ) : (
          <Button
            startIcon={<ArrowBackIcon />}
            style={{
              width: '50%',
              height: '70px',

              backgroundColor: '#4a4a4a',
              color: 'white',
              borderRadius: '0px',
              '&:hover': {
                backgroundColor: '#4a4a4a',
                color: 'white',
                border: '1px solid white'
              }
            }}
            onClick={handlePrev}
          >
            {presedent[current]}
          </Button>
        )}
        <div style={{ width: '10%', background: 'repeating-linear-gradient(-75deg, #7ed321, #7ed321 49%, #4a4a4a 51%, #4a4a4a)' }}></div>
        <Button
          endIcon={<ArrowForwardIcon />}
          style={{
            width: '50%',
            height: '70px',
            borderRadius: '0px',
            backgroundColor: '#7ED321',
            color: 'white',
            border: '1px solid #7ED321',
            '&:hover': {
              backgroundColor: '#7ED321',
              color: 'white',
              border: '1px solid white'
            }
          }}
          variant="contained"
          onClick={handleNext}
          disabled={current === totalSteps - 1 || (current === 0 && uploadedFilesCount === 0 && project?.fileCount === 0)}
        >
          {suivent[current]}
        </Button>
      </div>
    </MainCard>
  );
}

export default ProjetById;
