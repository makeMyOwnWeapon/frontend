import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Form } from '../../styles/CreateQuestion';
import {  Question } from '../../styles/QuestionInfo';
import { QuestionContainer } from "../../styles/QuestionInfo";
import { SliderContainer, TextContainer } from "../../styles/Public";
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
const ReportQuestionInfoComponent = ({ quizzes }:quizzes )=> {

    const [data, setData] = useState<Question_[]>();
    useEffect(()=>{
    setData(quizzes);
    

    },[quizzes])
    
    console.log('reportquestion: ',data);
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
                <Slider className="custom-slider" {...settings}> 
                
                {data && data.map((question, index) => (
                <QuestionContainer key={index}>
                    <TextContainer>문제: {question.question}</TextContainer>
                    <Question key={index}>
                        
                        {question && question.choices && question.choices.map((choice, choiceIndex) => (
                            <TextContainer key={choiceIndex}>{choice.content}</TextContainer>
                        ))}

                    </Question>
                    <TextContainer>{question.commentary}</TextContainer>
                </QuestionContainer>
            ))}
                </Slider>
            </SliderContainer>
        </Form>
    );
};

export default ReportQuestionInfoComponent;
