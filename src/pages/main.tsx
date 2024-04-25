import React from 'react';
import { MainContainer, MainImage, LoginButton } from '../styles/MainStyles'; // MainContainer 스타일 가져오기
import NavBar from '../components/public/navbar'
import Account from '../components/main/account'
import image from  '../images/loa2.png'

const Main: React.FC = () => {
  return (
    <MainContainer>
      <NavBar /> 
        <LoginButton left="400px" top="450px">
          <Account />
        </LoginButton>
      
        <MainImage src={image} alt="Example" width="50%" left="20px" top="10px" />
        
    </MainContainer>
  );
};

export default Main;
