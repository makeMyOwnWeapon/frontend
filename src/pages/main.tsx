import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Account from '../components/main/account'
import image from "../images/loa2.png";
import "../styles/Public"



const Main: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Title>Welcome to Learn On Air</Title>
      <MainImage src={image} alt="Example" />
      <Account />
      <br></br>
      <InfoButton onClick={() => navigateTo("/info")}>
        Info for New Users
      </InfoButton>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background-image: url("https://img.freepik.com/premium-photo/beautiful-abstract-bokeh-blue-white-tones-festive-backgrounds-wallpaper-shiny-decorations-cool-banners-pages-advertisements-websites_97567-834.jpg");
  background-size: cover;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const MainImage = styled.img`
  width: 30%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const InfoButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 200px;
  margin-bottom: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;