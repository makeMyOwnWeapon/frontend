import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WorkBook from '../../pages/workbook';
import Signup from '../../pages/signup';
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
      { theme: 'outline', size: 'large' }  // 버튼 옵션
    );

    window.google?.accounts.id.prompt(); // 세션 종료 시 자동 로그인 프롬프트
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log(response.clientId)
    console.log(response.client_id)
    console.log(response.credential)
    console.log(response.selected_by)
    // 여기서 response를 사용하여 사용자 로그인 처리
    navigate('/workbook');

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
