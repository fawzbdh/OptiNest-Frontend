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
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const { RangePicker } = DatePicker;

function ProjetSuivi() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState(['', '']);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const columns = [
    {
      field: 'name',
      headerName: 'Nom projet',
      width: 200,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedInput
            type="text"
            id={params.id}
            name={params.field}
            placeholder={'Nom du projet'}
            value={params.value}
            onChange={(event) => handleEditCellChange({ ...params, value: event.target.value })}
            style={{
              width: '100%',
              height: '40px',
              border: '1px solid white',
              borderRadius: '5px',
              padding: '5px'
            }}
            endAdornment={
              <InputAdornment position="end">
                <EditIcon sx={{ cursor: 'pointer', color: '#28DCE7', fontSize: '20px' }} onClick={() => handleEditCellChange(params)} />
              </InputAdornment>
            }
          />
        </div>
      )
    },
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
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/feedback/${params.row.id}`}>
            <EditIcon
              // Assuming id is the project ID
              variant="contained"
              color="primary"
              sx={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}
            />
          </Link>
          {params.row.status !== 'Ebauche' && (
            <Link to={`/couper/${params.row.id}`}>
              <RemoveRedEyeIcon
                // Assuming id is the project ID
                variant="contained"
                color="primary"
                sx={{ color: 'green', marginLeft: '10px', cursor: 'pointer' }}
              />
            </Link>
          )}
        </div>
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
        pagination
        initialState={{
          ...projects.initialState,
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
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
