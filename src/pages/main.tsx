import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Account from '../components/main/account'
import "../styles/Public"
import BackgroundAnimation from "../styles/BackgroundAnimation"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";



const Main: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path); 
  };

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection></NaviSection>
            <InnerContentSection>
              <div id="title">Learn On Air</div>
              <div>
                <div id="info">
                  <Account/>
                <InfoButton onClick={() => navigateTo("/info")}>
                  Info for New Users
                </InfoButton>
                  
                </div>
              </div>
            </InnerContentSection>
      </Container>
   </BackgroundAnimation>
  );
};

export default Main;

const InnerContentSection = styled.div`
  border: 10px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  > div{
    /* border: 1px solid black; */
  }

  /* #title{
    font-weight: bold;
    font-size: 5rem;
    margin-top: 100px;
    height: 200px;
    line-height: 200px;   
  }

  #account{
    border: 1px solid red;
  }
  #account > #signInDiv{
    height: 100;
  }

  #info{

    border: 1px solid black;
    display: flex;
    justify-content:space-evenly;
    flex-direction: column;
    width: 500px;
    height: 300px;


  }   */
`;

const InfoButton = styled.div`
  padding: 30px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  

  &:hover {
    background-color: #2980b9;
  }
`;
