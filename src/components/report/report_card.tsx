import React from "react";
import { CardContent, CardTitle, CardComponent } from "../../styles/WorkBookCard"; 
import VideoThumbnail from "../public/url_to_image";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

interface ReportCardProps {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl: string;
  registrationDate:string;
  lectureHistoryId:number;
}

const ReportCard: React.FC<ReportCardProps> = ({   subLectureId, subLectureTitle, subLectureUrl,registrationDate,lectureHistoryId }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(subLectureTitle);
    navigate(`/reportstudent/`, {state: {lectureHistoryId:lectureHistoryId ,subLectureId:subLectureId , subLectureTitle:subLectureTitle}});
    
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  return (
    <ReportCardContainer>
      <CardContent>
        <a href="" onClick={handleCardClick}>

          <ReportCardTitle>{subLectureTitle}</ReportCardTitle>
          <ReportCardComponent>공부 시간 : {formatDate(registrationDate)}</ReportCardComponent>
          <ReportCardComponent>{lectureHistoryId}</ReportCardComponent>
        </a>
        {/* <CardDescription>작성자: {memberNickname}</CardDescription> */}

      </CardContent>
    </ReportCardContainer>
  );
};

export default ReportCard;


const ReportCardContainer = styled.div`
  height: 150px;
  max-width: 20rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 10px 10px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  margin: 20px;
  transition: transform 0.3s ease-in-out; /* 부드러운 전환 효과 */
  &:hover {
    transform: scale(1.05); /* 마우스 오버 시 5% 확대 */
    box-shadow: 10px 10px 4px 0 rgba(0,0,0,0.1);
  }

  .cardImg{
    object-fit: cover;
    /* border: 1px solid red; */
  }
  

`;

const ReportCardTitle = styled.h5`
margin: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5;
  color: #374151;
`;

const ReportCardComponent = styled.h5`
  margin: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 0%.75;
  font-weight: bold;
  line-height: 1.5;
  color: #374151;
`;