import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Form, ButtonContainer, Button } from '../../styles/CreateQuestion';
import VideoThumbnail from "../public/url_to_image";
import { Question, VideoThumbnailContainer } from '../../styles/QuestionInfo';
import { QuestionContainer } from "../../styles/QuestionInfo";
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
    isAnswer: boolean;
}

interface Question_ {
    questionId: number;
    choice: Choice[];
    commentary: string;
    instruction: string;
    popupTime: string;
    owner: boolean;  // 본인 레포트인지 아닌지 여부
}

const QuestionInfoComponent = ({ videoUrl, quizSetId }: QuestionComponentProps) => {

    const [data, setData] = useState<Question_[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET', `/api/quizsets/${quizSetId}/quizzes?commentary=true&answer=true`);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
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
                        <TextContainer>시간: {question.popupTime}</TextContainer>
                        <TextContainer>문제: {question.instruction}</TextContainer>
                        <TextContainer>해설: {question.commentary}</TextContainer>
                        <Question key={index}>
                            {question.choice.map((choice, choiceIndex) => (
                                <TextContainer key={choiceIndex}>{choice.content} ({choice.isAnswer ? '정답' : '오답'})</TextContainer>
                            ))}
                        </Question>
                        {question.owner && (
                            <ButtonContainer>
                                <Button onClick={() => {/* 수정 로직 */}}>수정</Button>
                                <Button onClick={() => {/* 삭제 로직 */}}>삭제</Button>
                            </ButtonContainer>
                        )}
                    </QuestionContainer>
                ))}
                </Slider>
            </SliderContainer>
        </Form>
    );
};

export default QuestionInfoComponent;
