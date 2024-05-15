import React from "react";
import ProblemPage from "../components/quizSetCreate/create_question";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import styled from "styled-components";
import ToastModal from "../components/public/toastModal";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const currentMenuName = '문제집 만들기'

    return (
    <BackgroundAnimation>
      <Container>
          <NaviSection currentMenuName = {currentMenuName}></NaviSection>
              <InnerContentSection>
                <Side>
                    <ToastModal/>
                </Side>
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
`
export const Side = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  /* border: 1px solid red; */
  width: 20%;
`;

const Main = styled.div`
  width: 70%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 85vh;
  justify-content: center;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;
