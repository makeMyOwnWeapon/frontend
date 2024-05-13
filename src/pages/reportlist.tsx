import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/Public"
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import ReportCard from "../components/report/report_card";
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

const ReportList: React.FC = () => {
    const [cards, setCards] = useState<ReportCard[]>([]);
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
                                    <ReportCard
                                    key={index}
                                    subLectureId={card.subLectureId}
                                    subLectureTitle={card.subLectureTitle}
                                    subLectureUrl={card.subLectureUrl}
                                    registrationDate={card.registrationDate}
                                    lectureHistoryId={card.lectureHistoryId}
                                    />
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