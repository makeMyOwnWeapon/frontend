import React, { useState } from 'react';
import { Input, InputContainer, Image, QuestionContainer, InputBoxWrapper, Label, Input_text } from '../../styles/CreateQuestion'
import { Form, NameGeneratorButton, SmallButton } from '../../styles/SignupStyles';

// 문제를 만드는 컴포넌트의 props 타입 정의
interface QuestionComponentProps {
  onDelete: () => void;
}

// 문제를 만드는 컴포넌트를 생성합니다.
const QuestionComponent: React.FC<QuestionComponentProps> = () => {
  const [time, setTime] = useState<string>('');
  const [questionType, setQuestionType] = useState<'objective' | 'subjective'>('objective');
  const [answer, setAnswer] = useState<string>('');
  return (
    <QuestionContainer>
      <div>
      <InputBoxWrapper>
        <label>시간: </label>
        <Input_text type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        </InputBoxWrapper>
      </div>
      <div>
        <label>문제 유형:</label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value as 'objective' | 'subjective')}>
          <option value="objective">객관식</option>
          <option value="subjective">주관식</option>
        </select>
      </div>
      {questionType === 'objective' ? (
        //문제를 담는 코드. 하지만 지금으로써는 하나의 답안밖에 받지 못함으로 list 배열로 만들어서 받던지 해야됨.
        <div>
              <InputBoxWrapper>
              <label>1번: </label>
              <Input_text type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </InputBoxWrapper>
              <InputBoxWrapper>
              <label>2번: </label>
              <Input_text type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </InputBoxWrapper>
              <InputBoxWrapper>
              <label>3번: </label>
              <Input_text type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </InputBoxWrapper>
              <InputBoxWrapper>
              <label>4번: </label>
              <Input_text type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </InputBoxWrapper>
        </div>
      ) : (
        <InputBoxWrapper>
              <label>답: </label>
              <Input_text type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              </InputBoxWrapper>
      )}
    </QuestionContainer>
  );
};

// 문제 페이지 컴포넌트를 생성합니다.
const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<JSX.Element[]>([]);

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
    // Image url => 나중에 인프런으로 바꾸면 url 바꿔야됨.
    <Form>
      <InputContainer>
        <Input type="text" placeholder="동영상 URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <Image src={`http://img.youtube.com/vi/${videoUrl.split('v=')[1]}/0.jpg`} alt="Video Thumbnail" /> 
      </InputContainer>
      {questionComponents.map((component, index) => (
        <div key={index}>
          {component}
          {index === questionComponents.length - 1 && <NameGeneratorButton type="button" onClick={() => handleDelete(index)}>문제 삭제</NameGeneratorButton>}
        </div>
      ))}
      <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>
    </Form>
  );
};

export default ProblemPage;
