import React, { useState } from 'react';
import axios from 'axios'; // Axios를 임포트합니다.
import { Container, Form, Button, Title, SmallButton, NameGeneratorButton, NameContainer, Div } from '../styles/SignupStyles';
import NavBar from '../components/public/navbar_main';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

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
      // Axios를 사용하여 POST 요청을 보냅니다.
      
      const response = await axios.post('http://192.168.0.143:3000/api/member/signup', {
        
        authorizationCode: selectedButton === 1 ? 0 : 1,
        nickname: nickname
      }, {
        headers: {
          'Authorization': `Bearer ${credential}}`
        }
      });
      
      console.log('response: ', response);
      // 성공적으로 요청이 처리되면 이후 동작을 추가할 수 있습니다. (예: 페이지 리디렉션 등)

      if (response.data !== 'Invalid token') {
          localStorage.removeItem('token');
          console.log(response.data);
          expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000));
          document.cookie = `token=${response.data}; expires=${expirationDate.toUTCString()}`;

          navigate('/workbook');
      }
    } catch (error) {
      // 요청이 실패한 경우 에러를 처리할 수 있습니다.
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
