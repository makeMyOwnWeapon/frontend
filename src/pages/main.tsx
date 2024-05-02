import React from 'react';
import NavBar from '../components/public/navbar_default';
import Account from '../components/main/account';
import image from '../images/loa2.png';

const Main: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Account />
      <img src={image} alt="Example"/>
    </div>
  );
};

export default Main;
