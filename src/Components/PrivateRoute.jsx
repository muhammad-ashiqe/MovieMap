import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
