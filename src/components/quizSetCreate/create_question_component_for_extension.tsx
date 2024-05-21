import React, { Component, ChangeEvent, createRef } from "react";
import { motion } from 'framer-motion';
import styled from "styled-components";

interface Answer {
  text: string;
  selected?: boolean;
}

interface Props {
  id: number;
  expand: boolean;
  answers: Answer[];
  questionTime: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  updateAnswer: (id: number, answers: Answer[]) => void;
  updateTime: (id: number, time: string) => void;
}

interface State {
  questionType: 'objective' | 'subjective';
  newTime: string;
  answers: Answer[];
  open: boolean;
  contentHeight: number;
}

class QuestionComponentForExtension extends Component<Props, State> {
  private contentRef = createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      questionType: 'objective',
      newTime: this.props.questionTime,
      answers: this.props.answers,
      open: this.props.expand,
      contentHeight: 0,
    };
  }

  handleAnswerChange = (index: number, value: string) => {
    this.setState(
      prevState => {
        const newAnswers = prevState.answers.map((answer, idx) =>
          idx === index ? { ...answer, text: value } : answer
        );
        return { answers: newAnswers };
      },
      () => {
        this.props.updateAnswer(this.props.id, this.state.answers);
      }
    );
  };

  handleSelectionChange = (index: number) => {
    this.setState(
      prevState => {
        const newAnswers = prevState.answers.map((answer, idx) =>
          idx === index ? { ...answer, selected: !answer.selected } : answer
        );
        return { answers: newAnswers };
      },
      () => {
        this.props.updateAnswer(this.props.id, this.state.answers);
      }
    );
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

    this.setState(
      {
        questionType: newType,
        answers: initialAnswers,
      },
      () => {
        this.props.updateAnswer(this.props.id, initialAnswers);
      }
    );
  };

  componentDidMount() {
    this.updateContentHeight();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.expand !== this.props.expand) {
      this.setState({ open: this.props.expand });
    }
    if (prevProps.answers !== this.props.answers) {
      this.setState({ answers: this.props.answers });
    }
    if (prevProps.questionTime !== this.props.questionTime) {
      this.setState({ newTime: this.props.questionTime });
    }
    if (prevProps.expand !== this.props.expand || prevProps.answers !== this.props.answers) {
      this.updateContentHeight();
    }
  }

  updateContentHeight = () => {
    if (this.contentRef.current) {
      const height = this.contentRef.current.offsetHeight;
      this.setState({ contentHeight: height });
    }
  };

  toggleExpand = () => {
    const { id, onToggle } = this.props;
    onToggle(id);
    setTimeout(() => {
      this.updateContentHeight();
    }, 100);
  };

  render() {
    const { id, expand, onDelete } = this.props;
    const { questionType, newTime, answers, open, contentHeight } = this.state;
    const finalHeight = open ? `${contentHeight}px` : '0px';

    return (
      <QuestionContainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ButtonContainer>
            <Button onClick={this.toggleExpand}>{expand ? `문제 접기` : `문제 펼치기`}</Button>
            <Button onClick={() => onDelete(id)}>문제 삭제하기</Button>
          </ButtonContainer>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: finalHeight }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={this.contentRef}>
              {expand && (
                <>
                  <Time_Input_text
                    type="text"
                    placeholder="시간 (예 : 01:23:45)"
                    value={newTime}
                    onChange={this.handleTimeChange}
                  />
                  <SelectOption value={questionType} onChange={this.handleTypeChange}>
                    <option value="objective">객관식</option>
                    <option value="subjective">주관식</option>
                  </SelectOption>
                  <Input_text
                    type="text"
                    placeholder="문제집명"
                    value={answers[0]?.text || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(0, e.target.value)}
                  />
                  {questionType === 'objective' ? (
                    ['1번', '2번', '3번', '4번', '해설'].map((label, index) => (
                      <div key={index}>
                        <Input_text
                          type="text"
                          placeholder={label}
                          value={answers[index + 1]?.text || ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(index + 1, e.target.value)}
                        />
                        {index < 4 && (
                          <OptionButton onClick={() => this.handleSelectionChange(index + 1)}>
                            {answers[index + 1]?.selected ? '정답' : '오답'}
                          </OptionButton>
                        )}
                      </div>
                    ))
                  ) : (
                    <>
                      <Input_text
                        type="text"
                        placeholder="답 : "
                        value={answers[1]?.text || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(1, e.target.value)}
                      />
                      <Input_text
                        type="text"
                        placeholder="해설 : "
                        value={answers[2]?.text || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(2, e.target.value)}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </QuestionContainer>
    );
  }
}

export default QuestionComponentForExtension;

const Time_Input_text = styled.input`
  width: 55%;
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 30px;
  outline: none;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 150px;
  height: 50px;
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

const OptionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-left: 30px;
  width: 80px;
  height: 50px;
  background-color: #ACE1F4;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 30px;
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
  margin-bottom: 40px;
`;

const QuestionContainer = styled.div`
  display: inline-block;
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
`;

const Input_text = styled.input`
  display: inline-block;
  flex: 1;
  width: 75%;
  padding: 10px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 30px;
  outline: none;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
  }
`;

const SelectOption = styled.select`
  padding: 8px 16px;
  margin-right: 8px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  color: #000;
  background-color: skyblue;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
