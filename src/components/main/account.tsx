import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WorkBook from '../../pages/workbook';
import Signup from '../../pages/signup';
import { Cookies } from 'react-cookie';
import { GoogleOAuthProvider,GoogleLogin,useGoogleOneTapLogin,googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from 'os';
import { getAuthToken } from '../../helpers/axios_helper';
import styled from 'styled-components';


interface CredentialResponse {
  
  credential: string;
}
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'default_client_id';
const Account: React.FC = () => {

  const cookies = new Cookies;

  const handleLogout = () => {
    cookies.remove('jwt')
    console.log('로그아웃 핸들');
    navigate("/");
  };

  const navigate = useNavigate();
  let getUserInfoByGoogle = getAuthToken();
  let userInfo: string | null = null;

    if (getUserInfoByGoogle !== null) {
      userInfo = jwtDecode(getUserInfoByGoogle);
    }

  console.dir(userInfo);

  const handleCredentialResponse = async (userInfoByGoogle: any) => {

    let credential = userInfoByGoogle.credential;
    try {
      const response = await axios.get('http://localhost:3000/api/member/signin', {
        headers: {
          'Authorization': `Bearer ${credential}`
        },
      });
      if (response.data === '') {
        cookies.set('tempGoogleToken', credential);
        navigate('/signup');
      } else {
        const cookies = new Cookies();
        const expireTimeUTC = Date.now() + response.data.expire * 1000; // 현재 시간에 expire 초를 더함
        const expireTimeKST = expireTimeUTC + (9 * 60 * 60 * 1000); // 한국 시간대로 보정
        const expireDateKST = new Date(expireTimeKST).toUTCString(); // UTC로 변환
        cookies.set('jwt', response.data.token, { expires: new Date(expireDateKST) });
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (


    <div id="account">
      <GoogleOAuthProvider clientId={clientId}>
        
      {
        userInfo ? (
          <div>
            <h2>{(userInfo as any)?.nickname}님 안녕하세요</h2>
            <Logout onClick={handleLogout}>로그아웃</Logout>
          </div>
          
        ) : (
        
          <GoogleLogin
          onSuccess={(response)=>{
            handleCredentialResponse(response);
          }}
          onError={() => {
            alert('Login Failed');
          }}
        />
      
        )
      }
        
    </GoogleOAuthProvider>
    </div>
  );
};

export default Account;

const Logout = styled.div`
  margin-top: 100px;
  padding: 10px 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }


`

