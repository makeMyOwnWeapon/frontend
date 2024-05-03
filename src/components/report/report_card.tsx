import React from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ReportCardProps {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ createdAt, memberNickname, quizSetTitle, quizSetId, recommendationCount, subLectureTitle, subLectureUrl }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/question_info/${quizSetId}`,{ state: { subLectureUrl } });
  };

  return (
    <CardContainer>
      <a href="" onClick={handleCardClick}>
        <VideoThumbnail imageUrl={subLectureUrl} /> 
      </a>
      <CardContent>
        <a href="">
          <CardTitle>{quizSetTitle}</CardTitle>
        </a>
        <CardDescription>작성자: {memberNickname}</CardDescription>
        <ReadMoreLink>
          <FaThumbsUp />{recommendationCount}
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default ReportCard;
