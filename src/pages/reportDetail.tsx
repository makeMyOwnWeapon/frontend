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

const ReportDetail  = () => {
  const {lectureHistoryId} = useParams();

  const [data, setData] = useState<Data | undefined>(); // Set initial value to undefined
  const currentMenuName = '레포트 상세조회'

  useEffect(() => {
    // 레포트 정보 요청
    const fetchData = async () => {
      try{
        const response = await request('GET','/api/history?lectureHistoryId=' + lectureHistoryId);
        setData(response.data);
        console.dir(response.data);
      } catch(error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

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
              {data && <ReportpageComponent data = {data} />}
            </Main>
          </InnerContentSection>
        </Container>
      </BackgroundAnimation>
    </>
  );    
};

export default ReportDetail;

const InnerContentSection = styled.div`
  /* border: 10px solid red; */
  display: flex;
  height: 85%;
`
