import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import styled from "styled-components";
import Container from "../styles/publicStyleComponents/Container";
const ProblemPageForExtension = lazy(() => import("../components/quizSetCreate/creat_question_for_extension"));

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
    const [token, setToken] = useState('');

    useEffect(() => {
        
        function handleMessage(event: MessageEvent) {
            if (
                !event.origin || 
                !event.data ||
                typeof event.data.courseTitle !== 'string' ||
                typeof event.data.subCourseTitle !== 'string' ||
                typeof event.data.playTime !== 'string' ||
                typeof event.data.currentURL !== 'string' ||
                (event.data.iframeQuizzes && !Array.isArray(event.data.iframeQuizzes)) ||
                typeof event.data.authToken !== 'string'
            ) {
                return;
            }
        
            const { courseTitle, subCourseTitle, playTime, currentURL, iframeQuizzes, authToken } = event.data;
            setMainLectureTitle(courseTitle);
            setSubLectureTitle(subCourseTitle);
            setDuration(extractDuration(playTime));
            setSubLectureUrl(currentURL);
            setQuizzes(iframeQuizzes || []);
            setToken(authToken);
        }

        window.addEventListener('message', handleMessage);
    }, []);

    const extractDuration = (playTime: string): string => {
        if (playTime == null) {
            return '';
        } else {
            const parts = playTime.split('/');
            return parts[1]?.trim() || playTime;
        }
    };

    function exitbutton() {
        window.parent.postMessage(
            { functionName: 'exitModal' }
            , '*'
        );
    };

    return (
        <BackgroundAnimation>
            <ExitButton type="button" onClick={exitbutton}>X</ExitButton>
            <Container>
                <InnerContentSection>
                    <Main>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProblemPageForExtension
                                navigate={navigate}
                                courseTitle={mainLectureTitle}
                                subCourseTitle={subLectureTitle}
                                playTime={duration}
                                subLectureUrl={subLectureUrl}
                                iframeQuizzes={quizzes}
                                token={token}
                            />
                        </Suspense>
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

const ExitButton = styled.button`
  float: right;
  margin: 10px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #ACE1F4;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
  text-align: center;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;
