import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { PublicSliderContainer, PublicTextContainer, PublicQuestionContainer } from "../../styles/Public";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';

interface Choice {
    content: string;
    isAnswer: boolean;
}

interface quizzes {
    quizzes: Question_[];
}

interface Question_ {
    choices: Choice[];
    commentary: string;
    isCorrect: boolean;
    question: string;
    solvedDuration: number;
    userChoice: string;
}

const ReportQuestionReview = ({ quizzes }: quizzes) => {
    const [data, setData] = useState<Question_[]>();

    useEffect(() => {
        setData(quizzes);
    }, [quizzes]);

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
                                <div className="desc">
                                    <div>내가 제출한 답안 : {getSubmittedAnswerNumber(question)}</div>
                                    <div>정답 : {getCorrectAnswerNumber(question)}</div>
                                </div>
                                <hr />
                                <PublicTextContainer>{question.commentary}</PublicTextContainer>
                               
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
    font-size: xx-large;
    font-weight: bold; 
`;

const Question = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .quizPart {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }

    .quizAnswerPart {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }

    .title {
        font-size: x-large;
        background-color: aliceblue;
        padding: 10px 20px;
        width: 100px;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 10px;
    }

    .desc {
        font-size: large;
    }

    .questionName {
        font-size: x-large;
    }
`;

// 사용자가 제출한 답안의 번호를 가져오는 함수
const getSubmittedAnswerNumber = (question: Question_) => {
    const userAnswerIndex = question.choices.findIndex(choice => choice.content === question.userChoice);
    const userAnswerNumber = userAnswerIndex !== -1 ? userAnswerIndex + 1 : 0;
    return userAnswerNumber !== 0 ? userAnswerNumber + '번' : '없음';
};

// 정답의 번호를 가져오는 함수
const getCorrectAnswerNumber = (question: Question_) => {
    const correctAnswerIndex = question.choices.findIndex(choice => choice.isAnswer);
    return correctAnswerIndex !== -1 ? correctAnswerIndex + 1 + '번' : '없음';
};
