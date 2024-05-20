import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken, googleRequest } from '../../helpers/axios_helper';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'default_client_id';

interface AccountProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Account: React.FC<AccountProps> = ({ setIsLoggedIn }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const getUserInfoByGoogle = getAuthToken();
  let userInfo: any = null;

  if (getUserInfoByGoogle !== null) {
    userInfo = jwtDecode<any>(getUserInfoByGoogle);
  }

  const handleCredentialResponse = async (userInfoByGoogle: any) => {
    let credential = userInfoByGoogle.credential;
    try {
      const response = await googleRequest('GET', 'api/member/signin', credential);
      if (response.data === '') {
        cookies.set('tempGoogleToken', credential);
        navigate('/signup');
      } else {
        const expireTimeUTC = Date.now() + response.data.expire * 1000;
        const expireTimeKST = expireTimeUTC + (9 * 60 * 60 * 1000);
        const expireDateKST = new Date(expireTimeKST).toUTCString();
        cookies.set('jwt', response.data.token, { expires: new Date(expireDateKST) });
        setIsLoggedIn(true);
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
              <h2>{userInfo.nickname}님 안녕하세요</h2>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response: any) => {
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
