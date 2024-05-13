import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { Form } from '../../styles/CreateQuestion';
import VideoThumbnail from "../public/url_to_image";
import { Question, VideoThumbnailContainer, QuestionContainer } from '../../styles/QuestionInfo';
import { SliderContainer, TextContainer } from "../../styles/Public";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/fad.css';
import { request } from "../../helpers/axios_helper";

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

const QuestionInfoComponent = ({ videoUrl, quizSetId }: QuestionComponentProps) => {
    const location = useLocation();
    const { subLectureTitle, quizSetTitle, memberNickname } = location.state || {}; // 데이터 추출

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
            <SliderContainer>
                <VideoThumbnailContainer>
                    <VideoThumbnail imageUrl={videoUrl} />
                </VideoThumbnailContainer>
                <Slider className="custom-slider" {...settings}>
                    {data && data.map((question, index) => (
                        <QuestionContainer key={index}>
                            <TextContainer>문제집명: {quizSetTitle}</TextContainer>
                            <TextContainer>소강의명: {subLectureTitle}</TextContainer>
                            <TextContainer>작성자: {memberNickname}</TextContainer>

                            <Question key={index}>
                                {question.choice && question.choice.map((choice, choiceIndex) => (
                                    <TextContainer key={choiceIndex}>{choice.content}</TextContainer>
                                ))}
                            </Question>
                        </QuestionContainer>
                    ))}
                </Slider>
            </SliderContainer>
        </Form>
    );
};

export default QuestionInfoComponent;
