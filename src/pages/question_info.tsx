import React, { useEffect, useState } from 'react';
import { NavBarContainer, PageBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default';
import QuestionInfoComponent from '../components/question/question_info_component';
import { useLocation, useParams } from 'react-router-dom';

const QuestionInfo = () => {
  const {quizSetId} = useParams();
  const location = useLocation();
  const { subLectureUrl } = location.state || { subLectureUrl: "" };
  return (
    <div>
      <NavBarContainer>
        <NavBar/>
      </NavBarContainer>

      <PageBackGround>

       {quizSetId&& <QuestionInfoComponent videoUrl={subLectureUrl}  quizSetId={quizSetId} />}

      </PageBackGround>
      
    </div>
  );
};

export default QuestionInfo;