import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import inflearn from '../../images/inflearn.png';

interface ReportCardProps {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl: string;
  registrationDate: string;
  lectureHistoryId: number;
  subLectureDescription: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ subLectureTitle, registrationDate, lectureHistoryId, subLectureDescription }) => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/reportDetail/${lectureHistoryId}`);
  };

  function formatUTCDateTime(utcDateTimeString: string) {
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
    <ReportCardContainer onClick={handleCardClick}>
      <ImageContainer>
        <CardImage src={inflearn} alt={subLectureTitle} />
      </ImageContainer>
      <TextContainer>
        <ReportCardTitle>{subLectureTitle}</ReportCardTitle>
        <ReportCardDescription>{subLectureDescription}</ReportCardDescription>
        <ReportCardDate>생성일: {formatUTCDateTime(registrationDate)}</ReportCardDate>
      </TextContainer>
    </ReportCardContainer>
  );
};

export default ReportCard;

const ReportCardContainer = styled.div`
  max-width: 20rem;
  max-height: 35rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.3s ease-in-out;
  margin: 15px;
  cursor: pointer;
  padding: 15px;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const CardImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
`;

const TextContainer = styled.div`
  padding: 15px;
`;

const ReportCardTitle = styled.h5`
  font-size: 1.25rem;
  font-weight: bold;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const ReportCardDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const ReportCardDate = styled.p`
  font-size: 0.875rem;
  color: #9ca3af;
`;
