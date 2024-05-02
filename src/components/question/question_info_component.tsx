import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from '../../styles/QuestionInfo.module.css'; // CSS 모듈 경로 변경
import VideoThumbnail from "../public/url_to_image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Cookies } from "react-cookie";

// QuestionComponent의 props에 대한 타입 정의
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
        <div className={styles.form}>
            <div className={styles.sliderContainer}>
                <div className={styles.videoThumbnailContainer}>
                    <VideoThumbnail imageUrl={videoUrl} />
                </div>
                
                <Slider {...settings}> 
                    {data && data.map((question, index) => (
                        <div className={styles.questionContainer} key={index}>
                            <div className={styles.textContainer}>시간: {question.popupTime}</div>
                            <div className={styles.textContainer}>문제: {question.commentary}</div>
                            <div key={index}>
                                {question.choice.map((choice, choiceIndex) => (
                                    <div className={styles.textContainer} key={choiceIndex}>{choice.content}</div>
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
