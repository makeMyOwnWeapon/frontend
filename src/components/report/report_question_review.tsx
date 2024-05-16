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

    {/* 정답이랑 선택한답안 넣기, 복수정답일 경우도 생각하기*/}
    const [selectedNumber, setSelectedNumber] = useState('');
    const [answerNumber, setAnswerNumber] = useState([]);
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
                        {/* 정답이랑 선택한답안 넣기 */}
                        <div className="quizPart">
                            <div className="title">문제</div>
                            <div className="questionName">{question.question}</div>
                            <br />
                            {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            <PublicTextContainer key={choiceIndex}>{choiceIndex + 1}번 : {choice.content}</PublicTextContainer>
                            ))}
                        </div>

                        <div className="quizAnswerPart">
                            <div className="title">해설</div>
                            <div>내가 제출한 답안 : 1번</div>
                            <div>정답 : 1번</div>
                            <br />
                            <PublicTextContainer>{question.commentary}</PublicTextContainer>
                            <br />
                        
                            {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                            choice.isAnswer === true  ?
                            <PublicTextContainer key={choiceIndex}>{choiceIndex+1}번 : {choice.content}</PublicTextContainer>:
                            null

                      ))}

                        </div>
                       

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


const Question = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;

  flex-direction:column;

  .quizPart{
    border: 1px solid #ccc; /* 테두리 스타일 지정 */
    border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
    padding: 10px; /* 내부 여백 추가 */
    margin: 10px; /* 외부 패딩 추가 */
}

.quizAnswerPart{
    border: 1px solid #ccc; /* 테두리 스타일 지정 */
    border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
    padding: 10px; /* 내부 여백 추가 */
    margin: 10px; /* 외부 패딩 추가 */
}


.title{
font-size: large;
background-color: aliceblue;
padding: 10px 20px;
width: 75px;
text-align: center;
border-radius: 20px;
margin-bottom: 10px;


}


.questionName{





}

`;