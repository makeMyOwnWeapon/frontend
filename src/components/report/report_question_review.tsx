import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Form } from '../../styles/CreateQuestion';
import {  Question } from '../../styles/QuestionInfo';
import { QuestionContainer } from "../../styles/QuestionInfo";
import { SliderContainer, TextContainer } from "../../styles/Public";
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

const ReportQuestionReview = ({ quizzes }:quizzes )=> {
    const [data, setData] = useState<Question_[]>();
    useEffect(()=>{
    setData(quizzes);
    

    },[quizzes])
    
    const settings = {
        dots: true,
        infinite: data && data.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Form>
            <SliderContainer>
                <ReportQuestionTitle>문제 다시보기</ReportQuestionTitle>
                <Slider className="custom-slider" {...settings}> 
                {data && data.map((question, index) => (
                <QuestionContainer key={index}>
                    <TextContainer>{index+1}번 문제: {question.question}</TextContainer>
                    <Question key={index}>
                        
                        {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            choiceIndex.toString() === question.userChoice ?
                            <ReportCorrectTextContainer key={choiceIndex}>정답 : {choice.content}</ReportCorrectTextContainer>:
                            <TextContainer key={choiceIndex}>{choice.content}</TextContainer>
                            
                        ))}
                        {question && question.choices.length === 1 && question.choices.map((choice, choiceIndex) => (
                            <TextContainer key={choiceIndex}>제출한 답 : {choice.content}</TextContainer>
                        ))}

                    </Question>
                    
                    <AnswerContainer> 

                    <TextContainer>{question.commentary}</TextContainer>
                    정답
                    {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                        choice.isAnswer === true  ?
                        <TextContainer key={choiceIndex}>{choice.content}</TextContainer>:
                        null

                    ))}

                    </AnswerContainer>  

                </QuestionContainer>
            ))}
                </Slider>
            </SliderContainer>
        </Form>
    );
};

export default ReportQuestionReview;



const ReportQuestionTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold; 
`;

const AnswerContainer = styled.div`
`;

const ReportCorrectTextContainer = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #bcddff;
  border-radius: 5px;
  color: #212529;
  font-size: 16px;
  line-height: 1.5;
`;