import React, { Component, ChangeEvent, createRef } from "react";
import { SelectOption } from "../../styles/CreateQuestion";
import { PublicButton} from "../../styles/Public";
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
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  updateAnswer: (id:number, answers: Answer[]) => void;
  updateTime: (id: number, time: string) => void;
}

interface State {
  questionType: 'objective' | 'subjective';
  newTime: string;
  answers: Answer[];
  open:boolean;
  contentHeight:number;
}

class QuestionComponent extends Component<Props, State> {
  private contentRef = createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      questionType: 'objective',
      newTime: '',
      answers: this.props.answers,
      open:this.props.expand,
      contentHeight:0,
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

  componentDidMount() {
    this.updateContentHeight();
    this.setState({ open: this.props.expand });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.expand !== this.props.expand) {
      this.setState({ open: this.props.expand });
    }
    if (prevProps.answers !== this.props.answers) {
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
    const { id, expand, onToggle, onDelete } = this.props;
    const { questionType, newTime, answers, open, contentHeight} = this.state;
    const finalHeight = open ? `${contentHeight}px` : '0px';

    return (
      <QuestionContainer>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <PublicButton onClick={() => this.toggleExpand()}>{expand ? `문제 접기` : `문제 펼치기`}</PublicButton>
          <PublicButton onClick={() => onDelete(id)}>문제 삭제하기</PublicButton>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: finalHeight }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={this.contentRef}>
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
                    <Input_text type="text" value={answers[0].text||''} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(0, e.target.value)} maxLength={40} />
                  </InputBoxWrapper>

                  {questionType === 'objective' ? (
                    ['1번', '2번', '3번', '4번', '해설'].map((label, index) => (
                      <InputBoxWrapper key={index}>
                        <label>{label}: </label>
                        <Input_text type="text" value={answers[index + 1].text||''} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(index + 1, e.target.value)} maxLength={40} />
                        {index < 4 && (
                          <PublicButton onClick={() => this.handleSelectionChange(index + 1)}>
                            {answers[index + 1].selected ? '정답입니다' : '오답입니다'}
                          </PublicButton>
                        )}
                      </InputBoxWrapper>
                    ))
                  ) : (
                    <>
                      <InputBoxWrapper>
                        <label>답: </label>
                        <Input_text type="text" value={answers[1].text} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(1, e.target.value)} maxLength={20} />
                      </InputBoxWrapper>
                      <InputBoxWrapper>
                        <label>해설: </label>
                        <Input_text type="text" value={answers[2].text} onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleAnswerChange(2, e.target.value)} maxLength={20} />
                      </InputBoxWrapper>
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

export default QuestionComponent;


const QuestionContainer = styled.div`
  width: 50%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  display:flex;
  justify-content: center; /* 세로 축 중앙 정렬 */
  align-items: center; 
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

export const InputBoxWrapper = styled.div`
  display: block;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const Input_text = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #0056b3;
  }
`;