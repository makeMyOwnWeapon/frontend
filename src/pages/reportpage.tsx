import React, { useEffect, useState } from 'react';
import { Content, NavContainer, PageBackGround, PageFooter  } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import SidebarOptions from '../components/board/select_option';
import axios from 'axios';
import Pagination from '../components/board/pagenation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import ReportCard from '../components/report/report_card';

interface Card {
  createdAt: string;
  memberNickname: string;
  quizSetTitle: string;
  quizSetId: number;
  recommendationCount: number;
  subLectureTitle: string;
  subLectureUrl:string;
}

const Reportpage: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate();
    const cookies = new Cookies();
    useEffect(() => {
        const token = cookies.get('jwt');        
        if (!token) {
            alert('로그인 해 주세요!')
            navigate('/main');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/history/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setCards(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const renderWorkbookCards = () => {
        return currentItems.map((card, index) => (
            <ReportCard
                key={index}
                createdAt={card.createdAt}
                memberNickname={card.memberNickname}
                quizSetTitle={card.quizSetTitle}
                quizSetId={card.quizSetId}
                recommendationCount={card.recommendationCount}
                subLectureTitle={card.subLectureTitle}
                subLectureUrl={card.subLectureUrl}
            />
        )); 
    }

    return (
        <>
            <NavBar /> 
            <NavContainer />
            <PageBackGround>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <SidebarOptions/> 
                    <Content>
                        {renderWorkbookCards()}
                    </Content>
                </motion.div>
                <PageFooter>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={cards.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </PageFooter>
            </PageBackGround>
        </>
    );
};

export default Reportpage;
