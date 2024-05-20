import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/Public";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";
import ReportCard from "../components/reportList/reportCard";
import { request } from "../helpers/axios_helper";
import Main from "../styles/publicStyleComponents/Main";

interface ReportCard {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl: string;
  registrationDate: string;
  lectureHistoryId: number;
  subLectureDescription: string; // 설명 필드 추가
}

interface ReportList {
  isLoggedIn: boolean;
}

const ReportList: React.FC<ReportList> = ({ isLoggedIn }) => {
  const [cards, setCards] = useState<ReportCard[]>([]);
  const [searchOption, setSearchOption] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const currentMenuName = '레포트 조회';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request('GET', '/api/history/');
        setCards(response.data);
        console.dir(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const filterCards = (card: ReportCard) => {
    if (searchOption === "all") {
      return true;
    } else if (searchOption === "subLectureTitle" && card.subLectureTitle.includes(searchText)) {
      return true;
    } else if (searchOption === "registrationDate" && card.registrationDate.includes(searchText)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <BackgroundAnimation>
        <Container>
          <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn} />
          <SearchBox>
            <select onChange={(e) => setSearchOption(e.target.value)}>
              <option value="all">선택</option>
              <option value="subLectureTitle">강의명</option>
              <option value="registrationDate">등록일</option>
            </select>
            <input
              id="input_"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="입력하세요"
            />
          </SearchBox>
          <InnerContentSection>
            <Main>
              {cards.filter(filterCards).map((card, index) => (
                <ReportCard
                  key={index}
                  subLectureId={card.subLectureId}
                  subLectureTitle={card.subLectureTitle}
                  subLectureUrl={card.subLectureUrl}
                  registrationDate={card.registrationDate}
                  lectureHistoryId={card.lectureHistoryId}
                  subLectureDescription={card.subLectureDescription} // 설명 필드 추가
                />
              ))}
            </Main>
          </InnerContentSection>
        </Container>
      </BackgroundAnimation>
    </>
  );
};


export default ReportList;

const InnerContentSection = styled.div`
  display: flex;
  height: 85%;
  > div {
  }

  #searchBox {
    height: 30%;
    margin-bottom: 100px;
  }
`;

const SearchBox = styled.div`
  position: absolute;
  right: 70px;
  top: 100px;
  display: flex;
  align-items: center;
  margin-top: 10px;

  select {
    margin-right: 10px;
    padding: 5px;
    font-size: 1rem;
  }

  input {
    padding: 5px;
    font-size: 1rem;
  }
`;
