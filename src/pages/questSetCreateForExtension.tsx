import React, { useEffect, useRef, useState } from "react";
import ProblemPage from "../components/quizSetCreate/create_question";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import styled from "styled-components";
import Container from "../styles/publicStyleComponents/Container";
import { HOST, REPORT_PROCESSING_HOST } from "../helpers/axios_helper";
import ProblemPageForExtension from "../components/quizSetCreate/creat_question_for_extension";

export interface Quizzes {
    choices: choices[];
    commentary: string;
    instruction: string;
    popupTime: number;
    subLectureUrl: string;
}

interface choices {
    content: string;
    isAnswer: boolean;
}

const CreateForExtension: React.FC = () => {
    const navigate = useNavigate();
    const [mainLectureTitle, setMainLectureTitle] = useState('');
    const [subLectureTitle, setSubLectureTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [quizzes, setQuizzes] = useState<Quizzes[]>([]);
    const [subLectureUrl, setSubLectureUrl] = useState('');
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [token, setToken] = useState('');

    const courseDataRef = useRef({ courseTitle: '', subCourseTitle: '', playTime: '' });

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.origin == null) return;
            const { courseTitle, subCourseTitle, playTime, currentURL, iframeQuizzes,authToken } = event.data;
            setMainLectureTitle(courseTitle);
            setSubLectureTitle(subCourseTitle);
            setDuration(extractDuration(playTime));
            setSubLectureUrl(currentURL);
            setQuizzes(iframeQuizzes || []);
            setToken(authToken);
            courseDataRef.current = { courseTitle, subCourseTitle, playTime };
            setLoading(false);
        }

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        const iframe = document.getElementById('iframeContent') as HTMLIFrameElement;
        if (iframe) {
            iframe.onload = function () {
                const data = courseDataRef.current;
                iframe.contentWindow?.postMessage(data, HOST);
            };
        }
    }, []);

    const extractDuration = (playTime: string): string => {
        if (playTime == null) {
            return '';
        } else {
            const parts = playTime.split('/');
            return parts[1]?.trim() || playTime;
        }
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 페이지
    }

    return (
        <BackgroundAnimation>
            <Container>
                <InnerContentSection>
                    <Main>
                        <ProblemPageForExtension
                            navigate={navigate}
                            courseTitle={mainLectureTitle}
                            subCourseTitle={subLectureTitle}
                            playTime={duration}
                            subLectureUrl={subLectureUrl}
                            iframeQuizzes={quizzes}
                            token={token}
                        />
                    </Main>
                </InnerContentSection>
            </Container>
        </BackgroundAnimation>
    );
};

export default CreateForExtension;

const InnerContentSection = styled.div`
    display: flex;
    height: 85%;
`;

const Main = styled.div`
    width: 100%;
    overflow-y: auto;
    flex-wrap: wrap;
    display: flex;
    height: 85vh;
    justify-content: center;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
