import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { PublicQuestionContainer } from "../../styles/publicStyleComponents/Public";
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
        slidesToScroll: 1,
    };

    return (
        <div>
            <ReportQuestionTitle>문제 다시보기</ReportQuestionTitle>
            <CustomSlider className="custom-slider" {...settings}>
                {data && data.map((question, index) => (
                    <PublicQuestionContainer key={index}>
                        <Question key={index}>
                            <div className="quizPart">
                                <div className="title">문제</div>
                                <div className="questionName">{question.question}</div>
                                <br />
                                {question && question.choices.length > 1 && question.choices.map((choice, choiceIndex) => (
                                    <TextContainer key={choiceIndex}>{choiceIndex + 1}번 : {choice.content}</TextContainer>
                                ))}
                            </div>
                            <div className="quizAnswerPart">
                                <div className="title">해설</div>
                                <div className="desc">
                                    <div>내가 제출한 답안 : {getSubmittedAnswerNumber(question)}</div>
                                    <div>정답 : {getCorrectAnswerNumber(question)}</div>
                                </div>
                                <BlueHr />
                                <TextContainer>{question.commentary}</TextContainer>
                            </div>
                        </Question>
                    </PublicQuestionContainer>
                ))}
            </CustomSlider>
        </div>
    );
};

export default ReportQuestionReview;

const getSubmittedAnswerNumber = (question: Question_) => {
    const userAnswerIndex = question.choices.findIndex(choice => choice.content === question.userChoice);
    const userAnswerNumber = userAnswerIndex !== -1 ? userAnswerIndex + 1 : 0;
    return userAnswerNumber !== 0 ? userAnswerNumber + '번' : '없음';
};

const getCorrectAnswerNumber = (question: Question_) => {
    const correctAnswerIndex = question.choices.findIndex(choice => choice.isAnswer);
    return correctAnswerIndex !== -1 ? correctAnswerIndex + 1 + '번' : '없음';
};

const ReportQuestionTitle = styled.div`
  margin-left: 10px;
  font-size: 2rem;
`;

const TextContainer = styled.div`
  font-size: 1.5rem;
`;

const CustomSlider = styled(Slider)`
  .slick-dots {
    position: relative;
    top: 10px;
  }
`;

const Question = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .quizPart {
        border: 2px solid #0076B8;
        padding: 20px;
        padding-left: 30px;
        margin-top: 22px;
        margin-bottom: 22px;
        border-radius: 20px;
        font-size: 1.5rem;
    }

    .quizAnswerPart {
        border: 2px solid #0076B8;
        border-radius: 20px;
        padding: 20px;
        padding-left: 30px;
        margin-top: 22px;
        margin-bottom: 22px;
        font-size: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
        border: 3px solid #3fb9ff;
        padding: 10px 4px;
        width: 100px;
        margin-left: -10px;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 22px;
    }

    .desc {
    }

    .questionName {
    }
`;

const BlueHr = styled.hr`
    border: 0;
    height: 1px;
    background: #0076B8;
    margin-top: 22px;
    margin-bottom: 22px;
`;
