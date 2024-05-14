import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { Form } from '../../styles/CreateQuestion';

import { PublicSliderContainer, PublicTextContainer, PublicQuestionContainer } from "../../styles/Public";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';
import { request } from "../../helpers/axios_helper";
import styled from "styled-components";

interface QuestionComponentProps {
    videoUrl: string;
    quizSetId: string | undefined;
}

interface Choice {
    choiceId: number;
    content: string;
}

interface Question_ {
    choice: Choice[];
    commentary: string;
    instruction: string;
    popupTime: string;
}

const QuizSetInfo = ({ videoUrl, quizSetId }: QuestionComponentProps) => {
    const location = useLocation();
    const { subLectureTitle, quizSetTitle, memberNickname } = location.state || {};
    const [data, setData] = useState<Question_[] | undefined>(undefined);
        
    useEffect(() => {
        const fetchData = async () => {
            const response = await request('GET', `/api/quizsets/${quizSetId}/quizzes`);
            setData(response.data);
            console.log(response.data);
        };
    
        fetchData();
    }, [quizSetId]);

    const settings = {
        dots: true,
        infinite: data && data.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Form>
            <PublicSliderContainer>
                <Slider className="custom-slider" {...settings}>
                    {data && data.map((question, index) => (
                        <PublicQuestionContainer key={index}>
                            <PublicTextContainer>문제집명: {quizSetTitle}</PublicTextContainer>
                            <PublicTextContainer>소강의명: {subLectureTitle}</PublicTextContainer>
                            <PublicTextContainer>작성자: {memberNickname}</PublicTextContainer>

                            <Question key={index}>
                                {question.choice && question.choice.map((choice, choiceIndex) => (
                                    <PublicTextContainer key={choiceIndex}>{choice.content}</PublicTextContainer>
                                ))}
                            </Question>
                        </PublicQuestionContainer>
                    ))}
                </Slider>
            </PublicSliderContainer>
        </Form>
    );
};

export default QuizSetInfo;


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
`;