import React from 'react';
import QuestionInfoComponent from '../components/quizSetDetail/quizSetInfo';
import { useLocation,  useParams } from 'react-router-dom';

const QuestionInfo = () => {
  const location = useLocation();
  const { quizSetId } = useParams();
  const { subLectureUrl } = location.state || { subLectureUrl: "" };
  
  return (
    <div>

        {quizSetId && <QuestionInfoComponent videoUrl={subLectureUrl} quizSetId={quizSetId} />}
    </div>
  );
};

export default QuestionInfo;
