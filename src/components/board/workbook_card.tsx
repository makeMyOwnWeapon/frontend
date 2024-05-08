import React, { useEffect, useState } from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { request } from "../../helpers/axios_helper";

interface WorkbookCardProps {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({
  memberNickname,
  quizSetTitle,
  quizSetId,
  recommendationCount,
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

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/question_info/${quizSetId}`, { state: { subLectureUrl } });
  };

  const recommendationClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation();
    recommendationPost(recommendation, quizSetId);
  };

  return (
    <CardContainer >
      <a className="cardImg" onClick={handleCardClick}>
      <VideoThumbnail imageUrl={subLectureUrl} />
      </a>
      <CardContent>
        <CardTitle>{quizSetTitle}</CardTitle>
        <CardDescription>작성자: {memberNickname}</CardDescription>
        <ReadMoreLink onClick={recommendationClick}>
          <FaThumbsUp />
          {recommendation}
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default WorkbookCard;
