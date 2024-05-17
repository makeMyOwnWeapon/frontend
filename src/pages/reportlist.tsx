import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/Public"
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";

import ReportCard from "../components/reportList/reportCard";
import ToastModal from "../components/public/toastModal";
import { request } from "../helpers/axios_helper";
import Side from "../styles/publicStyleComponents/Side";
import Main from "../styles/publicStyleComponents/Main";

interface ReportCard {
  subLectureId: number;
  subLectureTitle: string;
  subLectureUrl:string;
  registrationDate:string;
  lectureHistoryId:number;
}

const ReportList: React.FC = () => {
    const [cards, setCards] = useState<ReportCard[]>([]);
    const navigate = useNavigate();   
    const currentMenuName = '레포트 조회'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET','/api/history/');
                setCards(response.data);
                console.dir(response.data);

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <>
        <BackgroundAnimation>
            <Container>
            <NaviSection currentMenuName = {currentMenuName}></NaviSection>
                    <InnerContentSection>
                      <Side>
                        <ToastModal/>
                      </Side>
                        <Main>
                            {cards.map((card, index) => (
                                    <ReportCard
                                    key={index}
                                    subLectureId={card.subLectureId}
                                    subLectureTitle={card.subLectureTitle}
                                    subLectureUrl={card.subLectureUrl}
                                    registrationDate={card.registrationDate}
                                    lectureHistoryId={card.lectureHistoryId}
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
  border: 10px solid red;

>div{

}

#searchBox{
  height: 30%;
  margin-bottom: 100px;
  
}


`