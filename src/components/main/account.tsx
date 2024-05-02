import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WorkBook from '../../pages/workbook';
import Signup from '../../pages/signup';
import { Cookies } from 'react-cookie';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'default_client_id';
const Account: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );

    window.google?.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (userToken: string) => {
    try {
      localStorage.setItem('token', JSON.stringify(userToken));
      interface UserToken {
        credential: string;
      }
      const userTokenString: string | null = localStorage.getItem('token');
      if (!userTokenString) return;
      const { credential } = JSON.parse(userTokenString);
      const response = await axios.get('http://localhost:3000/api/member/signin', {
        headers: {
          'Authorization': `Bearer ${credential}`
        },
      });
      if (response.data === '') {
        navigate('/signup');
      } else {
        const cookies = new Cookies();
        const expireTimeUTC = Date.now() + response.data.expire * 1000; // 현재 시간에 expire 초를 더함
        const expireTimeKST = expireTimeUTC + (9 * 60 * 60 * 1000); // 한국 시간대로 보정
        const expireDateKST = new Date(expireTimeKST).toUTCString(); // UTC로 변환
        
        cookies.set('jwt', response.data.token, { expires: new Date(expireDateKST) });
        console.log(Date.now())
        
        
        localStorage.removeItem('token');
        navigate('/workbook');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/workbook" element={<WorkBook />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <div id="signInDiv"></div> {/* 로그인 버튼이 렌더링될 위치 */}
    </div>
  );
};

export default Account;
