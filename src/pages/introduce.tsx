import React from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";

interface IntroduceProps {
  isLoggedIn: boolean;
}

const Introduce: React.FC<IntroduceProps> = ({ isLoggedIn }) => {
  const currentMenuName = '소개 페이지'

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn} />
            <InnerContentSection>
            </InnerContentSection>
      </Container>
   </BackgroundAnimation>
  );
};

export default Introduce;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
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