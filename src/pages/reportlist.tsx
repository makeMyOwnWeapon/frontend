import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import ReportCard from "../components/report/report_card";
import { motion } from 'framer-motion';
import SidebarOptions from "../components/board/select_option";
import { Side } from "../components/new_components/Side";
import { request } from "../helpers/axios_helper";

interface ReportCard {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl:string;
  registrationDate:string;
  lectureHistoryId:number;
}
//paging 관련 코드들은 전부 주석처리
const ReportList: React.FC = () => {
    const [cards, setCards] = useState<ReportCard[]>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(6);
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate();   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET','/api/history/');
                setCards(response.data);

            } catch (error) {
                console.error('Error:', error);
            }
            
            
        };
        
        fetchData();
        
    }, [navigate]);

    // const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // const renderReportCards = () => {
    //     return cards.map((card, index) => (
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
        <BackgroundAnimation>
            <Container>
                <NaviSection></NaviSection>
                    <InnerContentSection>
                      <Side>
                        <SidebarOptions/>
                      </Side>
                        <div id="main">
                            {cards.map((card, index) => (
                                // <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                    <ReportCard
                                    key={index}
                                    subLectureId={card.subLectureId}
                                    subLectureTitle={card.subLectureTitle}
                                    subLectureUrl={card.subLectureUrl}
                                    registrationDate={card.registrationDate}
                                    lectureHistoryId={card.lectureHistoryId}
                                    />
                                //  </motion.div> 
                                ))}
                        </div>
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

>div{

}

#main{
  width: 85%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
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