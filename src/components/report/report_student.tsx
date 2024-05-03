import React from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { useNavigate } from "react-router-dom";

interface ReportCardProps {
  memberNickname: string;
  quizSetId: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const ReportStudent: React.FC<ReportCardProps> = ({  memberNickname,  quizSetId, subLectureTitle, subLectureUrl }) => {
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
          <CardTitle>{subLectureTitle}</CardTitle>
        </a>
        <CardDescription>작성자: {memberNickname}</CardDescription>

      </CardContent>
    </CardContainer>
  );
};

export default ReportStudent;
