import React from "react";
import styled from 'styled-components';

// 스타일드 컴포넌트 정의
const CardContainer = styled.div`
  max-width: 20rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  width: 300px;
  height: 400px;
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const CardContent = styled.div`
  padding: 1.25rem;
  // display : flex;
  align-tems: flex-start;
`;

const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5;
  color: #374151;
`;

const CardDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #6b7280;
`;

const ReadMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  background-color: #3b82f6;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

// 컴포넌트 정의
interface WorkbookCardProps {
  imageUrl: string;
  title: string;
  description: string;
  readMoreUrl: string;
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({ imageUrl, title, description, readMoreUrl }) => {
  return (
    <CardContainer>
      <a href="#">
        <CardImage src={imageUrl} alt="" />
      </a>
      <CardContent>
        <a href="#">
          <CardTitle>{title}</CardTitle>
        </a>
        <CardDescription>{description}</CardDescription>
        <ReadMoreLink href={readMoreUrl}>
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default WorkbookCard;
