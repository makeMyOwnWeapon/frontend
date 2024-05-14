import React, { useEffect, useState } from "react";
import { PublicCardContent, PublicCardTitle, PublicCardDescription } from "../../styles/Public";
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helper";
import { truncateTitle } from "../../pages/quizSet";
import { PublicCardContainer } from "../../styles/Public";
import styled from "styled-components";

interface WorkbookCardProps {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const QuizSetCard: React.FC<WorkbookCardProps> = ({
  memberNickname,
  quizSetTitle,
  quizSetId,
  recommendationCount,
  subLectureTitle,
  subLectureUrl
}) => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<number>(recommendationCount);

  useEffect(() => {
    setRecommendation(recommendationCount);
  }, [recommendationCount]);

  async function recommendationPost(numOfRecommendation: number, quizSetId: number): Promise<void> {
    try {
      const response = await request('POST', '/api/quizsets/recommendation', {
        numOfRecommendation,
        quizSetId,
      });
  
      if (response.status >= 200 && response.status < 300) {
        const responseData = await response.data;
        if (responseData !== undefined) {
          setRecommendation(responseData);
        } else {
          console.error('No updated count returned from the API');
        }
      } else {
        switch (response.status) {
          case 412:
            alert('Same title');
            break;
          default:
            alert('Network response was not ok');
            break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCardClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/question_info/${quizSetId}`,{state: {
      subLectureTitle, 
      quizSetTitle,   
      memberNickname   
    }
  });
  };
  

  const recommendationClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    recommendationPost(recommendation, quizSetId);
  };

  return (
    <PublicCardContainer onClick={handleCardClick}>
      <a className="cardImg" >
      <VideoThumbnail imageUrl={subLectureUrl} />
      </a>
      <PublicCardContent>
        <PublicCardTitle>{quizSetTitle}</PublicCardTitle>
        <PublicCardDescription>작성자: {memberNickname}</PublicCardDescription>
        <PublicCardDescription>강의명: {truncateTitle(subLectureTitle,9)}</PublicCardDescription>
        <ReadMoreLink onClick={recommendationClick}>
          <FaThumbsUp />
          {recommendation}
        </ReadMoreLink>
      </PublicCardContent>
    </PublicCardContainer>
  );
};

export default QuizSetCard;

const ReadMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #3b82f6;
  border-radius: 0.375rem;
  text-decoration: none;
  margin-top: 0.5rem;

  &:hover {
    background-color: #2563eb;
  }
`;