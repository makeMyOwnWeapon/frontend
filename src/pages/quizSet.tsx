import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/publicStyleComponents/Public";
import WorkbookCard from "../components/quizSet/quizSetCard";
import { request } from "../helpers/axios_helper";
import NaviSection from "../components/public/NaviSection";
import Main from "../styles/publicStyleComponents/Main";
import Container from "../styles/publicStyleComponents/Container";
import BackgroundAnimation from "../components/public/BackgroundAnimation";

interface Card {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

interface QuizSetProps {
  isLoggedIn: boolean;
}

const WorkBook: React.FC<QuizSetProps> = ({ isLoggedIn }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchOption, setSearchOption] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");

  const currentMenuName = '문제집 조회'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request('GET','/api/quizsets/');
        setCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const filterCards = (card: Card) => {
    if (searchOption === "all") {
      return true;
    } else if (searchOption === "quizSetTitle" && card.quizSetTitle.includes(searchText)) {
      return true;
    } else if (searchOption === "memberNickname" && card.memberNickname.includes(searchText)) {
      return true;
    } else if (searchOption === "subLectureTitle" && card.subLectureTitle.includes(searchText)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <BackgroundAnimation>
        <Container>
        {/* showSearchBox={true} */}
          <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn}  />
          <SearchBox>
            <select onChange={(e) => setSearchOption(e.target.value)}>
              <option value="all">선택</option>
              <option value="quizSetTitle">문제집명</option>
              <option value="memberNickname">작성자</option>
              <option value="subLectureTitle">강의명</option>
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
                <WorkbookCard
                  key={index}
                  createdAt={card.createdAt}
                  memberNickname={truncateTitle(card.memberNickname, 12)}
                  quizSetTitle={truncateTitle(card.quizSetTitle, 10)}
                  quizSetId={card.quizSetId}
                  recommendationCount={card.recommendationCount}
                  subLectureTitle={card.subLectureTitle}
                  subLectureUrl={card.subLectureUrl}
                />
              ))}
            </Main>
          </InnerContentSection>
        </Container>
      </BackgroundAnimation>
    </>
  );
};

export default WorkBook;

export function truncateTitle(title: any, maxLength: any) {
  return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
}

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