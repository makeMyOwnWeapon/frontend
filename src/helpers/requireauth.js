import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = cookies.get('jwt');

  if (!token) {
    alert('먼저 로그인을 해주세요.');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
