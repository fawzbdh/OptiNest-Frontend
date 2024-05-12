import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProjetSuivi() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nom project', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Date de creation',
      valueGetter: (value, row) => moment(row.createdAt).format('YYYY-MM-DD'),
      width: 150
    },
    {
      field: 'status',
      headerName: 'status',
      width: 150
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/feedback/${params.row.id}`} // Assuming id is the project ID
          variant="contained"
          color="primary"
        >
          Feedback
        </Button>
      )
    }
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <MainCard>
      <Typography variant="h3">Suivi Projet</Typography>
      <br />
      <DatePicker onChange={onChange} />
      <br />
      <br />
      <DataGrid autoHeight sx={{ width: '99%', margin: 'auto' }} rows={projects} columns={columns} />
    </MainCard>
  );
}

export default ProjetSuivi;
