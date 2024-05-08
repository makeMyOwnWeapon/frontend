// src/pages/Signup.tsx
import React, { useState } from 'react';
import { Button, Title, SmallButton, NameContainer, Div } from '../styles/SignupStyles';
import { useNavigate } from 'react-router-dom';
import NicknameGenerator from '../components/signup/nickname_generator';
import { handleButtonClick, handleSubmit } from '../components/signup/signup_handlers';
import { Cookies } from 'react-cookie';
import BackgroundAnimation from '../styles/Background';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate();
  const cookies = new Cookies;
  const credential = cookies.get('tempGoogleToken');

  return (

    // <div>
    //   ddd
    // </div>

              // <NicknameGenerator onNicknameGenerated={setNickname} />

     
      // {/* <NavBar />
      <BackgroundAnimation>
        <Div>
        <Title>Sign Up</Title>
        <SmallButton selected={selectedButton === 0} onClick={() => handleButtonClick({ buttonIndex: 0, selectedButton, setSelectedButton })}>선생님</SmallButton>
        <SmallButton selected={selectedButton === 1} onClick={() => handleButtonClick({ buttonIndex: 1, selectedButton, setSelectedButton })}>학생</SmallButton>
        <NameContainer>
          <NicknameGenerator onNicknameGenerated={setNickname} />
        </NameContainer>
        <form onSubmit={(event) => handleSubmit({ event, credential, nickname, selectedButton, navigate })}>
          <Button type="submit">Join</Button>
        </form>
        </Div>
      </BackgroundAnimation>
  );
}

export default Signup;
