import React, { useState } from "react";
import Slider from "react-slick";
import { Form } from '../../styles/CreateQuestion';
import VideoThumbnail from "../public/url_to_image";
import { LeftArrow, Question, RightArrow, VideoThumbnailContainer } from '../../styles/QuestionInfo';
import { QuestionContainer } from "../../styles/QuestionInfo";
import { ListContainer, SliderContainer, TextContainer } from "../../styles/Public";
import { FaArrowAltCircleLeft,  FaArrowAltCircleRight,  FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// QuestionComponent의 props에 대한 타입 정의
interface QuestionComponentProps {
    videoUrl: string;
    questions: Question_[];
}

// 질문 객체에 대한 타입 정의
interface Question_ {
    time: string;
    question: string;
    options?: Option[]; // 선택적 속성
    answer?: string;
}

// 옵션 객체에 대한 타입 정의
interface Option {
    id: number;
    text: string;
}

// React component for displaying questions
const QuestionInfoComponent = ({ videoUrl, questions }: QuestionComponentProps) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNext = () => {
        const nextIndex = currentImageIndex === questions.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
    };

    const goToPrev = () => {
        const prevIndex = currentImageIndex === 0 ? questions.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
    };
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <Form>
            <SliderContainer>
            <VideoThumbnailContainer>
                <VideoThumbnail imageUrl={videoUrl} />
            </VideoThumbnailContainer>
                
            <Slider {...settings}> 
                {questions.map((question, index) => (
                    <QuestionContainer key={index}>
                        <Question>
                            <TextContainer>시간: {question.time}</TextContainer>
                            <TextContainer>문제: {question.question}</TextContainer>
                            {question.options && (
                                <ul>
                                    {question.options.map(option => (
                                        <ListContainer key={option.id}>{option.text}</ListContainer>
                                    ))}
                                </ul>
                            )}
                            {question.answer && <TextContainer>{question.answer}</TextContainer>}
                        </Question>
                    </QuestionContainer>
                ))} 
                
            </Slider> 
            {/* <LeftArrow onClick={goToPrev}><FaArrowAltCircleLeft /></LeftArrow>
            <RightArrow onClick={goToNext}><FaArrowAltCircleRight /></RightArrow> */}
            </SliderContainer>
        </Form>
    );
};

export default QuestionInfoComponent;
