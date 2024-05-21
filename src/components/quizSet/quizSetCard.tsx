import React, { useEffect, useState } from "react";
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helper";
import { truncateTitle } from "../../pages/quizSet";
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
    navigate(`/question_info/${quizSetId}`, { state: { subLectureTitle, quizSetTitle, memberNickname } });
  };

  const recommendationClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    recommendationPost(recommendation, quizSetId);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ThumbnailContainer>
        <VideoThumbnail imageUrl={subLectureUrl} />
      </ThumbnailContainer>
      <CardTitle>{quizSetTitle}</CardTitle>
      <CardDescription>작성자: {memberNickname}</CardDescription>
      <CardDescription>강의명: {truncateTitle(subLectureTitle, 7)}</CardDescription>
      <ReadMoreLink onClick={recommendationClick}>
        <FaThumbsUp />
        {recommendation}
      </ReadMoreLink>
    </CardContainer>
  );
};

export default QuizSetCard;

const ReadMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #3b82f6;
  border-radius: 0.5rem;
  text-decoration: none;
  margin-top: 0.75rem;
  padding: 0.5rem 1.1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const CardTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const CardContainer = styled.div`
  max-width: 25rem;
  max-height: 35rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s ease, transform 0.3s ease-in-out;
  margin: 15px;
  cursor: pointer;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;