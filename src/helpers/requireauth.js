import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2';

const cookies = new Cookies();

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = cookies.get('jwt');

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '먼저 로그인을 해주세요.',
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
