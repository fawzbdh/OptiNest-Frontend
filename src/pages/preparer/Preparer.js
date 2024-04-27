import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';

function Preparer() {
  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
        <Typography style={{ marginTop: '20px', marginRight: '20px' }} variant="h4">
          Télécharger vos pièces
        </Typography>
        <Button
          variant="outlined"
          style={{ marginTop: '20px', borderRadius: '20px', color: 'black', borderColor: 'black' }}
          startIcon={<CloudUploadIcon />}
        >
          Ajouter une pièce paramétrique
        </Button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card style={{ margin: '0px', padding: '0px', height: '320px' }}>
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
                <CloudUploadIcon style={{ fontSize: '100px' }} />
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Card style={{ margin: '0px', padding: '0px', height: '320px' }}>
              <CardContent style={{ margin: '0px', padding: '0px' }}>
                <div style={{ backgroundColor: '#F5F5F5', width: '100%', height: '70px', margin: '0px', padding: '0px' }}>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                    {' '}
                    <Chip sx={{ marginRight: '10px', borderRadius: '20px' }} label="0 en cours" />
                    <Chip sx={{ marginRight: '10px', borderRadius: '20px', backgroundColor: '#D5F3B3' }} label="0 téléchargé(s)" />
                  </div>
                </div>
                <div style={{ padding: '20px' }}></div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Preparer;
