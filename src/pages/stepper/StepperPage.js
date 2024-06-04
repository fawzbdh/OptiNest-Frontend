import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Steps } from 'antd';
import Couper from 'pages/couper/Couper';
import Placer from 'pages/placer/Placer';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Breadcrumb.css';
import { useNavigate } from 'react-router-dom';
import ImporterFiles from 'pages/preparer/ImporterFiles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
function StepperPage() {
  const [current, setCurrent] = useState(0); // Start from 0
  const [edit, setEdit] = useState(false);
  const totalSteps = 4; // Total number of steps/pages
  const navigate = useNavigate();

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleNext = () => {
    setCurrent((prevCurrent) => Math.min(prevCurrent + 1, totalSteps - 1)); // Ensure not to exceed the total steps
  };

  const handlePrev = () => {
    setCurrent((prevCurrent) => Math.max(prevCurrent - 1, 0)); // Ensure not to go below zero
  };
  let datafichier = [
    {
      priority: 0,
      id: 1,
      ProjectId: 1,
      name: 'Pièce7.DXF',
      path: 'http://localhost:8000/uploads/3cad7619-5898-46d2-91d7-8a4ce0f9b7ff.png',
      width: 281.7766171199702,
      height: 384.60095085407016,
      quantity: 1,
      updatedAt: '2024-05-02T21:30:32.617Z',
      createdAt: '2024-05-02T21:30:32.617Z'
    },
    {
      priority: 0,
      id: 1,
      ProjectId: 1,
      name: 'Pièce7.DXF',
      path: 'http://localhost:8000/uploads/3cad7619-5898-46d2-91d7-8a4ce0f9b7ff.png',
      width: 281.7766171199702,
      height: 384.60095085407016,
      quantity: 1,
      updatedAt: '2024-05-02T21:30:32.617Z',
      createdAt: '2024-05-02T21:30:32.617Z'
    },
    {
      priority: 0,
      id: 1,
      ProjectId: 1,
      name: 'Pièce7.DXF',
      path: 'http://localhost:8000/uploads/3cad7619-5898-46d2-91d7-8a4ce0f9b7ff.png',
      width: 281.7766171199702,
      height: 384.60095085407016,
      quantity: 1,
      updatedAt: '2024-05-02T21:30:32.617Z',
      createdAt: '2024-05-02T21:30:32.617Z'
    }
  ];
  return (
    <MainCard>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
          items={[
            {
              title: 'Importer'
            },
            {
              title: 'Préparer'
            },
            {
              title: 'Placer'
            },
            {
              title: 'Couper'
            }
          ]}
        />
      </div>
      {current === 0 && <ImporterFiles />}
      {current === 1 && (
        <TableContainer component={Paper} sx={{ mt: 1, borderRadius: '15px', width: '100%' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F5F5F5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign: 'center' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign: 'center' }}>Quantite</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>width</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign: 'center' }}>height</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#333', textAlign: 'center' }}>priority</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {datafichier.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: '20%' }}>
                    <img src={item.path} alt={'image' + 1} style={{ width: '200px', height: '150px' }} />
                  </TableCell>

                  <TableCell>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                      {' '}
                      <button
                        onClick={() => datafichier[index].quantity > 0 && datafichier[index].quantity--}
                        style={{
                          cursor: 'pointer',
                          background: 'rgb(18, 204, 4)',
                          color: 'white',
                          border: '0',
                          fontSize: '18px',
                          borderRadius: '5px',
                          width: '25px',
                          height: '25px'
                        }}
                      >
                        -
                      </button>
                      <span>{datafichier[index].quantity}</span>
                      <button
                        onClick={() => {
                          // console.log(qt, 'ee');
                          datafichier[index].quantity = datafichier[index].quantity + 1;
                        }}
                        style={{
                          cursor: 'pointer',
                          background: 'rgb(18, 204, 4)',
                          color: 'white',
                          border: '0',
                          fontSize: '18px',
                          borderRadius: '5px',
                          width: '25px',
                          height: '25px'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{item.width}</TableCell>
                  <TableCell align="center">{item.wiheightdth}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                      {edit ? (
                        <>
                          <span>{item.priority}</span>
                          <EditIcon
                            style={{ color: 'rgb(18, 204, 4)', fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => setEdit(false)}
                          />
                        </>
                      ) : (
                        <>
                          <span>{item.priority}</span>
                          <DoneIcon
                            style={{ color: 'rgb(18, 204, 4)', fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => setEdit(true)}
                          />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        // <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        //   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', borderBottom: '1px solid gray' }}>
        //     <p style={{ fontSize: '18px', fontWeight: '700' }}>Image</p>
        //     <p style={{ fontSize: '18px', fontWeight: '700' }}>Quantite</p>
        //     <p style={{ fontSize: '18px', fontWeight: '700' }}>width</p>
        //     <p style={{ fontSize: '18px', fontWeight: '700' }}>height</p>
        //     <p style={{ fontSize: '18px', fontWeight: '700' }}>priority</p>
        //   </div>
        //   {datafichier?.map((item, index) => {
        //     let qt = item.quantity;
        //     console.log(qt);
        //     return (
        //       <div
        //         key={index}
        //         style={{
        //           display: 'grid',
        //           gridTemplateColumns: 'repeat(5, 1fr)',
        //           gap: '10px',
        //           alignItems: 'center',
        //           borderBottom: '1px solid gray'
        //         }}
        //       >
        //         <img src={item.path} alt={'image' + 1} style={{ width: '200px', height: '150px' }} />
        //         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        //           {' '}
        //           <button
        //             onClick={() => datafichier[index].quantity > 0 && datafichier[index].quantity--}
        //             style={{
        //               cursor: 'pointer',
        //               background: 'rgb(18, 204, 4)',
        //               color: 'white',
        //               border: '0',
        //               fontSize: '18px',
        //               borderRadius: '5px',
        //               width: '25px',
        //               height: '25px'
        //             }}
        //           >
        //             -
        //           </button>
        //           <span>{datafichier[index].quantity}</span>
        //           <button
        //             onClick={() => {
        //               console.log(qt, 'ee');
        //               datafichier[index].quantity = datafichier[index].quantity + 1;
        //             }}
        //             style={{
        //               cursor: 'pointer',
        //               background: 'rgb(18, 204, 4)',
        //               color: 'white',
        //               border: '0',
        //               fontSize: '18px',
        //               borderRadius: '5px',
        //               width: '25px',
        //               height: '25px'
        //             }}
        //           >
        //             +
        //           </button>
        //         </div>

        //         <div>{item.width}</div>
        //         <div>{item.height}</div>
        //         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        //           {edit ? (
        //             <>
        //               <span>{item.priority}</span>
        //               <EditIcon style={{ color: 'rgb(18, 204, 4)', fontSize: '16px', cursor: 'pointer' }} onClick={() => setEdit(false)} />
        //             </>
        //           ) : (
        //             <>
        //               <span>{item.priority}</span>
        //               <DoneIcon style={{ color: 'rgb(18, 204, 4)', fontSize: '16px', cursor: 'pointer' }} onClick={() => setEdit(true)} />
        //             </>
        //           )}
        //         </div>
        //       </div>
        //     );
        //   })}
        // </div>
      )}
      {current === 2 && <Placer />}
      {current === 3 && <Couper />}

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
        {current === 0 ? (
          <Button startIcon={<ArrowBackIcon />} style={{ marginRight: '8px', width: '50%' }} onClick={() => navigate('/projet')}>
            List de projet
          </Button>
        ) : (
          <Button style={{ marginRight: '8px', width: '50%' }} onClick={handlePrev}>
            Précédent
          </Button>
        )}

        <Button style={{ width: '50%' }} variant="contained" onClick={handleNext} disabled={current === totalSteps - 1}>
          Suivant
        </Button>
      </div>
    </MainCard>
  );
}

export default StepperPage;
