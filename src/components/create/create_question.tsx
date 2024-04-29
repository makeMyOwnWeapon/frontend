import React, { Component } from 'react';
import VideoThumbnail from '../public/url_to_image';
import { Formdiv, InputContainer, StyledText } from '../../styles/CreateQuestion';
import QuestionComponent from './create_question_component';
import { Input, NameGeneratorButton } from '../../styles/Public';

interface Answer {
  text: string;
  selected?: boolean;
}

interface QuestionComponentData {
  id: number;
  expanded: boolean;
}

interface State {
  videoUrl: string;
  title: string;
  questionComponents: QuestionComponentData[];
  answers: Answer[][];
  questionTimes: string[];
}

interface Props {}

class ProblemPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      videoUrl: '',
      title: '',
      questionComponents: [],
      answers: [],
      questionTimes: []
    };
  }

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
    const newComponents = this.state.questionComponents.map(component => ({
      ...component,
      expanded: component.id === id ? !component.expanded : component.expanded
    }));
    this.setState({ questionComponents: newComponents });
  };

  deleteQuestion = (id: number): void => {
    this.setState(prevState => ({
      questionComponents: prevState.questionComponents.filter(component => component.id !== id),
      answers: prevState.answers.filter((_, index) => index !== id)
    }));
  };

  postData = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const cookie = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)');
    const token = cookie ? cookie.pop() : '';

    

    try {
      const response = await fetch('http://192.168.0.143:3000/api/quizsets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: this.state.title,
          videoUrl: this.state.videoUrl,
          answers: this.state.answers,
          time: this.state.questionTimes,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Server Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <>
        <Formdiv>
          <StyledText>나만의 문제 만들기</StyledText>
          <InputContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Input type="text" placeholder="강의 제목" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
              <Input type="text" placeholder="동영상 URL" value={this.state.videoUrl} onChange={(e) => this.setState({ videoUrl: e.target.value })} />
            </div>
            <VideoThumbnail imageUrl={this.state.videoUrl} />
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
          <NameGeneratorButton type="button" onClick={this.addQuestionComponent}>문제 추가</NameGeneratorButton>
          <form onSubmit={this.postData}>
            <NameGeneratorButton type="submit">제출하기 버튼</NameGeneratorButton>
          </form>
        </Formdiv>
      </>
    );
  }
}

export default ProblemPage;
