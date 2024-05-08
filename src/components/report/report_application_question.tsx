import React, { useState } from "react";
import { Form } from '../../styles/CreateQuestion';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/fad.css';


interface Choice {
    content: string;
    isAnswer: boolean;
}

interface quizzes{
    quizzes:Question_[]
}

interface Question_ {
    choices: Choice[];
    commentary:string;
    isCorrect:boolean;
    question:string;
    solvedDuration:number;
    userChoice:string;
}

// 옵션 객체에 대한 타입 정의

// React component for displaying questions
const ReportSolveAnalyze = ()=> {


    return (
        <Form>
            
            <SolveAnalyzeContainer>
                <ApplicationQuestionTitle>응용문제</ApplicationQuestionTitle>
                <ComponentContainer>

                <text>더미데이터</text>

                </ComponentContainer>





            </SolveAnalyzeContainer>
        </Form>
    );
};

export default ReportSolveAnalyze;

const ApplicationQuestionTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold; 
`;

const ComponentContainer = styled.div`
    flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc; /* 테두리 스타일 지정 */
    border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
    padding: 10px; /* 내부 여백 추가 */
    margin: 10px; /* 외부 패딩 추가 */
    flex-direction:column;
    width: 100%;
    min-height: 200px;

`;

const SolveAnalyzeContainer = styled.div`

    margin-top: 100px;
    position: relative;
    width: 100%


`;