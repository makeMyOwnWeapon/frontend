import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import "../styles/Public"
import { useParams } from "react-router-dom";
import ReportpageComponent from "../components/report/report_reportpage_component";
import { Data } from "../components/reportList/reportInterface";
import { bodyRequest } from "../helpers/axios_helper";
import AiReportCreateLoading from "../components/report/report_AiCreateLoading";

const ReportStudentFroExtension  = () => {
    const {lectureHistoryId} = useParams();
    const [data, setData] = useState<Data>();
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await bodyRequest('GET',`/api/history/extension/?lectureHistoryId=${lectureHistoryId}`,{
            
            });
            setTimeout(() => {
              setData(response.data);
          }, 5000); // 10초 레이턴시를 만드는 함수. setData를 n/1000초 만큼 늦게 로딩시킴
            console.log('=======');
            console.dir(response.data);
            console.log('=======');
        }catch(error){
            console.error('Error:', error);
        }
        };
        fetchData();
    }, [lectureHistoryId])
    if (!data) {
      return (       
        <AiReportCreateLoading/>
      )
    }
    
    
//  내가 풀었던 문제 = 문제관련된거 다, 해설은 눌렀을때 나오는거
// gpt가 요약해준 키워드 정리, 다맞았을때는 다른 말로

    return (
        <>
    <BackgroundAnimation>
        <Container>
            <InnerContentSection>
              <ReportpageComponent data = {data}/>
            </InnerContentSection>
        </Container>
    </BackgroundAnimation>
        </>
    );
  };

export default ReportStudentFroExtension;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;
  height: 100vh;
  /* border: 5px solid red; */

>div{
  /* border: 1px solid black; */
}

#main{
  width: 85%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  /* border: 10px solid pink; */
  justify-content: space-evenly;
}
  `
