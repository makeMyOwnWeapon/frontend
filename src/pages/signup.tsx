import React , {useState} from 'react';
import { Container, Form, Button, Title, SmallButton,NameGeneratorButton, NameContainer } from '../styles/SignupStyles';
import NavBar from '../components/public/navbar_main';


function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const handleButtonClick = (buttonIndex: number) => {
    // 이미 선택된 버튼이면 선택을 해제합니다.
    if (selectedButton === buttonIndex) {
      setSelectedButton(null);
    } else {
      // 선택되지 않은 버튼이면 해당 버튼을 선택합니다.
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

  return (
    <Container>
      <NavBar/>
      <Form>
      <Title>Sign Up</Title>
      <SmallButton selected={selectedButton === 0} onClick={(event) => {event.preventDefault();  handleButtonClick(0); }}> 선생님 </SmallButton>
      <SmallButton selected={selectedButton === 1} onClick={(event) => {event.preventDefault();  handleButtonClick(1); }}> 학생 </SmallButton>
        <NameContainer>
          <NameGeneratorButton type="button" onClick={generateNickname}>Generate Nickname</NameGeneratorButton> 
          {nickname && <p>{nickname}</p>} 
        </NameContainer>
        <Button type="submit">Join</Button>
      </Form>
    </Container>
  );
}

export default Signup;
