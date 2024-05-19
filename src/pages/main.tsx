import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountWithProvider from '../components/main/account';
import "../styles/Public";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";

interface MainProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main: React.FC<MainProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleIntroduce = () => {
    navigate("/introduce");
  };

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={undefined} isLoggedIn={isLoggedIn} />
        <InnerContentSection>
          <div id="title">
            <span className="title">온라인 학습 헬퍼</span>
            <span className="subtitle">LEARN ON-AIR</span>
          </div>
          <div id="info">
            <AccountWithProvider setIsLoggedIn={setIsLoggedIn} />
            <ButtonBox>
              <Button onClick={handleIntroduce}>소개페이지</Button>
            </ButtonBox>
          </div>
        </InnerContentSection>
      </Container>
    </BackgroundAnimation>
  );
};

export default Main;

const InnerContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: space-around;
  padding: 20px;

  > div {
    width: 100%;
  }

  #title {
    font-weight: bold;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    color: black;
    height: 30%;
  }

  .title {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .subtitle {
    font-size: 6.6rem;
    color: white;
    margin-bottom: 4%;
    text-shadow: 
      -3px -3px 0 #006C8D, 3px -3px 0 #006C8D, 
      -3px 3px 0 #006C8D, 3px 3px 0 #006C8D;
  }

  #account {
    height: 55%;
  }

  #account > #signInDiv {
    height: 100%;
  }

  #info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 40%;
  }
`;

const ButtonBox = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #ACE1F4;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;
