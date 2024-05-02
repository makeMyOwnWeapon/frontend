import React from "react";
import styles from "../../styles/WorkbookCard.module.css";
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
  createdAt,
  memberNickname,
  quizSetTitle,
  quizSetId,
  recommendationCount,
  subLectureTitle,
  subLectureUrl
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e:any) => {
    e.preventDefault();
    navigate(`/question_info/${quizSetId}`,{ state: { subLectureUrl } });
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <VideoThumbnail imageUrl={subLectureUrl} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{quizSetTitle}</h3>
        <p className={styles.cardDescription}>작성자: {memberNickname}</p>
        <div className={styles.readMoreLink}>
          <FaThumbsUp /> {recommendationCount}
        </div>
      </div>
    </div>
  );
};

export default WorkbookCard;
