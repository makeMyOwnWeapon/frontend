import React, { Component, ChangeEvent } from "react";
import { InputBoxWrapper, Input_text, QuestionContainer, SelectOption } from "../../styles/CreateQuestion";
import { NameGeneratorButton } from "../../styles/Public";

interface Answer {
  text: string;
  selected?: boolean;
}

interface Props {
  id: number;
  expand: boolean;
  answers: Answer[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  updateAnswer: (id:number, answers: Answer[]) => void;
  updateTime: (id: number, time: string) => void;
}

interface State {
  questionType: 'objective' | 'subjective';
  newTime: string;
  answers: Answer[];
}

class QuestionComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      questionType: 'objective',
      newTime: '',
      answers: this.props.answers
    };
  }

  handleAnswerChange = (index: number, value: string) => {
    this.setState(prevState => {
      const newAnswers = prevState.answers.map((answer, idx) =>
        idx === index ? { ...answer, text: value } : answer
      );
      return { answers: newAnswers };
    }, () => {
      this.props.updateAnswer(this.props.id, this.state.answers);
    });
  };
  
  handleSelectionChange = (index: number) => {
    this.setState(prevState => {
      const newAnswers = prevState.answers.map((answer, idx) =>
        idx === index ? { ...answer, selected: !answer.selected } : answer
      );
      return { answers: newAnswers };
    }, () => {
      this.props.updateAnswer(this.props.id, this.state.answers);
    });
  };

  handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    this.setState({ newTime });
    this.props.updateTime(this.props.id, newTime);
  };

  handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'objective' | 'subjective';
    const initialAnswers = newType === 'objective' ? 
    [{ text: '' }, { text: '', selected: false }, { text: '' , selected: false }, { text: '', selected: false }, { text: '', selected: false }, { text: '' }] :
      [{ text: '' }, { text: '', selected: true }, { text: '' }];

    this.setState({
      questionType: newType,
      answers: initialAnswers
    }, () => {
      this.props.updateAnswer(this.props.id, initialAnswers);
    });
  };




  render() {
    const { id, expand, onToggle, onDelete } = this.props;
    const { questionType, newTime, answers } = this.state;

    return (
      <QuestionContainer>
        <NameGeneratorButton onClick={() => onToggle(id)}>{expand ? `문제 접기` : `문제 펼치기`}</NameGeneratorButton>
        <NameGeneratorButton onClick={() => onDelete(id)}>문제 삭제하기</NameGeneratorButton>
        {expand && (
          <>
            <div>
              <InputBoxWrapper>
                <label>시간: </label>
                <Input_text type="timeInput" placeholder="예: 01:23:45" value={newTime} onChange={this.handleTimeChange} />
              </InputBoxWrapper>
            </div>

            <div>
              <label>문제 유형:</label>
              <SelectOption value={questionType} onChange={this.handleTypeChange}>
                <option value="objective">객관식</option>
                <option value="subjective">주관식</option>
              </SelectOption>
            </div>

            <InputBoxWrapper>
              <label>문제: </label>
              <Input_text type="text" value={answers[0].text||''} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(0, e.target.value)} />
            </InputBoxWrapper>

            {questionType === 'objective' ? (
              ['1번', '2번', '3번', '4번', '해설'].map((label, index) => (
                <InputBoxWrapper key={index}>
                  <label>{label}: </label>
                  <Input_text type="text" value={answers[index + 1].text||''} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(index + 1, e.target.value)} />
                  {index < 4 && (
                    <NameGeneratorButton onClick={() => this.handleSelectionChange(index + 1)}>
                      {answers[index + 1].selected ? '선택됨' : '선택 안됨'}
                    </NameGeneratorButton>
                  )}
                </InputBoxWrapper>
              ))
            ) : (
              <>
                <InputBoxWrapper>
                  <label>답: </label>
                  <Input_text type="text" value={answers[1].text} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(1, e.target.value)} />
                </InputBoxWrapper>
                <InputBoxWrapper>
                  <label>해설: </label>
                  <Input_text type="text" value={answers[2].text} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(2, e.target.value)} />
                </InputBoxWrapper>
              </>
            )}
          </>
        )}
     

      </QuestionContainer>
    );
  }
}

export default QuestionComponent;