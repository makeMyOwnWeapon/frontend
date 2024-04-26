import React, { useState } from "react";
import { InputBoxWrapper, Input_text, QuestionContainer } from "../../styles/CreateQuestion";

const QuestionComponent: React.FC<{ id: number, onToggle: (id: number) => void, onDelete: (id: number) => void, expand: boolean }> = ({ id, expand, onToggle, onDelete }) => {
    
    const [time, setTime] = useState<string>('');
    const [questionType, setQuestionType] = useState<'objective' | 'subjective'>('objective');
    const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']); // 4개의 답변과 1개의 문제 설명을 위한 배열
  
    const handleAnswerChange = (index: number, value: string) => {
      const newAnswers = answers.slice();
      newAnswers[index] = value;
      setAnswers(newAnswers);
    };
  
    return (

      <QuestionContainer>
        <button onClick={() => onToggle(id)} type="button" style={{ marginBottom: '10px' }}>
          {expand ? `${id + 1}번 문제 접기` : `${id + 1}번 문제 펼치기`}
        </button>
        <button onClick={() => onDelete(id)} type="button" style={{ marginBottom: '10px' }}>
          {id + 1}번 문제 삭제하기
        </button>
        {expand && (
          <>

            <div>
              <InputBoxWrapper>
                <label>시간: </label>
                <Input_text type="text" value={time} onChange={(e) => setTime(e.target.value)} />
              </InputBoxWrapper>
            </div>

            <div>
              <label>문제 유형:</label>
              <select value={questionType} onChange={(e) => setQuestionType(e.target.value as 'objective' | 'subjective')}>
                <option value="objective">객관식</option>
                <option value="subjective">주관식</option>
              </select>
            </div>

            <InputBoxWrapper>
              <label>{questionType === 'objective' ? '문제: ' : '문제 설명: '}</label>
              <Input_text type="text" value={answers[0]} onChange={(e) => handleAnswerChange(0, e.target.value)} />
            </InputBoxWrapper>


            {questionType === 'objective' ? (
              ['1번', '2번', '3번', '4번'].map((label, index) => (
                <InputBoxWrapper key={index + 1}>
                  <label>{label}: </label>
                  <Input_text type="text" value={answers[index + 1]} onChange={(e) => handleAnswerChange(index + 1, e.target.value)} />
                </InputBoxWrapper>
              ))
            ) : (
              <InputBoxWrapper>
                <label>답: </label>
                <Input_text type="text" value={answers[1]} onChange={(e) => handleAnswerChange(1, e.target.value)} />
              </InputBoxWrapper>
            )}


          </>
        )}
      </QuestionContainer>
    );
  };
  export default QuestionComponent;