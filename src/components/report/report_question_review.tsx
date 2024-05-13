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
    console.log(data);
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
                <Problem>
                <ReportQuestionTitle>문제 다시보기</ReportQuestionTitle>
                <Slider className="custom-slider" {...settings}> 
                {data && data.map((question, index) => (
                <QuestionContainer key={index}>

                    <Question key={index}>
                         <h3>{index+1}번 문제: {question.question}</h3>
                        {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            <TextContainer key={choiceIndex}>{choiceIndex + 1}번 : {choice.content}</TextContainer>
                        ))}
                        
                        {/* {question && question.choices.length === 1 && question.choices.map((choice, choiceIndex) => (
                            <TextContainer key={choiceIndex}>제출한 답 : {choice.content}</TextContainer>
                        ))} */}

                        <AnswerContainer> 

                        <h3>해설</h3>
                        <TextContainer>{question.commentary}</TextContainer>
                        
                        <h3>정답</h3>
                          {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            choice.isAnswer === true  ?
                            <TextContainer key={choiceIndex}>{choiceIndex+1}번 : {choice.content}</TextContainer>:
                            null

                        ))}

                        </AnswerContainer>  
                    </Question>
                    
                   

                </QuestionContainer>
                
            ))}
                </Slider>
                </Problem>
            </SliderContainer>
        </Form>
    );
};

export default ReportQuestionReview;



const ReportQuestionTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold; 
    /* border: 1px solid red; */
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

const Problem = styled.div`
    
`
