import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import BackgroundAnimation from "../styles/Background"
import Container from "../components/new_components/Container";
import "../styles/Public"
import { useParams } from "react-router-dom";
import axios from "axios";
import ReportpageComponent from "../components/report/report_reportpage_component";
import { Data } from "../components/report/reportpage";

const ReportStudentFroExtension  = () => {
    const {lectureHistoryId} = useParams();
    const [data, setData] = useState<Data>();
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get(`/api/history/extension/?lectureHistoryId=${lectureHistoryId}`,{

            });
            setData(response.data);
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
  height: 100%;

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