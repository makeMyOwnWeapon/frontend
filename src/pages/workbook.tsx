import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import { Cookies } from "react-cookie";
import axios from "axios";
import WorkbookCard from "../components/board/workbook_card";
import SidebarOptions from "../components/board/select_option";
import { Side } from "../components/new_components/Side";
import { Main } from "../components/new_components/Main";


interface Card {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const WorkBook: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchOption, setSearchOption] = useState<string>("all"); // 기본 검색 옵션은 '문제집명'
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {

    const fetchData = async () => {
      try {
        const cookies = new Cookies();
        const cookie = cookies.get('jwt');
        const response = await axios.get('http://localhost:3000/api/quizsets/', {
          headers: { 'Authorization': `Bearer ${cookie}` },
        });
        setCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

   // 검색어에 따라 카드 필터링 함수
   const filterCards = (card: Card) => {
    // 선택된 옵션에 따라 검색

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
        <NaviSection></NaviSection>
        <InnerContentSection>
              
              <Side>
                <SidebarOptions/>

                <SearchBox>
                    <select onChange={(e) => setSearchOption(e.target.value)}>
                      <option value="all">전체</option>
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
                
              </Side>
                
              <Main>
                {cards.filter(filterCards)
                  .map((card, index) => (
                      // <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <WorkbookCard
                          createdAt={card.createdAt}
                          memberNickname={card.memberNickname}
                          quizSetTitle={card.quizSetTitle}
                          quizSetId={card.quizSetId}
                          recommendationCount={card.recommendationCount}
                          subLectureTitle={card.subLectureTitle}
                          subLectureUrl={card.subLectureUrl}
                        />
                      // </motion.div>
                    ))}
              </Main>
             </InnerContentSection>
      </Container>
   </BackgroundAnimation>
    </>
  );
};

export default WorkBook;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;

  height: 85%;

>div{
  /* border: 1px solid black; */
}


#searchBox{
  height: 30%;
  margin-bottom: 100px;
  
}

#profileBox{
  height: 40%;

}

`
const SearchBox = styled.div`
display: flex;
align-items: start;
flex-direction: column;
margin-top: 50px;

select,
input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

#input_{
  width: 100%;
}
`;