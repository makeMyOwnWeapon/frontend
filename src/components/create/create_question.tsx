import React, { useState } from 'react';
import { Form, Input, InputContainer, StyledText } from '../../styles/CreateQuestion';
import { NameGeneratorButton } from '../../styles/SignupStyles';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';

const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<{ id: number, expanded: boolean, answers: string[] }[]>([]);

  const toggleExpand = (id: number) => {
    const updatedComponents = questionComponents.map(component =>
      component.id === id ? { ...component, expanded: !component.expanded } : component
    );
    setQuestionComponents(updatedComponents);
  };
  
  const handleUpdateQuestion = (id: number, newAnswers: string[]) => {
    const updatedComponents = questionComponents.map(component =>
      component.id === id ? { ...component, answers: newAnswers } : component
    );
    setQuestionComponents(updatedComponents);
  };

  const deleteQuestion = (id: number) => {
    const updatedComponents = questionComponents.filter(component => component.id !== id);
    setQuestionComponents(updatedComponents);
  };

  const addQuestionComponent = () => {
    const newComponent = {
      id: Date.now(),
      expanded: false,
      answers: []
    };
    setQuestionComponents([...questionComponents, newComponent]);
  };

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      questionComponents.forEach(component => {
        console.log(`ID: ${component.id}, Answers: ${component.answers}`);
      });

      const response = await fetch('http://192.168.0.143:3000/api/member/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: videoUrl,
          questionComponents: questionComponents,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('서버 응답:', responseData);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
  
  return (
    <>
      <Form>
        <StyledText>
          나만의 문제 만들기
        </StyledText>
        <InputContainer>
          <Input type="text" placeholder="동영상 URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <VideoThumbnail imageUrl={videoUrl}/> 
        </InputContainer>
        {questionComponents.map((component, index) => (
          <div key={index}>
            <QuestionComponent
              id={component.id}
              expand={component.expanded}
              onToggle={() => toggleExpand(component.id)}
              onDelete={() => deleteQuestion(component.id)}
              onUpdate={(id, newAnswers) => handleUpdateQuestion(id, newAnswers)}
            />
          </div>
        ))}
        <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>
      </Form>
      <Form onSubmit={postData}>
          <NameGeneratorButton type="submit">제출하기</NameGeneratorButton>
      </Form>
    </>
  );
};

export default ProblemPage;
