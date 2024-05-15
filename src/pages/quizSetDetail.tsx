import React from 'react';
import QuestionInfoComponent from '../components/quizSetDetail/quizSetInfo';
import { useLocation, useParams } from 'react-router-dom';
import BackgroundAnimation from '../components/public/BackgroundAnimation';
import Container from '../styles/publicStyleComponents/Container';
import NaviSection from '../styles/publicStyleComponents/NaviSection';
import styled from 'styled-components';
import Side from '../styles/publicStyleComponents/Side';
import ToastModal from '../components/public/toastModal';

const QuestionInfo = () => {
  const location = useLocation();
  const { quizSetId } = useParams();
  const currentMenuName = '문제집 조회';
  const { subLectureTitle, quizSetTitle, memberNickname } = location.state || {};

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={currentMenuName} />
        <InnerContentSection>
          <Side>
            <ToastModal />
          </Side>
          <Main>
            <Title>{quizSetTitle}</Title>
            <Subtitle>소강의명: {subLectureTitle}</Subtitle>
            <Author>작성자: {memberNickname}</Author>
            {quizSetId && <QuestionInfoComponent quizSetId={quizSetId} />}
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
`;

const Main = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 25px;
  color: #333;
`;

const Subtitle = styled.div`
  font-size: 1.4em;
  margin-left: 10px;
  margin-bottom: 15px;
  color: #555;
`;

const Author = styled.div`
  margin-left: 10px;  
  font-size: 1.1em;
  color: #777;
  margin-bottom: -80px;
`;
