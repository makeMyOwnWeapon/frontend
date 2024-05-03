import React, { useEffect, useState } from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

interface WorkbookCardProps {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

interface RecommendationProps {
  numOfRecommendation: number;
  quizSetId: number;
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({
  createdAt,
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
      const cookies = new Cookies();
      const token = cookies.get('jwt');
  
      const response = await fetch('http://localhost:3000/api/quizsets/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          numOfRecommendation,
          quizSetId,
        }),
      });
  
      if (!response.ok) {
        switch (response.status) {
          case 412:
            alert('Same title');
            break;
          default:
            alert('Network response was not ok');
            break;
        }
      } else {
        const responseData = await response.json();
        if (responseData  !== undefined) {
          setRecommendation(responseData);
        } else {
          console.error('No updated count returned from the API');
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
      <a onClick={handleCardClick}>
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
