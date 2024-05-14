import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import "../styles/Public"
import ToastModal from "../components/public/toastModal";
import Side from "../styles/publicStyleComponents/Side";
import Main from "../styles/publicStyleComponents/Main";
import { request, getAuthToken } from "../helpers/axios_helper";
import NaviSection from "../styles/publicStyleComponents/NaviSection";
import { useParams } from "react-router-dom";
import ReportpageComponent from "../components/report/report_reportpage_component";
import { Data } from "../components/reportList/reportInterface";

// function formatDate(inputDate: string): string {
//   const date = new Date(inputDate);
//   if (inputDate === null){
//     return "0";
//   }
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   const hour = String(date.getHours()).padStart(2, '0');
//   const minute = String(date.getMinutes()).padStart(2, '0');
//   const second = String(date.getSeconds()).padStart(2, '0');
//   const formattedDate = `${year}/${month}/${day}/${hour}:${minute}:${second}`;

//   return formattedDate;
// }

const ReportDetail  = () => {
  const {lectureHistoryId} = useParams();

    const [data, setData] = useState<Data>();
    const currentMenuName = '레포트 상세조회'

    useEffect(() => {
        // 레포트 정보 요청
        const fetchData = async () => {
            try{
            const response = await request('GET','/api/history?lectureHistoryId=' + lectureHistoryId);
            setData(response.data);
            console.dir(response.data);
        }catch(error){
            console.error('Error:', error);
        }
        };
        fetchData();
    }, [lectureHistoryId])
    if (!data) {

      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px', color: '#555', backgroundColor: '#f0f0f0' }}>
          <p>GPT가 데이터를 만들고 있습니다!</p>
        </div>
      );
    }
    


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
              <ReportpageComponent data = {data}/>

            </Main>
            </InnerContentSection>
        </Container>
    </BackgroundAnimation>
    </>
    );
    
  };
export default ReportDetail;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;
  height: 85%;


  `