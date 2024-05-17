import React from "react";
import { PublicCardContent } from "../../styles/Public";
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
    // UTC 시간 문자열을 Date 객체로 변환
    const date = new Date(utcDateTimeString);

    // UTC 시간대의 연, 월, 일, 시, 분, 초 추출
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth()는 0부터 시작하므로 +1 필요
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    // 결과 형식: YYYY년 M월 DD일 HH시 MM분 SS초
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}
  

  return (
    <ReportCardContainer>
      <PublicCardContent>
        <div onClick={handleCardClick}>

          <ReportCardTitle>{subLectureTitle}</ReportCardTitle>
          <ReportCardComponent>생성일 : {formatUTCDateTime(registrationDate)}</ReportCardComponent>
          <ReportCardComponent>{lectureHistoryId}</ReportCardComponent>
        </div>
        {/* <CardDescription>작성자: {memberNickname}</CardDescription> */}

      </PublicCardContent>
    </ReportCardContainer>
  );
};

export default ReportCard;


const ReportCardContainer = styled.div`
  height: 200px;
  max-width: 20rem;
  background-color: #fff;
  border: 1px solid red;
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
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
`;

const ReportCardComponent = styled.h5`
  margin: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 0%.75;
  font-weight: bold;
  color: #374151;
`;