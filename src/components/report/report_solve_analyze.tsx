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

const ReportSolveAnalyze = ()=> {

    return (
        <Form>
            
            <SolveAnalyzeContainer>
                <ReportQuestionTitle>문제 풀이 해석</ReportQuestionTitle>
                <ComponentContainer>

                <text>더미데이터</text>

                </ComponentContainer>

            </SolveAnalyzeContainer>
        </Form>
    );
};

export default ReportSolveAnalyze;

const ReportQuestionTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold; 
`;

const ComponentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    flex-direction:column;
    width: 100%;
    min-height: 200px;

`;

const SolveAnalyzeContainer = styled.div`

    position: relative;
    width: 100%

`;