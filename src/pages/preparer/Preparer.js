import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import FileList from './FileList';

function Preparer() {
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    // Update uploaded files count based on the number of selected files
    setUploadedFilesCount(fileArray.length);
    // Update uploaded files array
    setUploadedFiles(fileArray);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);
    // Update uploaded files count based on the number of dropped files
    setUploadedFilesCount(fileArray.length);
    // Update uploaded files array
    setUploadedFiles(fileArray);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    setUploadedFilesCount(newFiles.length);
  };
  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
        <Typography style={{ marginTop: '20px', marginRight: '20px' }} variant="h4">
          Télécharger vos pièces
        </Typography>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div onDragOver={handleDragOver} onDrop={handleDrop}>
              <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleFileSelect} multiple />
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>

              <label
                htmlFor="file-input"
                style={{
                  cursor: 'pointer',
                  display: 'block',
                  margin: '0px',
                  padding: '0px',
                  height: '320px'
                }}
              >
                <Card
                  sx={{
                    margin: '0px',
                    padding: '0px',
                    height: '100%',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      cursor: 'pointer',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' // Add boxShadow on hover
                    }
                  }}
                  style={{ margin: '0px', padding: '0px', height: '100%' }}
                >
                  <CardContent
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignContent: 'center',
                      margin: '20px'
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-cloud-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                      />
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                    <Button variant="contained" style={{ marginTop: '20px', borderRadius: '20px', backgroundColor: '#12cc04' }}>
                      Télécharger votre pièce{' '}
                    </Button>

                    <Typography sx={{ margin: '0px', marginTop: '20px' }} variant="body1" gutterBottom>
                      Or drag & drop your files here
                    </Typography>
                    <Typography sx={{ margin: '0px' }} variant="body1" gutterBottom>
                      ( .dwg .dxf .zip )
                    </Typography>
                  </CardContent>
                </Card>
              </label>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card style={{ margin: '0px', padding: '0px', height: '320px' }}>
              <CardContent style={{ margin: '0px', padding: '0px' }}>
                <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '70px', margin: '0px', padding: '0px' }}>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                    <Chip sx={{ marginRight: '10px', borderRadius: '20px' }} label={`${uploadedFilesCount} en cours`} />
                    <Chip sx={{ marginRight: '10px', borderRadius: '20px', backgroundColor: '#D5F3B3' }} label="0 téléchargé(s)" />
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <FileList files={uploadedFiles} onRemove={handleRemoveFile} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Preparer;
