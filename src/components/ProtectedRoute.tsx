import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/services/pocketbase';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isPbAuthenticated = pb.authStore.isValid;

  if (!isAuthenticated || !isPbAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
