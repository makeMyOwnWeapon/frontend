import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import VideoThumbnail from "../public/url_to_image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Cookies } from "react-cookie";

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
    const cookies = new Cookies();
    const token = cookies.get('jwt');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/api/quizsets/${quizSetId}/quizzes?commentary=${true}&answer=${false}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
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
        slidesToScroll: 1,
    };

    return (
        <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}> {/* Form style */}
            <div style={{ margin: '0 auto', width: '80%' }}> {/* SliderContainer style */}
                <div style={{ marginBottom: '20px' }}> {/* VideoThumbnailContainer style */}
                    <VideoThumbnail imageUrl={videoUrl} />
                </div>
                
                <Slider {...settings}>
                    {data && data.map((question, index) => (
                        <div key={index} style={{ padding: '10px' }}> {/* QuestionContainer style */}
                            <div style={{ marginBottom: '10px' }}>시간: {question.popupTime}</div>
                            <div style={{ marginBottom: '10px' }}>문제: {question.commentary}</div>
                            <div key={index}>
                                {question.choice.map((choice, choiceIndex) => (
                                    <div key={choiceIndex} style={{ padding: '5px' }}>{choice.content}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default QuestionInfoComponent;
