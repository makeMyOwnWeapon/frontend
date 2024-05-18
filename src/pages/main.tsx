import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Account from '../components/main/account';
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
        <NaviSection currentMenuName={''} isLoggedIn={isLoggedIn} />
        <InnerContentSection>
          <div id="title">
            <span>온라인 학습 헬퍼</span>
            <span>Learn On-Air</span>
          </div>
          <div id="info">
            <Account setIsLoggedIn={setIsLoggedIn} />
            <div id="buttonBox">
              <Button onClick={handleIntroduce}>소개페이지</Button>
            </div>
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

  > div {
  }

  #title {
    font-weight: bold;
    font-size: 4rem;
    margin-top: 100px;
    height: 200px;
    display: flex;
    flex-direction: column;
    color: black;
  }

  #title span {
    display: block;
  }

  #account {
  }

  #account > #signInDiv {
    height: 100;
  }

  #info {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 300px;
    align-items: center;
  }  

  #info #buttonBox {
    margin-top: 50px;
    display: flex;
    > div:first-of-type {
      margin-right: 10px;
    }
  }
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
