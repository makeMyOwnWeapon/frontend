import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import WorkBook from '../../pages/workbook';
import Signup from '../../pages/signup';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'default_client_id';

const Account: React.FC = () => {

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }  // 로그인 버튼 옵션
    );

    window.google?.accounts.id.prompt(); // 세션 종료 시 자동 로그인 프롬프트
  }, []);

  const handleCredentialResponse = async (userToken: string) => {
    try {
      const response = await axios.get('http://192.168.0.143:3000/api/member/signin', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      console.log('User Data:', response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/workbook" element={<WorkBook/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <div id="signInDiv"></div> {/* 로그인 버튼이 렌더링될 위치 */}
    </div>
  );
};

export default Account;