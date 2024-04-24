import React from 'react';
import { MainContainer } from '../styles/MainStyles'; // MainContainer 스타일 가져오기
import NavBar from '../components/public/navbar'
import Account from '../components/main/account'

const Main: React.FC = () => {
  return (
    <MainContainer>
      <NavBar /> 
      <Account />
    </MainContainer>
  );
};

export default Main;
