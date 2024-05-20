import React from 'react';
import QuestionInfoComponent from '../components/quizSetDetail/quizSetInfo';
import { useLocation, useParams } from 'react-router-dom';
import BackgroundAnimation from '../components/public/BackgroundAnimation';
import Container from '../styles/publicStyleComponents/Container';
import NaviSection from '../components/public/NaviSection';
import styled from 'styled-components';
import Main from '../styles/publicStyleComponents/Main';


interface QuestionInfoProps {
  isLoggedIn: boolean;
}

const QuestionInfo: React.FC<QuestionInfoProps>  = ({ isLoggedIn }) => {
  const location = useLocation();
  const { quizSetId } = useParams();
  const currentMenuName = '문제집 조회';
  const { subLectureTitle, quizSetTitle, memberNickname } = location.state || {};

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn}/>
        <InnerContentSection>
          <Main>
            <div id="main">
              <Title>{quizSetTitle}</Title>
                <Subtitle>소강의명: {subLectureTitle}</Subtitle>
                <Author>작성자: {memberNickname}</Author>
                {quizSetId && <QuestionInfoComponent quizSetId={quizSetId} />}      
            </div>
      
          </Main>
        </InnerContentSection>
      </Container>
    </BackgroundAnimation>
  );
};

export default QuestionInfo;

const InnerContentSection = styled.div`
  display: flex;
  height: 85%;
  /* border: 10px solid red; */



  #main{
    width: 100%;
    font-size: 1.5rem;
  }
`;


const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 25px;
  color: #333;
`;

const Subtitle = styled.div`
  margin-left: 10px;
  margin-bottom: 15px;
  color: #555;
`;

const Author = styled.div`
  margin-left: 10px;  
  color: #777;
  margin-bottom: -80px;
`;
