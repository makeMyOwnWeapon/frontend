import React, { useEffect } from 'react';
import styles from '../styles/QuestionInfo.module.css';
import NavBar from '../components/public/navbar_default';
import QuestionInfoComponent from '../components/question/question_info_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const QuestionInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizSetId } = useParams();
  const { subLectureUrl } = location.state || { subLectureUrl: "" };
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  useEffect(() => {
    const token = cookies.jwt;
    if (!token) {
      alert('로그인 해 주세요!');
      navigate('/main');
    }
  }, [navigate]);

  return (
    <div>
      <div className={styles.navBarContainer}>
        <NavBar />
      </div>
      <div className={styles.pageBackGround}>
        {quizSetId && <QuestionInfoComponent videoUrl={subLectureUrl} quizSetId={quizSetId} />}
      </div>
    </div>
  );
};

export default QuestionInfo;
