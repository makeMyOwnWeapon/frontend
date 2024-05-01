import React from 'react';
import { MainImage, LoginButton } from '../styles/MainStyles';
import { MainBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import Account from '../components/main/account'
import image from  '../images/loa2.png'

const Main: React.FC = () => {
  return (
    <MainBackGround>
      <NavBar/> 
        <LoginButton left="65%" top="60%">
          <Account />
        </LoginButton>
        <MainImage src={image} alt="Example" width="40%" left="9%" top="10%" />
    </MainBackGround>
  );
};

export default Main;
