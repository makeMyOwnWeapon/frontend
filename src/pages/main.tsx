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

    background: linear-gradient(120deg, #FF0000, #0000FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  }

  #title span{
    display: block;
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
padding: 10px 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  
  &:hover {
    background-color: #2980b9;
  }

`