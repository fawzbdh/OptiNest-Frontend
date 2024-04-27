import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

function ProjetSuivi() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nom', width: 130 },
    { field: 'lastName', headerName: 'Statut', width: 130 },
    {
      field: 'age',
      headerName: 'DÉBUTÉ LE',
      type: 'number',
      width: 90
    },
    {
      field: 'fullName',
      headerName: 'ACTIONS',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    }
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 }
  ];

  return (
    <MainCard>
      <Typography variant="h3">Suivi Projet</Typography>
      <br/>
      <DataGrid autoHeight sx={{ width: '90%' }} rows={rows} columns={columns} />
    </MainCard>
  );
}

export default ProjetSuivi;
