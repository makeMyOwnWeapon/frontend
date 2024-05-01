import React, { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
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
      { theme: 'outline', size: 'large' }
    );

    window.google?.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (userToken: string) => {
    try {
      localStorage.setItem('token',JSON.stringify(userToken));
      interface UserToken {
        credential: string;
      }
      const userTokenString: string | null = localStorage.getItem('token');
      let credential: string;
      if (userTokenString) {
        const userToken: UserToken = JSON.parse(userTokenString);
       credential = userToken.credential;
     }else{return;}
      const response = await axios.get('http://localhost:3000/api/member/signin', {
        headers: {
          'Authorization': `Bearer ${credential}`
        },
      });
            if (response.data === '') {
        navigate('/signup');
      } else {
        localStorage.removeItem('token');
        console.log(response.data.token);
        document.cookie = `token=${response.data.token}; expires=${response.data.expire};`;
        navigate('/workbook');

      }
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