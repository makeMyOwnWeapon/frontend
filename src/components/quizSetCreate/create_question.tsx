import React, { Component } from 'react';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';
import { NavigateFunction } from 'react-router-dom';
import { request } from '../../helpers/axios_helper';
import styled from 'styled-components';

interface Props {
  navigate: NavigateFunction;
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
}

class ProblemPage extends Component<Props, State> {
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
    };
  }

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
      answers: prevState.answers.filter((_, index) => index !== id)
    }));
  };

  handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ duration: e.target.value });
  };

  convertTimeToSeconds = (timeStr: string): number | void => {
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
      const response = await request('POST', '/api/quizsets', {
        title,
        subLectureUrl: trimmedSubLectureUrl,
        subLectureTitle,
        mainLectureTitle,
        duration: durationInSeconds,
        quizzes,
      });
  
      if (response.status >= 200 && response.status < 300) {
        this.props.navigate('/workbook');
      } else {
        alert(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  render() {
    return (
      <>
        <Formdiv>
          <StyledText>나만의 문제 만들기</StyledText>
          <InputContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Input type="text" placeholder="문제집명" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
              <Input type="text" placeholder="동영상 URL" value={this.state.subLectureUrl} onChange={this.handleSubLectureUrlChange} />
              <Input type="text" placeholder="대강의명" value={this.state.mainLectureTitle} onChange={(e) => this.setState({ mainLectureTitle: e.target.value })} />
              <Input type="text" placeholder="소강의명" value={this.state.subLectureTitle} onChange={(e) => this.setState({ subLectureTitle: e.target.value })} />
              <Input type="text" placeholder="강의 시간 (예: 1:23:45 또는 45:30)" maxLength={8} value={this.state.duration} onChange={this.handleDurationChange} />
            </div>
            <VideoThumbnail imageUrl={this.state.subLectureUrl} />
          </InputContainer>
          {this.state.questionComponents.map((component, index) => (
            <QuestionComponent
              key={component.id}
              id={component.id}
              expand={component.expanded}
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

export default ProblemPage;

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
  font-size: 1rem;
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
  font-size: 1rem;
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
  width: 60%;
  padding: 20px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  font-size: 1rem;
  color: black;
  margin-top: 70px;
  margin-bottom: 30px;
  text-align: left;
`;
