import React from "react";
import { Container, PageBackGround } from "../styles/Public";
import ProblemPage from "../components/create/create_question";
import NavBar from "../components/public/navbar_default";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../styles/Background";
import NaviSection from "../components/new_components/NaviSection";
import styled from "styled-components";
import SidebarOptions from "../components/board/select_option";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const currentMenuName = '문제집 만들기'

    return (

    <BackgroundAnimation>
        <Container>
          <NaviSection currentMenuName = {currentMenuName}></NaviSection>
              <InnerContentSection>
                <Side>
                    <SidebarOptions/>
                </Side>

                <ProblemPage navigate={navigate}/> 

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