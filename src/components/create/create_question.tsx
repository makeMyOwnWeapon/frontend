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

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      questionComponents.forEach(component => {
        console.log(component.id);
      });
      // const response = await fetch('192.168.0.143:3000/api/member/registration', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     videoUrl: videoUrl,
      //     questionComponents: questionComponents,
      //   }),
      // });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // 서버 응답 처리
      // const responseData = await response.json();
      // console.log('서버 응답:', responseData);
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
            onToggle={toggleExpand}
            onDelete={deleteQuestion}
          />
        </div>
      ))}
      
      <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>
      
    </Form>
    <Form onSubmit={postData}>
        <NameGeneratorButton>제출하기 버튼</NameGeneratorButton>
    </Form>


    </>
  );
};

export default ProblemPage;