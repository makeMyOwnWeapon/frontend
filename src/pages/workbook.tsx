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

  return (
    <>
<BackgroundAnimation>
      <Container>
        <NaviSection></NaviSection>
        <InnerContentSection>
              <div id="side">

                  <SidebarOptions/>

                <div id="searchBox">

                </div>
                
              </div>
                
              <div id="main">
                {cards.map((card, index) => (
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
              </div>
             </InnerContentSection>
      </Container>
   </BackgroundAnimation>
    </>
  );
};

export default WorkBook;

const InnerContentSection = styled.div`
  border: 10px solid green;
  display: flex;

  height: 85%;

>div{
  border: 1px solid black;
}

#main{
  width: 85%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  border: 10px solid pink;
  justify-content: space-evenly;
}

#side{
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#side > div{
  border: 1px solid black;
}


#searchBox{
  height: 30%;
  margin-bottom: 100px;
  
}

#profileBox{
  height: 40%;

}


  `