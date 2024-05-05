import React, { useEffect, useState } from 'react';
import { Content, ContentBox, NavContainer, PageBackGround } from '../styles/Public';
import NavBar from '../components/public/navbar_default';
import SidebarOptions from '../components/board/select_option';
import WorkbookCard from '../components/board/workbook_card';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Cookies } from 'react-cookie';

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
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <NavContainer />
        <PageBackGround>
            <SidebarOptions />
            <ContentBox>
                <Content>
                  {cards.map((card, index) => (
                    <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                      <WorkbookCard
                        createdAt={card.createdAt}
                        memberNickname={card.memberNickname}
                        quizSetTitle={card.quizSetTitle}
                        quizSetId={card.quizSetId}
                        recommendationCount={card.recommendationCount}
                        subLectureTitle={card.subLectureTitle}
                        subLectureUrl={card.subLectureUrl}
                      />
                    </motion.div>
                  ))}
                </Content>
            </ContentBox>
      </PageBackGround>
    </>
  );
};

export default WorkBook;
