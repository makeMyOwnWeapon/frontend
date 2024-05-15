import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Form } from '../../styles/CreateQuestion';
import { PublicSliderContainer, PublicTextContainer, PublicQuestionContainer } from "../../styles/Public";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';


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
        <div>
                <ReportQuestionTitle>문제 다시보기</ReportQuestionTitle>
                <Slider className="custom-slider" {...settings}> 
                {data && data.map((question, index) => (
                <PublicQuestionContainer key={index}>

                    <Question key={index}>
                         <div className="questionName">{index+1}번 문제: {question.question}</div>
                        {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            <PublicTextContainer key={choiceIndex}>{choiceIndex + 1}번 : {choice.content}</PublicTextContainer>
                        ))}
                        
                        {/* {question && question.choices.length === 1 && question.choices.map((choice, choiceIndex) => (
                            <PublicTextContainer key={choiceIndex}>제출한 답 : {choice.content}</PublicTextContainer>
                        ))} */}

                        <AnswerContainer> 

                        <h3>해설</h3>
                        <PublicTextContainer>{question.commentary}</PublicTextContainer>
                        
                        <h3>정답</h3>
                          {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            choice.isAnswer === true  ?
                            <PublicTextContainer key={choiceIndex}>{choiceIndex+1}번 : {choice.content}</PublicTextContainer>:
                            null

                        ))}

                        </AnswerContainer>  
                    </Question>
                </PublicQuestionContainer>
            ))}
                </Slider>
        </div>
    );
};

export default ReportQuestionReview;

const ReportQuestionTitle = styled.div`
    font-size: x-large;
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

const Question = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc; /* 테두리 스타일 지정 */
  border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
  padding: 10px; /* 내부 여백 추가 */
  margin: 10px; /* 외부 패딩 추가 */
  flex-direction:column;
  min-height: 400px;


.questionName{
    /* background-color: white; */
    opacity: 1;

}

`;