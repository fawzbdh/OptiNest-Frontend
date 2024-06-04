import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/reducers/projectReducer';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const { RangePicker } = DatePicker;

function ProjetSuivi() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState(['', '']);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleEditCellChange = (params) => {
    console.log(params);
    // Add your cell edit logic here
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nom projet',
      width: 180,
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
                <EditNoteOutlinedIcon
                  sx={{ cursor: 'pointer', color: 'grey', fontSize: '20px' }}
                  onClick={() => handleEditCellChange(params)}
                />
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
      width: 250
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200
    },
    {
      field: 'feedback',
      headerName: 'Actions',
      width: 280,
      renderCell: (params) => (
        <div>
          <Link to={`/feedback/${params.row.id}`}>
            <ChatBubbleOutlineRoundedIcon
              variant="contained"
              color="primary"
              sx={{ color: '#C1B100', marginLeft: '10px', cursor: 'pointer' }}
            />
          </Link>
          {params.row.status !== 'Ebauche' && (
            <Link to={`/couper/${params.row.id}`}>
              <RemoveRedEyeOutlinedIcon
                variant="contained"
                color="primary"
                sx={{ color: '#1abb58', marginLeft: '10px', cursor: 'pointer' }}
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
      <Typography variant="h3">Liste des projet à suivre :</Typography>
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
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: '30px',
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold',
            borderBottom: '2px solid #f2f2f2 '
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#f2f2f2 '
            }
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f2f2f2 ',
            borderTop: '1px solid #f2f2f2 '
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
