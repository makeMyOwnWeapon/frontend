import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation"
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";
import "../styles/Public"
import { useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import PieChart from "../components/report/report_pie";
import LineChart from "../components/report/report_line";
import ReportQuestionInfoComponent from "../components/report/report_question_review";
import ToastModal from "../components/public/toastModal";

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

interface reviews{
  title:string;
  content:string;
}
interface gptSummery{
  reviews: reviews[];
}


interface Data {
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}/${hour}:${minute}:${second}`;

  return formattedDate;
}

const ReportStudent  = () => {
    const location = useLocation();
    const [data, setData] = useState<Data>();
    const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0', '0']);
    const subLectureId = location.state.subLectureId;
    const lectureHistoryId = location.state.lectureHistoryId;
    const subLectureTitle = location.state.subLectureTitle;
    useEffect(() => {

        const fetchData = async () => {
            try{
            const cookies = new Cookies();
            const cookie = cookies.get('jwt');
            const response = await axios.get(`/api/history/?subLectureId=${subLectureId}&lectureHistoryId=${lectureHistoryId}`,{
                headers: {
                  'Authorization': `Bearer ${cookie}`
                }
            });
            setData(response.data);
        }catch(error){
            console.error('Error:', error);
        }
        };
        fetchData();
    }, [location])

    if (!data) {
      return <div>Loading...</div>;
   }

    return (
        <>
    <BackgroundAnimation>
        <Container>
            <NaviSection></NaviSection>
            <InnerContentSection>
            <div id="side">
                <ToastModal/>
            </div>
                <ReportStudentBackground>
                    <ReportStudentTitle>{subLectureTitle} 레포트 페이지</ReportStudentTitle>
                    <ReportStudentSubTitle>공부 시작 시간 : {formatDate(data.studyStartTime)}</ReportStudentSubTitle>
                    <ReportStudentSubTitle>공부 종료 시간 : {formatDate(data.studyEndTime)}</ReportStudentSubTitle>
                    <LineChartSize>
                      <LineChart response = {data}/>
                    </LineChartSize>
                    <PieChartSize>
                      <div id = "chart" >
                      <PieChart response = {data} setstudyTime={setStudyTime} />
                      </div>
                      <div id = "text" >
                        <PieText>
                              <div>
                                  - 총 공부시간 = {studyTime[2]}분  
                              </div>
                              <div>
                                  - 자리 비운 시간 : {studyTime[1]}분
                              </div>
                              <div>
                                  - 졸은 시간 : {studyTime[0]}분
                              </div>
                              <div>
                                  - 총 공부 시간 : {studyTime[3]}분
                              </div>
                        </PieText>
                      </div>
                    </PieChartSize>
                    <ReportTextContainer>
                          <ReportQuestionInfoComponent quizzes={data.quizzes}/>
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
    overflow-y: scroll;
`;

const ReportStudentTitle = styled.div`
    font-weight: bold; 
    font-size : 4.0em;
    display: flex;
    margin:40px;
`;

const ReportStudentSubTitle = styled.div`
    font-size: 1.5em;
    margin:50px;
`;

const PieText = styled.div`
    font-size: 1.5em;
    margin:30px;
    flex-direction: column;
    align-items: center;
    width : 100%;

`;

export default ReportStudent;

const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;
  height: 85%;

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