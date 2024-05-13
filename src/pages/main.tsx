import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Account from '../components/main/account'
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import { Cookies } from "react-cookie";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('jwt')
    console.log('로그아웃 핸들');
    navigate("/");
  };

  const navigateTo = (path: string) => {
    navigate(path); 
  };


  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection></NaviSection>
            <InnerContentSection>
              <div id="title">
                <span>온라인 학습 헬퍼</span>
                <span>Learn On-Air</span>
              </div>
              <div>
                <div id="info">
                  <Account/>
                  <Info onClick={handleLogout}>로그아웃</Info>
                  <Info>소개페이지</Info>
                </div>
              </div>
            </InnerContentSection>
      </Container>
   </BackgroundAnimation>
  );
};

export default Main;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  > div{
    /* border: 1px solid black; */
  }

  #title{
    font-weight: bold;
    font-size: 5rem;
    margin-top: 100px;
    height: 200px;
    display : flex;
    flex-direction: column;
    color: black;

    /* background: linear-gradient(120deg, #FF0000, #0000FF); */
    /* -webkit-background-clip: text; */
    /* -webkit-text-fill-color: transparent; */

  }

  #title span{
    display: block;
    font-size: 50%;
  }

  #account{
    /* border: 1px solid red; */
  }
  #account > #signInDiv{
    height: 100;
  }

  #info{
    /* border: 1px solid black; */
    display: flex;
    justify-content:space-evenly;
    flex-direction: column;
    width: 500px;
    height: 300px;
    align-items: center;


  }  

`;

const Info = styled.div`
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
    background-color: #2980b9;
  }

`