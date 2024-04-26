import React, { useState } from 'react';
import { Form, Input, InputContainer, StyledText } from '../../styles/CreateQuestion'
import { NameGeneratorButton } from '../../styles/SignupStyles';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';


const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<{ id: number, expanded: boolean }[]>([]);

  const addQuestionComponent = () => {
    setQuestionComponents([...questionComponents, { id: questionComponents.length, expanded: false }]);
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
    const reindexedComponents = filteredComponents.map((component, index) => ({
      ...component,
      id: index
    }));
    setQuestionComponents(reindexedComponents);
  };

  return (

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
            onToggle={toggleExpand}
            onDelete={deleteQuestion}
          />
        </div>
      ))}
      
      <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>

    </Form>

  );
};

export default ProblemPage;