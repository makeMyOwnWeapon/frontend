import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Account from '../components/main/account'
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import { Cookies } from "react-cookie";
import axios from "axios";
import ReportCard from "../components/report/report_card";

interface ReportCard {
  createdAt: string;
  lecturerName: string;
  quizSetTitle: string;
  quizSetId: number;
  subLectureTitle: string;
  subLectureUrl:string;
}

const ReportList: React.FC = () => {
    const [cards, setCards] = useState<ReportCard[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate();   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = new Cookies();    
                const cookie = cookies.get('jwt');
                const response = await axios.get('http://localhost:3000/api/history/', {
                    headers: {
                        'Authorization': `Bearer ${cookie}`
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

    const renderReportCards = () => {
        return currentItems.map((card, index) => (
            <ReportCard
                key={index}
                memberNickname={card.lecturerName}
                quizSetId={card.quizSetId}
                subLectureTitle={card.subLectureTitle}
                subLectureUrl={card.subLectureUrl}
            />
        )); 
    }

    return (
        <>
        <BackgroundAnimation>
            <Container>
                <NaviSection></NaviSection>
                    <InnerContentSection>
                    <div id="side">
                            <div id="searchBox">1</div>
                            <div id="profileBox">2</div>
                    </div>
                            
                        <div id="main">
                            {/* {cards.map((card, index) => (
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
                                ))} */}
                        </div>
                    </InnerContentSection>
            </Container>
        </BackgroundAnimation>
        </>
    );
};

export default ReportList;

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