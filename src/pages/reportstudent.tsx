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
import { da } from "date-fns/locale";

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

interface Data {
  quizzes: Quiz[];
  sleepinessAndDistraction: SleepinessAndDistraction[];
  studyStartTime: string;
  studyEndTime: string;
}

const ReportStudent  = () => {
    const { subLectureId } = useParams();
    const [data, setData] = useState<Data>();
    const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0', '0']);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const cookies = new Cookies();
            const cookie = cookies.get('jwt');
            const response = await axios.get(`/api/history/?subLectureId=${subLectureId}`,{
                headers: {
                  'Authorization': `Bearer ${cookie}`
                }
            });
            setData(response.data);
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
    }, [])

    if (!data) {
      return <div>Loading...</div>; // 또는 다른 로딩 컴포넌트
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


                <ReportStudentBackground>
                    <ReportStudentTitle>OOO 강의 레포트 페이지</ReportStudentTitle>
                    <ReportStudentSubTitle>강의명 : aaaa</ReportStudentSubTitle>
                    
                    <LineChartSize>
                      <LineChart response = {data}/>
                    </LineChartSize>

                    <PieChartSize>
                      <PieChart response = {data} setstudyTime={setStudyTime} />
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
                    </PieChartSize>
                    
                    <div>
                      <ReportQuestionInfoComponent quizzes={data.quizzes}/>

                    </div>
                    
                </ReportStudentBackground>



            </InnerContentSection>
        </Container>
    </BackgroundAnimation>
        </>

    );
    };

const PieChartSize = styled.div`
  display: flex;
  align-items: center; 
  padding : 30px;
  width:70%;
  height:70%;

  
`;
const LineChartSize = styled.div`
  width:100%;
  height:50%;

`;


const ReportStudentBackground = styled.div`
    width: 100%;
    margin : 10px;
    opacity: 0.6;
    border-radius: 20px;
    background-color: white;
    overflow-y: scroll;
`;

const ReportStudentTitle = styled.h1`
    display: flex;
    margin:30px;


`;

const ReportStudentSubTitle = styled.h3`
    margin:30px;


`;

const PieText = styled.h1`
    margin:30px;
    flex-direction: column; // 내부 컴포넌트를 세로로 쌓기

    /* justify-content: center; */
    align-items: center;
    display: absolute;
    width : 100%;


`;

export default ReportStudent;

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