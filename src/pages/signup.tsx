import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';
import NavBar from '../components/public/navbar_main';
import { useNavigate } from 'react-router-dom';
import NicknameGenerator from '../components/signup/nickname_generator';
import { handleButtonClick, handleSubmit } from '../components/signup/signup_handlers';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate();

  interface UserToken {
    credential: string;
  }

  const userTokenString: string | null = localStorage.getItem('token');
  let credential: string;
  if (userTokenString) {
    const userToken: UserToken = JSON.parse(userTokenString);
    credential = userToken.credential;
  } else {
    return null;
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.div}>
        <h1 className={styles.title}>Sign Up</h1>
        <button className={`${styles.smallButton} ${selectedButton === 0 ? styles.selected : ''}`}
          onClick={() => handleButtonClick({ buttonIndex: 0, selectedButton, setSelectedButton })}>선생님</button>
        <button className={`${styles.smallButton} ${selectedButton === 1 ? styles.selected : ''}`}
          onClick={() => handleButtonClick({ buttonIndex: 1, selectedButton, setSelectedButton })}>학생</button>
        <div className={styles.nameContainer}>
          <NicknameGenerator onNicknameGenerated={setNickname} />
        </div>
        <form onSubmit={(event) => handleSubmit({ event, credential, nickname, selectedButton, navigate })}>
          <button type="submit" className={styles.button}>Join</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
