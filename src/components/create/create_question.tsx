import React, { Component } from 'react';
import VideoThumbnail from '../public/url_to_image';
import { Formdiv, InputContainer, StyledText } from '../../styles/CreateQuestion';
import QuestionComponent from './create_question_component';
import { Input, NameGeneratorButton } from '../../styles/Public';
import { motion } from 'framer-motion';
import { NavigateFunction } from 'react-router-dom';
import { request } from '../../helpers/axios_helper';

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

  trimSubLectureUrl = (url:any) => {
    const ampersandPosition = url.indexOf('&tab');
    return ampersandPosition !== -1 ? url.substring(0, ampersandPosition) : url;
  };

  handleSubLectureUrlChange = (e:any) => {
    const trimmedUrl = this.trimSubLectureUrl(e.target.value);
    this.setState({ subLectureUrl: trimmedUrl });
  };
  
  addQuestionComponent = (): void => {
    this.setState(prevState => ({
      questionComponents: [...prevState.questionComponents, { id: prevState.questionComponents.length, expanded: false }],
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

  convertTimeToSeconds = (timeStr: string): number|void => {
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
        subLectureUrl,
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <StyledText>나만의 문제 만들기</StyledText>
          <InputContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Input type="text" placeholder="문제집명" maxLength={40} value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
              <Input type="text" placeholder="동영상 URL" maxLength={150} value={this.state.subLectureUrl} onChange={this.handleSubLectureUrlChange} />
              <Input type="text" placeholder="대강의명" maxLength={40} value={this.state.mainLectureTitle} onChange={(e) => this.setState({ mainLectureTitle: e.target.value })} />
              <Input type="text" placeholder="소강의명" maxLength={40} value={this.state.subLectureTitle} onChange={(e) => this.setState({ subLectureTitle: e.target.value })} />
              <Input type="text" placeholder="강의 시간 (예: 1:23:45 또는 45:30)" maxLength={8} value={this.state.duration} onChange={this.handleDurationChange} />
            </div>
            <VideoThumbnail imageUrl={this.state.subLectureUrl} />
          </InputContainer>
          </motion.div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <NameGeneratorButton type="button" onClick={this.addQuestionComponent}>문제 추가</NameGeneratorButton>
          <form onSubmit={this.postData}>
            <NameGeneratorButton type="submit">제출하기 버튼</NameGeneratorButton>
          </form>
          </motion.div>
        </Formdiv>
      </>
    );
  }
}

export default ProblemPage;