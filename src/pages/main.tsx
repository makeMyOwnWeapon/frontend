import React from 'react';
import styles from '../styles/Main.module.css'; 
import NavBar from '../components/public/navbar_default';
import Account from '../components/main/account';
import image from  '../images/loa2.png';

const Main: React.FC = () => {
  return (
    <div className={styles.mainBackground}>
      <NavBar /> 
      <div style={{ left: "65%", top: "60%" }} className={styles.loginButton}>
        <Account />
      </div>
      <img className={styles.mainImage} src={image} alt="Example" style={{ width: "40%", left: "9%", top: "10%" }} />
    </div>
  );
};

export default Main;
