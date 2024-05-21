import React, { Component } from 'react';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';
import { NavigateFunction } from 'react-router-dom';
import { REPORT_PROCESSING_HOST, bodyRequest, headerInputRequest, request } from '../../helpers/axios_helper';
import styled from 'styled-components';
import { Quizzes } from '../../pages/questSetCreateForExtension';
import QuestionComponentForExtension from './create_question_component_for_extension';

interface Props {
    navigate: NavigateFunction;
    courseTitle: string;
    subCourseTitle: string;
    playTime: string;
    iframeQuizzes: Quizzes[];
    subLectureUrl: string;
    token: string;
}

interface Answer {
    text: string;
    selected?: boolean;
}

interface QuestionComponentData {
    id: number;
    expanded: boolean;
}

interface State {
    subLectureUrl: string;
    title: string;
    questionComponents: QuestionComponentData[];
    answers: Answer[][];
    questionTimes: string[];
    subLectureTitle: string;
    mainLectureTitle: string;
    duration: string;
    showResetButton: boolean; // 추가된 상태
}

class ProblemPageForExtension extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            subLectureUrl: '',
            title: '',
            questionComponents: [],
            answers: [],
            questionTimes: [],
            subLectureTitle: '',
            mainLectureTitle: '',
            duration: '',
            showResetButton: true, // 초기값 설정
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (
            prevProps.courseTitle !== this.props.courseTitle ||
            prevProps.subCourseTitle !== this.props.subCourseTitle ||
            prevProps.playTime !== this.props.playTime ||
            prevProps.iframeQuizzes.length !== this.props.iframeQuizzes.length ||
            prevProps.subLectureUrl !== this.props.subLectureUrl
        ) {
            const formattedDuration = this.formatDuration(this.props.playTime);
            this.setState({
                subLectureUrl: this.props.subLectureUrl,
                mainLectureTitle: this.props.courseTitle,
                subLectureTitle: this.props.subCourseTitle,
                duration: formattedDuration,
            }, () => {
                const { iframeQuizzes } = this.props;
                const { questionComponents } = this.state;
            
                for (let i = questionComponents.length; i < iframeQuizzes.length; i++) {
                    const nextQuiz = iframeQuizzes[i];
            
                    const answers: Answer[] = [
                        { text: nextQuiz.instruction },
                        ...nextQuiz.choices.map(choice => ({ text: choice.content, selected: choice.isAnswer })),
                        { text: nextQuiz.commentary },
                    ];
            
                    this.setState(prevState => ({
                        questionComponents: [...prevState.questionComponents, { id: prevState.questionComponents.length, expanded: true }],
                        answers: [...prevState.answers, answers],
                        questionTimes: [...prevState.questionTimes, this.convertSecondsToTime(nextQuiz.popupTime)],
                    }));
                }
            });
        }
    }
    
    
    formatDuration = (timeStr: string): string => {
        // ss 형식일 경우 00:00:ss로 변경
        if (/^[0-5]?\d$/.test(timeStr)) {
            return `00:00:${timeStr.padStart(2, '0')}`;
        }
        
        // mm:ss 형식일 경우 00:mm:ss로 변경
        if (/^[0-5]?\d:[0-5]\d$/.test(timeStr)) {
            return `00:${timeStr.padStart(5, '0')}`;
        }
        
        // hh:mm:ss 형식일 경우 그대로 반환
        if (/^(?:[0-1]?\d|2[0-3]):[0-5]?\d:[0-5]?\d$/.test(timeStr)) {
            return timeStr.split(':').map(unit => unit.padStart(2, '0')).join(':');
        }
            return '00:00:00';
    };
    

    trimSubLectureUrl = (url: string): string => {
        const urlObj = new URL(url);
        const courseSlug = urlObj.searchParams.get('courseSlug');
        const unitId = urlObj.searchParams.get('unitId');

        if (courseSlug && unitId) {
            return `https://www.inflearn.com/course/lecture?courseSlug=${encodeURIComponent(courseSlug)}&unitId=${encodeURIComponent(unitId)}`;
        }
        return url;
    };

    handleSubLectureUrlChange = (e: any) => {
        const url = e.target.value;
        this.setState({ subLectureUrl: url });
    };

    addQuestionComponent = (): void => {
        this.setState(prevState => ({
            questionComponents: [...prevState.questionComponents, { id: prevState.questionComponents.length, expanded: true }],
            answers: [...prevState.answers, Array(6).fill({ text: '', selected: false })],
            questionTimes: [...prevState.questionTimes, '']
        }));
    };

    addAIQuestionComponent = (): void => {
        const { iframeQuizzes } = this.props;
        const { questionComponents } = this.state;
    
        for (let i = questionComponents.length; i < iframeQuizzes.length; i++) {
            const nextQuiz = iframeQuizzes[i];
    
            const answers: Answer[] = [
                { text: nextQuiz.instruction },
                ...nextQuiz.choices.map(choice => ({ text: choice.content, selected: choice.isAnswer })),
                { text: nextQuiz.commentary },
            ];
    
            this.setState(prevState => ({
                questionComponents: [...prevState.questionComponents, { id: prevState.questionComponents.length, expanded: true }],
                answers: [...prevState.answers, answers],
                questionTimes: [...prevState.questionTimes, this.convertSecondsToTime(nextQuiz.popupTime)],
            }));
        }
    };
    

    updateQuestionTime = (index: number, timeExchange: string): void => {
        const updatedTimes = [...this.state.questionTimes];
        updatedTimes[index] = timeExchange;
        this.setState({ questionTimes: updatedTimes });
    };

    updateAnswers = (index: number, newAnswers: Answer[]): void => {
        const updatedAnswers = [...this.state.answers];
        updatedAnswers[index] = newAnswers;
        this.setState({ answers: updatedAnswers });
    };

    toggleExpand = (id: number): void => {
        this.setState(prevState => ({
            questionComponents: prevState.questionComponents.map(component => ({
                ...component,
                expanded: component.id === id ? !component.expanded : component.expanded
            }))
        }));
    };

    deleteQuestion = (id: number): void => {
        this.setState(prevState => ({
            questionComponents: prevState.questionComponents.filter(component => component.id !== id),
            answers: prevState.answers.filter((_, index) => index !== id),
            questionTimes: prevState.questionTimes.filter((_, index) => index !== id),
        }));
    };

    handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ duration: e.target.value });
    };

    convertTimeToSeconds = (timeStr: string): number | void => {
        if (!timeStr) {
            alert('시간을 입력해 주세요.');
            return;
        }

        const timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

        if (!timeRegex.test(timeStr)) {
            alert('올바른 시간 형식이 아닙니다. hh:mm:ss 로 바꿔주세요.');
            return;
        }

        const parts = timeStr.split(':').reverse();
        let seconds = parseInt(parts[0] || '0', 10);
        let minutes = parseInt(parts[1] || '0', 10);
        let hours = parseInt(parts[2] || '0', 10);
        return hours * 3600 + minutes * 60 + seconds;
    };

    convertSecondsToTime = (seconds: number): string => {
        if (isNaN(seconds) || seconds < 0) {
            return '00:00:00';
        }
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    postData = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const { title, subLectureUrl, mainLectureTitle, subLectureTitle, duration } = this.state;
        if (!title || !subLectureUrl || !mainLectureTitle || !subLectureTitle || !duration) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        const trimmedSubLectureUrl = this.trimSubLectureUrl(subLectureUrl);
        const durationInSeconds = this.convertTimeToSeconds(duration);
        if (durationInSeconds === undefined) {
            return;
        }

        const quizzes = this.state.answers.map((answerSet, index) => {
            const time = this.state.questionTimes[index];
            if (!time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)) {
                alert('시간 형식이 잘못되었습니다. "hh:mm:ss" 형식으로 입력해 주세요.');
                return;
            }

            if (answerSet.some(answer => answer.text === '')) {
                alert('빈 값이 포함되어 있습니다.');
                return;
            }

            return {
                instruction: answerSet[0].text,
                commentary: answerSet[answerSet.length - 1].text,
                popupTime: time,
                choices: answerSet.slice(1, answerSet.length - 1).map((answer, idx) => ({
                    content: answer.text,
                    isAnswer: answer.selected
                }))
            };
        }).filter(quiz => quiz !== undefined);

        try {
            const response = await headerInputRequest('POST', '/api/quizsets', {
                title,
                subLectureUrl: trimmedSubLectureUrl,
                subLectureTitle,
                mainLectureTitle,
                duration: durationInSeconds,
                quizzes,
            }, this.props.token);

            if (response.status >= 200 && response.status < 300) {
                window.parent.postMessage(
                    { functionName: 'closeModal' }
                    , '*'
                );
            } else {
                alert(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    };

    resetInputs = (): void => {
        this.setState({
            questionComponents: [],
            answers: [],
            questionTimes: [],
        });
    };

    toggleFunction = (): void => {
        if (this.state.showResetButton) {
            this.resetInputs();
        } else {
            this.addAIQuestionComponent();
        }
        this.setState(prevState => ({
            showResetButton: !prevState.showResetButton, // 상태를 토글하여 버튼을 전환
        }));
    };

    render() {
        return (
            <>
                <Formdiv>
                    <StyledText>나만의 문제 만들기!</StyledText>
                    <InputContainer>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Input type="text" placeholder="문제집명을 입력해 주세요!" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                            <Input type="text" placeholder="동영상 URL" value={this.state.subLectureUrl} onChange={this.handleSubLectureUrlChange} />
                            <Input type="text" placeholder="대강의명" value={this.state.mainLectureTitle} onChange={(e) => this.setState({ mainLectureTitle: e.target.value })} />
                            <Input type="text" placeholder="소강의명" value={this.state.subLectureTitle} onChange={(e) => this.setState({ subLectureTitle: e.target.value })} />
                            <Input type="text" placeholder="강의 시간 (예: 1:23:45 또는 45:30)" maxLength={8} value={this.state.duration} onChange={this.handleDurationChange} />
                        </div>
                        <div>
                            <VideoThumbnail imageUrl={this.state.subLectureUrl} />
                        </div>
                    </InputContainer>
                    <ButtonContainer>
                        <Button type="button" onClick={this.toggleFunction}>
                            {this.state.showResetButton ? 'AI 문제 ON!' : 'AI 문제 OFF!'}
                        </Button>
                    </ButtonContainer>
                    {this.state.questionComponents.map((component, index) => (
                        <QuestionComponentForExtension
                            key={component.id}
                            id={component.id}
                            expand={component.expanded}
                            questionTime={this.state.questionTimes[index]}
                            onToggle={this.toggleExpand}
                            onDelete={this.deleteQuestion}
                            answers={this.state.answers[index]}
                            updateAnswer={(index, newAnswers) => this.updateAnswers(index, newAnswers)}
                            updateTime={(index, timeExchange) => this.updateQuestionTime(index, timeExchange)}
                        />
                    ))}
                    <ButtonContainer>
                        <Button type="button" onClick={this.addQuestionComponent}>문제 추가</Button>
                        <form onSubmit={this.postData}>
                            <Button type="submit">제출하기 버튼</Button>
                        </form>
                    </ButtonContainer>
                </Formdiv>
            </>
        );
    }
}

export default ProblemPageForExtension;

const Button = styled.button`
  margin: 10px;
  width: 150px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin: 5px;
  margin-right: 20px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  outline: none;
  font-size: 30px;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
  }
`;

const Formdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 100vh;
  margin: auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  font-size: 84px;
  color: black;
  margin-top: 0px;
  margin-bottom: 30px;
  text-align: left;
`;
