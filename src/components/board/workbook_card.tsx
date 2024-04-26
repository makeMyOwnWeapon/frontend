import React from "react";
import { CardContainer, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
// 컴포넌트 정의
interface WorkbookCardProps {
  videoUrl: string;
  title: string;
  description: string;
  readMoreUrl: string;
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({ videoUrl, title, description, readMoreUrl }) => {
//문제집명, 강의명, 강사명, 추천인수, 작성자 id, 등록날짜, 페이징
  return (
    <CardContainer>
      <a href="#">
          <VideoThumbnail imageUrl={videoUrl} /> 
      </a>
      <CardContent>
        <a href="#">
          <CardTitle>{title}</CardTitle>
        </a>
        <CardDescription>{description}</CardDescription>
        <CardDescription>사람이름이 들어가는 자리에요</CardDescription>
        <ReadMoreLink href={readMoreUrl}>
          추천!
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default WorkbookCard;
