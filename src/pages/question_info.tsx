import React, { useEffect } from 'react';
import { NavBarContainer, PageBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default';
import QuestionInfoComponent from '../components/question/question_info_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';


const QuestionInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizSetId } = useParams();
  const { subLectureUrl } = location.state || { subLectureUrl: "" };
  const cookies = new Cookies();
  
  useEffect(() => {
    
    const token = cookies.get('jwt');
    if (!token) {
      alert('로그인 해 주세요!')
      navigate('/main');
    }
  }, [navigate]);

  return (
    <div>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>
      <PageBackGround>
        {quizSetId && <QuestionInfoComponent videoUrl={subLectureUrl} quizSetId={quizSetId} />}
      </PageBackGround>
    </div>
  );
};

export default QuestionInfo;
