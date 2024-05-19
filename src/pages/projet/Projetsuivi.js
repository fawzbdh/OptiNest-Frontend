import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;

function ProjetSuivi() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState(['', '']);

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
    setFilterDate(dateString);
  };
  return (
    <MainCard>
      <Typography variant="h3">Suivi Projet</Typography>
      <br />
      <RangePicker onChange={onChange} />
      <br />
      <br />
      <DataGrid
        autoHeight
        sx={{ width: '99%', margin: 'auto' }}
        rows={projects.filter((item) =>
          filterDate[0] !== '' && filterDate[1] !== ''
            ? new Date(moment(item.createdAt).format('YYYY-MM-DD')) >= new Date(filterDate[0]) &&
              new Date(moment(item.createdAt).format('YYYY-MM-DD')) <= new Date(filterDate[1])
            : true
        )}
        columns={columns}
      />
    </MainCard>
  );
}

export default ProjetSuivi;
