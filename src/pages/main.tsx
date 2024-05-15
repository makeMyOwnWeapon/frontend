import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Account from '../components/main/account';
import "../styles/Public";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";
import { Cookies } from "react-cookie";
import { getAuthToken } from "../helpers/axios_helper";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const currentMenuName = '홈';

  const jwt = getAuthToken();

  const handleLogout = () => {
    cookies.remove('jwt');
    navigate("/");
  };

  const handleIntroduce = () => {
    navigate("/introduce");
  };

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={currentMenuName} />
        <InnerContentSection>
          <div id="title">
            <span>온라인 학습 헬퍼</span>
            <span>Learn On-Air</span>
          </div>
          <div id="info">
            <Account />
            <div id="buttonBox">
              {jwt && <Button onClick={handleLogout}>로그아웃</Button>}
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
    font-size: 5rem;
    margin-top: 100px;
    height: 200px;
    display: flex;
    flex-direction: column;
    color: black;
  }

  #title span {
    display: block;
    font-size: 66px;
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
  font-size: 1rem;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;
