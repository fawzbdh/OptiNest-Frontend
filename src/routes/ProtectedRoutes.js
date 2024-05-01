import React from 'react';
import MainLayout from 'layout/MainLayout';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const localStorageToken = localStorage.getItem('token');

  return localStorageToken ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;
