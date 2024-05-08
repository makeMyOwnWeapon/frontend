import React, { useEffect, useState } from 'react';
import { Content, NavContainer, PageBackGround, PageFooter } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import SidebarOptions from '../components/board/select_option';
import ReportCard from '../components/report/report_card';
import axios from 'axios';
import Pagination from '../components/board/pagenation';
import { motion } from 'framer-motion';
import { Cookies } from 'react-cookie';

interface ReportCard {
  createdAt: string;
  lecturerName: string;
  quizSetTitle: string;
  quizSetId: number;
  subLectureTitle: string;
  subLectureUrl: string;
}

const ReportTeacher: React.FC = () => {
    // const [cards, setCards] = useState<ReportCard[]>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(6);
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const cookies = new Cookies();    
    //             const cookie = cookies.get('jwt');
    //             const response = await axios.get('http://localhost:3000/api/history/', {
    //                 headers: {
    //                     'Authorization': `Bearer ${cookie}`
    //                 },
    //             });
    //             setCards(response.data);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // const renderReportCards = () => {
    //     return currentItems.map((card, index) => (
    //         <ReportCard
    //             key={index}
    //             memberNickname={card.lecturerName}
    //             quizSetId={card.quizSetId}
    //             subLectureTitle={card.subLectureTitle}
    //             subLectureUrl={card.subLectureUrl}
    //         />
    //     ));
    // }

    return (
        <>
            {/* <NavBar />
            <NavContainer />
            <PageBackGround>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <SidebarOptions />
                    <Content>
                        {/* {renderReportCards()} */}
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
            </PageBackGround> */}
        </>
    );
};

export default ReportTeacher;
