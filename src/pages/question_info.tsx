import React, { useEffect, useState } from 'react';
import { NavBarContainer, PageBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default';
import QuestionInfoComponent from '../components/question/question_info_component';
import { useParams } from 'react-router-dom';

// 옵션 객체에 대한 타입 정의
interface Option {
    id: number;
    text: string;
  }
  
  // 질문 객체에 대한 타입 정의
  interface Question__ {
    time: string;
    question: string;
    options?: Option[]; // 선택적 속성
    answer?: string;
  }
  


// Sample JSON data as given in the example
const data : {videoUrl: string; questions: Question__[] } ={
  "videoUrl": "https://www.inflearn.com/course/lecture?courseSlug=%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-jwt&unitId=65764",
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

const QuestionInfo = () => {
  const {quizSetId} = useParams();

  return (
    <div>
      <NavBarContainer>
        <NavBar/>
      </NavBarContainer>

      <PageBackGround>

       {quizSetId&& <QuestionInfoComponent videoUrl={data.videoUrl}  quizSetId={quizSetId} />}

      </PageBackGround>
      
    </div>
  );
};

export default QuestionInfo;
