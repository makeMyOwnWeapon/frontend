import React from "react";
import ProblemPage from "../components/quizSetCreate/create_question";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import styled from "styled-components";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../components/public/NaviSection";
import Main from "../styles/publicStyleComponents/Main";

interface CreateProps {
  isLoggedIn: boolean;
}

const Create: React.FC<CreateProps> = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const currentMenuName = '문제집 만들기'

    return (
    <BackgroundAnimation>
      <Container>
          <NaviSection currentMenuName = {currentMenuName} isLoggedIn={isLoggedIn} />
              <InnerContentSection>
                <Main>
                <ProblemPage navigate={navigate}/> 
                </Main>
              </InnerContentSection>
        </Container>
     </BackgroundAnimation>
    );
};

export default Create;

const InnerContentSection = styled.div`
    display: flex;
    height: 85%;
    /* border: 10px solid red; */
`