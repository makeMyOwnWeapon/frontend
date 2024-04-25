import React, { useState } from 'react';
import { Input, InputContainer, Image } from '../../styles/CreateQuestion'







// 문제를 만드는 컴포넌트의 props 타입 정의
interface QuestionComponentProps {
  onDelete: () => void;
}

// 문제를 만드는 컴포넌트를 생성합니다.
const QuestionComponent: React.FC<QuestionComponentProps> = ({ onDelete }) => {
  const [time, setTime] = useState<string>('');
  const [questionType, setQuestionType] = useState<'objective' | 'subjective'>('objective');
  const [answer, setAnswer] = useState<string>('');

  return (
    <div>
      <div>
        <label>시간:</label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <label>문제 유형:</label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value as 'objective' | 'subjective')}>
          <option value="objective">객관식</option>
          <option value="subjective">주관식</option>
        </select>
      </div>
      {questionType === 'objective' ? (
        <div>
          <label>정답:</label>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
      ) : (
        <div>
          <label>답변:</label>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </div>
      )}
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

// 문제 페이지 컴포넌트를 생성합니다.
const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<JSX.Element[]>([<QuestionComponent key={0} onDelete={() => handleDelete(0)} />]);

  // 새로운 문제 컴포넌트 추가
  const addQuestionComponent = () => {
    setQuestionComponents([...questionComponents, <QuestionComponent key={questionComponents.length} onDelete={() => handleDelete(questionComponents.length)} />]);
  };

  // 문제 컴포넌트 삭제
  const handleDelete = (index: number) => {
    const updatedComponents = [...questionComponents];
    updatedComponents.splice(index, 1);
    setQuestionComponents(updatedComponents);
  };

  return (
    <div> 
      <InputContainer>
        <Input type="text" placeholder="동영상 URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <Image src={`http://img.youtube.com/vi/${videoUrl.split('v=')[1]}/0.jpg`} alt="Video Thumbnail" />
      </InputContainer>
      {questionComponents.map((component, index) => (
        <div key={index}>
          {component}
        </div>
      ))}
      <button onClick={addQuestionComponent}>문제 추가</button>
    </div>
  );
};

export default ProblemPage;
