import React from "react";
import { CardContainer, CardImage, CardContent, CardTitle, CardDescription, ReadMoreLink } from "../../styles/WorkBookCard"; 
import defaultThumbnail from '../../images/default_thumbnail.jpeg'
import inflearn from '../../images/inflearn.png'
import krafton from '../../images/krafton.png'
import VideoThumbnail from "../public/url_to_image";
// 컴포넌트 정의
interface WorkbookCardProps {
  imageUrl: string;
  title: string;
  description: string;
  readMoreUrl: string;
}

const WorkbookCard: React.FC<WorkbookCardProps> = ({ imageUrl, title, description, readMoreUrl }) => {

  return (
    <CardContainer>
      <a href="#">
          <VideoThumbnail imageUrl={imageUrl}/> 
      </a>
      <CardContent>
        <a href="#">
          <CardTitle>{title}</CardTitle>
        </a>
        <CardDescription>{description}</CardDescription>
        <ReadMoreLink href={readMoreUrl}>
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default WorkbookCard;
