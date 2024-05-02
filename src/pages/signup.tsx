// src/pages/Signup.tsx
import React, { useState } from 'react';
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
  let credential: string = '';
  if (userTokenString) {
    const userToken: UserToken = JSON.parse(userTokenString);
    credential = userToken.credential;
  } else {
    return null;
  }

  return (
    <div>
      <NavBar />
      <div>
        <h1>Sign Up</h1>
        <button onClick={() => handleButtonClick({ buttonIndex: 0, selectedButton, setSelectedButton })}>선생님</button>
        <button onClick={() => handleButtonClick({ buttonIndex: 1, selectedButton, setSelectedButton })}>학생</button>
        <div>
          <NicknameGenerator onNicknameGenerated={setNickname} />
        </div>
        <form onSubmit={(event) => handleSubmit({ event, credential, nickname, selectedButton, navigate })}>
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
