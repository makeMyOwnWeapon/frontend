// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NicknameGenerator from '../components/signup/nickNameGenerator';
import { handleButtonClick, handleSubmit } from '../components/signup/signupHandlers';
import { Cookies } from 'react-cookie';
import BackgroundAnimation from '../components/public/BackgroundAnimation';
import styled from 'styled-components';
import tw from 'twin.macro';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate();
  const cookies = new Cookies;
  const credential = cookies.get('tempGoogleToken');

  return (
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


const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 auto;

  
`;

const Button = styled.button`
  ${tw`w-full py-3 px-4 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700`}
  box-sizing: border-box; 
  border: none;         
  font-size: 1rem;
  cursor: pointer;
`;

const SmallButton = styled.button<{selected: boolean }>`
  padding: 8px 16px;
  margin-right: 8px;
  background-color: ${({ selected }) => (selected ? '#4CAF50' : '#CCCCCC')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const Title = styled.h1`
  padding: 20px 0;
  ${tw`text-2xl font-bold text-gray-900`};
  margin: 0 auto;
  font-size: 1rem;
  margin-bottom : 30px;
`;