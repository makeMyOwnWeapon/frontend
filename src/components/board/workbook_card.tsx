import React from "react";
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  const handleCardClick = (e: any) => {
    e.preventDefault();
    navigate(`/question_info/${quizSetId}`, { state: { subLectureUrl } });
  };

  return (
    <div onClick={handleCardClick}>
      <VideoThumbnail imageUrl={subLectureUrl} />
      <div>
        <h3>{quizSetTitle}</h3>
        <p>작성자: {memberNickname}</p>
        <div>
          <FaThumbsUp /> {recommendationCount}
        </div>
      </div>
    </div>
  );
};

export default WorkbookCard;
