import React from 'react';
import { MainImage, LoginButton } from '../styles/MainStyles';
import { MainBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import Account from '../components/main/account'
import image from  '../images/loa2.png'

const Main: React.FC = () => {
  return (
    <MainBackGround>
      <NavBar /> 
        <LoginButton left="65%" top="60%">
          <Account />
        </LoginButton>
        <MainImage src={image} alt="Example" width="50%" left="20px" top="10px" />
    </MainBackGround>
  );
};

export default Main;
