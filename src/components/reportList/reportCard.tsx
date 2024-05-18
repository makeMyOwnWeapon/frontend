import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

interface ReportCardProps {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl: string;
  registrationDate:string;
  lectureHistoryId:number;
}

const ReportCard: React.FC<ReportCardProps> = ({  subLectureTitle, registrationDate,lectureHistoryId }) => {
  const navigate = useNavigate();




  const handleCardClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/reportDetail/${lectureHistoryId}`);
  };

  function formatUTCDateTime(utcDateTimeString:string) {
    const date = new Date(utcDateTimeString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}
  

  return (
    <ReportCardContainer>
        <div onClick={handleCardClick}>

          <ReportCardTitle>{subLectureTitle}</ReportCardTitle>
          <ReportCardComponent>생성일 
            <div>{formatUTCDateTime(registrationDate)}</div>
            </ReportCardComponent>
          <ReportCardComponent>{lectureHistoryId}</ReportCardComponent>
        </div>
        {/* <CardDescription>작성자: {memberNickname}</CardDescription> */}
    </ReportCardContainer>
  );
};

export default ReportCard;


const ReportCardContainer = styled.div`

  width: 350px;
  padding: 20px;
  margin-bottom: 30px;

  background-color: #fff;
  /* border: 1px solid red; */
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 10px 10px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  margin-right: 20px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
`;

const ReportCardComponent = styled.h5`
  margin: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #374151;
`;