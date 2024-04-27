import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { useDispatch,useSelector } from 'react-redux';
 import {fetchproject} from '../../store/reducers/projectReducer'
 import moment from 'moment';
 import { DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom';
function Projet() {
  const handleNouveauProjetClick = () => {
    // Handle the click event for "Nouveau projet" button
    navigate('/stepper');
    console.log('Nouveau projet clicked');
  };
  const {data} = useSelector(state=>state.project)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [date,setDate]=useState()
  useEffect(()=>{
    dispatch(fetchproject())
       },[dispatch])

       const columns = [
        { field: 'id', headerName: 'ID',width:150 },
        { field: 'name', headerName: 'Nom project' ,width:150},
        { field: 'createdAt', headerName: 'Date de creation',valueGetter: (value, row) => moment(row.createdAt).format('YYYY-MM-DD'),width:150},
        {
          field: 'status',
          headerName: 'status'
          ,width:150
        },
        { field: 'steps', headerName: 'steps',width:150 },
      ];
    
    const user=JSON.parse(window.localStorage.getItem('user'))
    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };
  return (
    <MainCard>
      <Typography variant="h3">Projet</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={handleNouveauProjetClick}
          sx={{ borderRadius: '20px', backgroundColor: '#12cc04', marginTop: '20px', marginBottom: '20px' }}
          variant="contained"
        >
          Nouveau projet
        </Button>
        <DatePicker onChange={onChange} />
      </div>

      <DataGrid autoHeight sx={{ width: '99%',margin:"auto" }} rows={data.filter((item)=>item.id===user?.id)} columns={columns} />
    </MainCard>
  );
}

export default Projet;
