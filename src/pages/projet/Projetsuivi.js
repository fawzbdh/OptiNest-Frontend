import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
const { RangePicker } = DatePicker;

function ProjetSuivi() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState(['', '']);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Nom project', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Date de creation',
      valueGetter: (value, row) => moment(row.createdAt).format('YYYY-MM-DD'),
      width: 200
    },
    {
      field: 'status',
      headerName: 'status',
      width: 200
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
      width: 200,
      renderCell: (params) => (
        <Link to={`/feedback/${params.row.id}`}>
          <EditIcon
            // Assuming id is the project ID
            variant="contained"
            color="primary"
            sx={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}
          />
        </Link>
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
        hideFooter
        sx={{
          width: '99%',
          margin: 'auto',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontSize: '18px',
            fontWeight: 'bold'
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            fontSize: '16px' // Change the font size of the content here
          }
        }}
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
