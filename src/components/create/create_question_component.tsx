import React, { useState } from "react";
import { InputBoxWrapper, Input_text, QuestionContainer, SelectOption } from "../../styles/CreateQuestion";
import { NameGeneratorButton } from "../../styles/Public";




const QuestionComponent: React.FC<{ id: number, onToggle: (id: number) => void, onDelete: (id: number) => void, expand: boolean, answers: { text: string, selected: boolean }[], updateAnswer: (newAnswers: { text: string, selected: boolean }[]) => void , updateTime: (index: number, newTime: string) => void}> =
  ({ id, expand, onToggle, onDelete, answers, updateAnswer, updateTime }) => {
    
    const [questionType, setQuestionType] = useState<'objective' | 'subjective'>('objective');
    const [newTime, setTime] = useState('');

    const handleAnswerChange = (index: number, value: string) => {
      const newAnswers = answers.map((answer, idx) => 
        idx === index ? { ...answer, text: value } : answer
      );
      updateAnswer(newAnswers);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = e.target.value;
      setTime(newTime);
      updateTime(id, newTime);
    };

    const handleSelectionChange = (index: number) => {
      const newAnswers = answers.map((answer, idx) => 
        idx === index ? { ...answer, selected: !answer.selected } : answer
      );
      updateAnswer(newAnswers);
    };

    return (
      <QuestionContainer>
        <NameGeneratorButton onClick={() => onToggle(id)}>{expand ? `문제 접기` : `문제 펼치기`}</NameGeneratorButton>
        <NameGeneratorButton onClick={() => onDelete(id)}>문제 삭제하기</NameGeneratorButton>
        {expand && (
          <>
            <div>
              <InputBoxWrapper>
                <label>시간: </label>
                <Input_text type="text" value={newTime} onChange={handleTimeChange} />
              </InputBoxWrapper>
            </div>

            <div>
              <label>문제 유형:</label>
              <SelectOption value={questionType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuestionType(e.target.value as 'objective' | 'subjective')}>
                <option value="objective">객관식</option>
                <option value="subjective">주관식</option>
              </SelectOption>
            </div>

            <InputBoxWrapper>
              <label>문제: </label>
              <Input_text type="text" value={answers[0].text} onChange={(e) => handleAnswerChange(0, e.target.value)} />
            </InputBoxWrapper>

            {questionType === 'objective' ? (
              ['1번', '2번', '3번', '4번', '해설'].map((label, index) => (
                <InputBoxWrapper key={index}>
                  <label>{label}: </label>
                  <Input_text type="text" value={answers[index + 1].text} onChange={(e) => handleAnswerChange(index + 1, e.target.value)} />
                  {index < 4 && (
                    <NameGeneratorButton onClick={() => handleSelectionChange(index + 1)}>
                      {answers[index + 1].selected ? '선택됨' : '선택 안됨'}
                    </NameGeneratorButton>
                  )}
                </InputBoxWrapper>
              ))
            ) : (
              <>
                <InputBoxWrapper>
                  <label>답: </label>
                  <Input_text type="text" value={answers[1].text} onChange={(e) => handleAnswerChange(1, e.target.value)} />
                </InputBoxWrapper>
                <InputBoxWrapper>
                  <label>해설: </label>
                  <Input_text type="text" value={answers[2].text} onChange={(e) => handleAnswerChange(2, e.target.value)} />
                </InputBoxWrapper>
              </>
            )}
          </>
        )}
      </QuestionContainer>
    );
  };
export default QuestionComponent;
