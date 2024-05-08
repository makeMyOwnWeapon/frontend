import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import ReportCard from "../components/report/report_card";
import { request } from "../helpers/axios_helper";

interface ReportCard {
  createdAt: string;
  lecturerName: string;
  quizSetTitle: string;
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl:string;
  registrationDate:string;
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
                    <div id="side">
                            <div id="searchBox">1</div>
                            <div id="profileBox">2</div>
                    </div>
                            
                        <div id="main">
                            {cards.map((card, index) => (
                                // <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                    <ReportCard
                                    key={index}
                                    memberNickname={card.lecturerName}
                                    subLectureId={card.subLectureId}
                                    subLectureTitle={card.subLectureTitle}
                                    subLectureUrl={card.subLectureUrl}
                                    registrationDate={card.registrationDate}
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