import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResultatByProjectId } from 'store/reducers/resualtReducer';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Button, Card, CardContent, CardActions, Typography } from '@mui/material';

function Couper() {
  const dispatch = useDispatch();
  const { resultats, loading, error } = useSelector((state) => state.resultat);
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(fetchResultatByProjectId(projectId));
    
  }, [dispatch, projectId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Resultats
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        {resultats.map((resultat) => (
          <Card key={resultat.id} variant="outlined" style={{ margin: '10px', maxWidth: '300px' }}>
            <CardContent>
              <img
                src={resultat.url_image}
                alt={'dxf'}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRight: '1px solid black', // Border on the right side
                  borderTop: '1px solid black', // Border on the top side
                  borderBottom: 'none', // No border on the bottom side
                  borderLeft: 'none' // No border on the left side
                }}
              />
              <Typography variant="body1" gutterBottom>
                Format: {resultat.Format.nom}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={resultat.fichier_dxf} download={`file_${resultat.id}.dxf`} variant="contained" color="primary">
                Download DXF File
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Couper;
