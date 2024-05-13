import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import BackgroundAnimation from "../styles/Background"
import NaviSection from "../components/new_components/NaviSection";
import Container from "../components/new_components/Container";
import "../styles/Public"
import { useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import PieChart from "../components/report/report_pie";
import LineChart from "../components/report/report_line";
import ReportQuestionInfoComponent from "../components/report/report_question_review";
import ReportApplicationQuestion from "../components/report/report_application_question";
import SidebarOptions from "../components/board/select_option";

interface SleepinessAndDistraction {
  sleepinessStart: string | null;
  sleepinessEnd: string | null;
  distractionStart: string | null;
  distractionEnd: string | null;
}

interface Quiz {
  choices: Choice[];
  commentary:string;
  isCorrect:boolean;
  question:string;
  solvedDuration:number;
  userChoice:string;
}

interface Choice {
  content: string;
  isAnswer: boolean;
}

interface gptAppQuestion {
  choices: Choice[];
  commentary:string;
  instruction:string;
}

interface summary{
  reviews:string;
}

interface gptSummery{
  summary: summary[];
}

interface Data{
  gptAppQuestion:gptAppQuestion[];
  gptSummery:gptSummery;
  readHistoryReport:readHistoryReport;
}
interface readHistoryReport {
  quizzes: Quiz[];
  sleepinessAndDistraction: SleepinessAndDistraction[];
  studyStartTime: string;
  studyEndTime: string;
}
function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  if (inputDate === null){
    return "0";
  }
  // 날짜 및 시간 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  // 원하는 형식으로 변환
  const formattedDate = `${year}/${month}/${day}/${hour}:${minute}:${second}`;

  return formattedDate;
}

// 사용 예시
const inputDate = "2024-05-09T01:34:14.000Z";

const ReportStudentFroExtension  = () => {
    const {lectureHistoryId} = useParams();
    const [data, setData] = useState<Data>();
    const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0', '0']);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get(`/api/history/extension/?lectureHistoryId=${lectureHistoryId}`,{

            });
            setData(response.data);
            console.log(response)
            // data structure
            //  (sleepinessAndDistraction) : [졸기 시작한 시간(sleepinessStart), 조는거 끝난 시간(sleepinessEnd),자리이탈 시작시간(distractionStart), 다시 돌아온 시간(distractionEnd)],
            
            // quizzes
            // [문제, (question)
            // [선택지, 정답 여부],(choice : content, isAnswer) 
            // 맞았는지, (isCorrect)
            // 해설, (commentary)
            // 내가 선택한거(userChoice), 
            // 걸린시간(solveDuration)],

            // 학습시작시각(studyStartTime), 
            // 학습종료시각(studyEndTime)
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
                <ReportStudentBackground>
                    <ReportStudentTitle> 레포트 페이지</ReportStudentTitle>
                    <ReportStudentSubTitle>공부 시작 시간 : {formatDate(data.readHistoryReport.studyStartTime)}</ReportStudentSubTitle>
                    <ReportStudentSubTitle>공부 종료 시간 : {formatDate(data.readHistoryReport.studyEndTime)}</ReportStudentSubTitle>
                    
                    <LineChartSize>
                      <LineChart response = {data.readHistoryReport}/>
                    </LineChartSize>

                    <PieChartSize>
                    <div id="chart">
    <PieChart response={data.readHistoryReport} setstudyTime={setStudyTime} />
</div>
<div id="text">
    <PieText>
        <div>
            - 졸은 시간: {studyTime[0]}분 {studyTime[3]}초
        </div>
        <div>
            - 자리 비운 시간: {studyTime[1]}분 {studyTime[4]}초
        </div>
        <div>
            - 총 공부 시간: {studyTime[2]}분 {studyTime[5]}초
        </div>
    </PieText>
</div>


                      
                      
                      
                    </PieChartSize>

                    <ReportTextContainer>

                          <ReportQuestionInfoComponent quizzes={data.readHistoryReport.quizzes}/>

                          <ReportApplicationQuestion gptSummery={data.gptSummery.summary} />

                          

                    </ReportTextContainer>
                    
                </ReportStudentBackground>



            </InnerContentSection>
        </Container>
    </BackgroundAnimation>
        </>

    );
    };


const ReportTextContainer = styled.div`
  

`;
  
const PieChartSize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding : 30px;
  width:100%;
  height:70%;
  /* border:1px solid red; */
 
  >div{
    /* border: 1px solid blue; */
    height:70%;
  }


  #chart{
    display: flex;
    max-width: 100%;
  }

  

  
`;
const LineChartSize = styled.div`
  width:100%;
  height:50%;

`;


const ReportStudentBackground = styled.div`
    width: 100%;
    margin : 10px;
    border-radius: 20px;
    background: transparent;
    overflow-y: scroll;
`;

const ReportStudentTitle = styled.div`
    font-weight: bold; 
    font-size : 4.0em;
    display: flex;
    margin:40px;


`;

const ReportStudentSubTitle = styled.h3`
    font-size: 1.5em;


`;

const PieText = styled.div`
    font-size: 1.5em;
    margin:30px;
    flex-direction: column; // 내부 컴포넌트를 세로로 쌓기
    /* justify-content: center; */
    align-items: center;
    width : 100%;


`;

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
  