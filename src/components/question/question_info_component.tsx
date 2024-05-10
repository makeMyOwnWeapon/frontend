import React, { useEffect, useState } from "react";
import Slider from "react-slick";
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
    const [data, setData] = useState<Question_[] | undefined>(undefined);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET', `/api/quizsets/${quizSetId}/quizzes?commentary=true&answer=false`);
                setData(response.data);
                const deleteResponse = await request('GET', `/api/quizsets/${quizSetId}/can-delete`);
                setShowDeleteButton(deleteResponse.data);
                console.log(deleteResponse.data);
            } catch (error) {
                console.error('Error:', error);
                setShowDeleteButton(false);
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
                    {data ? data.map((question, index) => (
                        <QuestionContainer key={index}>
                            <TextContainer>시간: {question.popupTime}</TextContainer>
                            <TextContainer>문제: {question.commentary}</TextContainer>
                             <button style={{ position: 'absolute', top: 10, right: 10 }}>삭제하기</button>
                            <Question key={index}>
                                {question.choice ? question.choice.map((choice, choiceIndex) => (
                                    <TextContainer key={choiceIndex}>{choice.content}</TextContainer>
                                )) : null}
                            </Question>
                        </QuestionContainer>
                    )) : null}
                </Slider>
            </SliderContainer>
        </Form>
    );
};

export default QuestionInfoComponent;
