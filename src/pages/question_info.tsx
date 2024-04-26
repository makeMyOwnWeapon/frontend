import React from 'react';
import { Form, InputContainer } from '../styles/CreateQuestion';
import { NavBarContainer, PageBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar';

// 옵션 객체에 대한 타입 정의
interface Option {
    id: number;
    text: string;
  }
  
  // 질문 객체에 대한 타입 정의
  interface Question {
    time: string;
    question: string;
    options?: Option[]; // 선택적 속성
    answer?: string;
  }
  
  // QuestionComponent의 props에 대한 타입 정의
  interface QuestionComponentProps {
    videoUrl: string;
    questions: Question[];
  }

// Sample JSON data as given in the example
const data : {videoUrl: string; questions: Question[] } ={
  "videoUrl": "https://example.com/video",
  "questions": [
    {
      "time": "00:01:30",
      "question": "다음 중 올바른 생태계 순환 과정은 무엇입니까?",
      "options": [
        { "id": 1, "text": "태양 -> 식물 -> 동물 -> 박테리아 -> 태양" },
        { "id": 2, "text": "동물 -> 식물 -> 박테리아 -> 태양 -> 동물" },
        { "id": 3, "text": "식물 -> 동물 -> 태양 -> 박테리아 -> 식물" },
        { "id": 4, "text": "태양 -> 식물 -> 동물 -> 박테리아 -> 식물" }
      ]
    },
    {
      "time": "00:05:00",
      "question": "포토샵의 주요 기능을 설명하시오.",
      "answer": "포토샵은 디지털 이미지를 편집, 조정, 변형하는 소프트웨어로, 레이어, 마스크, 필터, 브러쉬 등 다양한 도구를 사용하여 이미지를 세밀하게 조작할 수 있습니다."
    }
  ]
};

// React component for displaying questions
const QuestionComponent = ({ videoUrl, questions }:QuestionComponentProps) => {
  return (
      <Form>
      <InputContainer>Video URL: {videoUrl}</InputContainer>
      {questions.map((question:Question, index:number) => (
        <div key={index}>
          <InputContainer>Time: {question.time}</InputContainer>
          <InputContainer>Question: {question.question}</InputContainer>
          {question.options && (
            <ul>
              {question.options.map(option => (
                <li key={option.id}>{option.text}</li>
              ))}
            </ul>
          )}
          {question.answer && <div>Answer: {question.answer}</div>}
        </div>
      ))}
      
      </Form>
  );
};

// Wrapper component that passes the data to the QuestionComponent
const QuestionInfo = () => {
  return (
    <div>
      <NavBarContainer>
        <NavBar/>
      </NavBarContainer>
      
      <PageBackGround>

        <QuestionComponent videoUrl={data.videoUrl} questions={data.questions} />
      </PageBackGround>
      
    </div>
  );
};

export default QuestionInfo;
