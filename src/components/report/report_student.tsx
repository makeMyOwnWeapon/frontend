import React from "react";
import VideoThumbnail from "../public/url_to_image";
import { useNavigate } from "react-router-dom";
import { PublicCardContainer, PublicCardContent,PublicCardDescription, PublicCardTitle } from "../../styles/Public";

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
    <PublicCardContainer>
      <a href="" onClick={handleCardClick}>
        <VideoThumbnail imageUrl={subLectureUrl} /> 
      </a>
      <PublicCardContent>
        <a href="">
          <PublicCardTitle>{subLectureTitle}</PublicCardTitle>
        </a>
        <PublicCardDescription>작성자: {memberNickname}</PublicCardDescription>
      </PublicCardContent>
    </PublicCardContainer>
  );
};

export default ReportStudent;
