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
  const cookies = new Cookies();
  const credential = cookies.get('tempGoogleToken');

  return (
    <BackgroundAnimation>
      <Container>
        <Content>
          <Title>Sign Up</Title>
          <ButtonGroup>
            <SmallButton
              selected={selectedButton === 0}
              onClick={() => handleButtonClick({ buttonIndex: 0, selectedButton, setSelectedButton })}
            >
              선생님
            </SmallButton>
            <SmallButton
              selected={selectedButton === 1}
              onClick={() => handleButtonClick({ buttonIndex: 1, selectedButton, setSelectedButton })}
            >
              학생
            </SmallButton>
          </ButtonGroup>
          <NameContainer>
            <NicknameGenerator onNicknameGenerated={setNickname} />
          </NameContainer>
          <Form onSubmit={(event) => handleSubmit({ event, credential, nickname, selectedButton, navigate })}>
            <SubmitButton type="submit">확인</SubmitButton>
          </Form>
        </Content>
      </Container>
    </BackgroundAnimation>
  );
}

export default Signup;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${tw`w-full max-w-md`}
`;

const Title = styled.h1`
  ${tw`text-6xl font-bold text-center mb-16`}
  color: #0d47a1;
`;

const ButtonGroup = styled.div`
  ${tw`flex justify-center mb-6`}
`;

const SmallButton = styled.button<{ selected: boolean }>`
  ${tw`py-3 px-6 mx-2 rounded text-lg`}
  background-color: ${({ selected }) => (selected ? '#1565c0' : '#e3f2fd')};
  color: ${({ selected }) => (selected ? '#fff' : '#1565c0')};
  border: 2px solid #1565c0;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#0d47a1' : '#bbdefb')};
  }
`;

const NameContainer = styled.div`
  ${tw`mb-6`}
`;

const Form = styled.form`
  ${tw`flex flex-col items-center`}
`;

const SubmitButton = styled.button`
  ${tw`py-3 px-6 text-white bg-blue-500 rounded-md hover:bg-blue-700 text-lg`}
  font-size: 1.25rem;
  cursor: pointer;
`;
