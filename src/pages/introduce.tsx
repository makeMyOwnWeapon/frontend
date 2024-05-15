import React from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";

const Main: React.FC = () => {
  const currentMenuName = '소개 페이지'

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName = {currentMenuName}></NaviSection>
            <InnerContentSection>
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
  justify-content: space-around;

  > div{
    border: 1px solid black;
  }
`