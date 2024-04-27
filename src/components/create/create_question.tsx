import React, { useState } from 'react';
import { Form, Input, InputContainer, StyledText } from '../../styles/CreateQuestion';
import { NameGeneratorButton } from '../../styles/SignupStyles';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';

const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<{ id: number, expanded: boolean}[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);

  const addQuestionComponent = () => {
    setQuestionComponents([...questionComponents, { id: questionComponents.length, expanded: false }]);
    setAnswers([...answers, ['', '', '', '', '']]);
  };

  const updateAnswers = (index: number, newAnswers: string[]) => {
    setAnswers(answers => {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = newAnswers;
      return updatedAnswers;
    });
  };

  const toggleExpand = (id: number) => {
    const newComponents = questionComponents.map(component => {
      if (component.id === id) {
        return { ...component, expanded: !component.expanded };
      }
      return component;
    });
    setQuestionComponents(newComponents);
  };

  const deleteQuestion = (id: number) => {
    const filteredComponents = questionComponents.filter(component => component.id !== id);
    setQuestionComponents(filteredComponents.map((component, index) => ({
      ...component,
      id: index,
      expanded: component.expanded
    })));
    setAnswers(answers.filter((_, index) => index !== id));
  };

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(answers);
      // API call can be made here
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <>
      <Form>
        <StyledText>나만의 문제 만들기</StyledText>
        <InputContainer>
          <Input type="text" placeholder="동영상 URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <VideoThumbnail imageUrl={videoUrl}/> 
        </InputContainer>
        {questionComponents.map((component, index) => (
          <div key={index}>
            <QuestionComponent
              id={component.id}
              expand={component.expanded}
              onToggle={toggleExpand}
              onDelete={deleteQuestion}
              answers={answers[index]}
              updateAnswer={(newAnswers) => updateAnswers(index, newAnswers)}
            />
          </div>
        ))}
        <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>
      </Form>
      <Form onSubmit={postData}>
        <NameGeneratorButton type="submit">제출하기 버튼</NameGeneratorButton>
      </Form>
    </>
  );
};

export default ProblemPage;
