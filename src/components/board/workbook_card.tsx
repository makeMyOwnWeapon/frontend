import React from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { FaThumbsUp } from "react-icons/fa";
// 컴포넌트 정의
interface WorkbookCardProps {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl:string
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({ createdAt, memberNickname, quizSetTitle, recommendationCount,subLectureTitle,subLectureUrl }) => {
//문제집명, 강의명, 강사명, 추천인수, 작성자 id, 등록날짜, 페이징
  return (
    <CardContainer>
      <a href="#">
          <VideoThumbnail imageUrl={subLectureUrl} /> 
      </a>
      <CardContent>
        <a href="#">
          <CardTitle>{quizSetTitle}</CardTitle>
        </a>
        <CardDescription>작성자: {memberNickname}</CardDescription>
        <ReadMoreLink >
        <FaThumbsUp />{recommendationCount}
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default WorkbookCard;
