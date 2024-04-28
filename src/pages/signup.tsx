import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Title, SmallButton, NameContainer, Div } from '../styles/SignupStyles';
import NavBar from '../components/public/navbar_main';
import { useNavigate } from 'react-router-dom';
import { NameGeneratorButton } from '../styles/Public';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (buttonIndex: number) => {
    if (selectedButton === buttonIndex) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonIndex);
    }
  };

  const generateNickname = () => {
    const prefixes = ['Cool', 'Super', 'Mighty'];
    const suffixes = ['Wizard', 'Ranger', 'Ninja'];
    const name = ['User'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const newNickname = `${randomPrefix}${name}${randomSuffix}`;

    setNickname(newNickname);
  };
    const navigate = useNavigate();

    interface UserToken {
      credential: string;
    }
    const userTokenString: string | null = localStorage.getItem('token');
    let credential: string;

      if (userTokenString) {
        const userToken: UserToken = JSON.parse(userTokenString);
       credential = userToken.credential;
     }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expirationDate = new Date();

    try {
      
      const response = await axios.post('http://192.168.0.143:3000/api/member/signup', {
        authorizationCode: selectedButton === 1 ? 0 : 1,
        nickname: nickname
      }, {
        headers: {
          'Authorization': `Bearer ${credential}`
        }
      });
  
      if (response.data !== 'Invalid token') {
          localStorage.removeItem('token');
          document.cookie = `token=${response.data.token}; expires=${response.data.expire}`;
          navigate('/workbook');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <NavBar />
      <Div >
        <Title>Sign Up</Title>
        <SmallButton selected={selectedButton === 0} onClick={() => handleButtonClick(0)}> 선생님 </SmallButton>
        <SmallButton selected={selectedButton === 1} onClick={() => handleButtonClick(1)}> 학생 </SmallButton>
        <NameContainer>
          <NameGeneratorButton type="button" onClick={generateNickname}>Generate Nickname</NameGeneratorButton>
          {nickname && <p>{nickname}</p>}
        </NameContainer>
        <form onSubmit={handleSubmit}>
          <Button type="submit">Join</Button>
        </form>
        
      </Div>
    </Container>
  );
}

export default Signup;
