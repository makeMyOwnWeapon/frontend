import React, { useState } from "react";
import styled from "styled-components";
import LineChart from "./report_line";
import PieChart from "./report_pie";
import ReportQuestionInfoComponent from "./report_question_review";
import ReportApplicationQuestion from "./report_application_question";
import { Data } from "../reportList/reportInterface";
import Progress from "./progressBar";
interface ReportpageProps {
    data: Data;
  }
  

  function formatUTCDateTime(utcDateTimeString:string) {
    // UTC 시간 문자열을 Date 객체로 변환
    const date = new Date(utcDateTimeString);

    // UTC 시간대의 연, 월, 일, 시, 분, 초 추출
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth()는 0부터 시작하므로 +1 필요
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    // 결과 형식: YYYY년 M월 DD일 HH시 MM분 SS초
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}

  /**
   * 초를 분/초 로 바꿔주는 함수
   */
  function convertSecondsToMinutesAndSeconds(seconds:string) {
    const minutes = Math.floor(parseInt(seconds) / 60); // 분 계산
    const remainingSeconds = parseInt(seconds) % 60; // 초 계산

    // 결과를 mm분 ss초 형식으로 반환
    return `${minutes.toString().padStart(2, '0')}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
}



const ReportpageComponent = ({data}: ReportpageProps) => {        
    const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0']);
    // 총학습시간, 졸은시간 + 자리비운시간, 순공시간
    console.log('=====report======');
    console.dir(data);
    console.dir(studyTime);
    console.log('=====report======');
    return (
    <ReportStudentBackground>
        <ReportStudentTitle> 000님의 운영체제 레포트</ReportStudentTitle>
        <div className="section">
            <div id="lectureTimeInfo">
            <ReportStudentSubTitle>공부 시작 시간 : {formatUTCDateTime(data.reports.studyStartTime)}</ReportStudentSubTitle>
            <ReportStudentSubTitle>공부 종료 시간 : {formatUTCDateTime(data.reports.studyEndTime)}</ReportStudentSubTitle>
            </div>
        </div>
        <div className="section" id="dashBoards">
            <div className="dashBoard">
                <div className="dashBoardTitle">학습시간</div>
                <div className="dashBoardDesc">{convertSecondsToMinutesAndSeconds(studyTime[0])}</div>
            </div>
            <div className="dashBoard">
                <div className="dashBoardTitle">버린시간</div>
                <div className="dashBoardDesc">{convertSecondsToMinutesAndSeconds(studyTime[1])}</div>
            </div>
            <div className="dashBoard">
                <div className="dashBoardTitle">순공시간</div>
                <div className="dashBoardDesc">{convertSecondsToMinutesAndSeconds(studyTime[2])}</div>
            </div>
        </div>
        <div className="section white" id="graphs">
            <div className="graph" id="barGraph">
                <div id="labelBox">
                    <div className="label">
                        <div className="colorBox" id="greenColor"></div>
                        <div className="colorDesc">자리비움</div>
                    </div>
                    <div className="label">
                        <div className="colorBox" id="pinkColor"></div>
                        <div className="colorDesc">졸음</div>
                    </div>
                  
                </div>
            <LineChartSize>
                <LineChart response = {data.reports}/>
            </LineChartSize>

            </div>
            <div className="graph" id="circleGraph">
                <PieChart response={data.reports} setstudyTime={setStudyTime} />
            </div>
        </div>
        
        {data.reports.quizzes.length > 0 && (
            <div className="section white" id="quizSection">
                {/* 문제 다시보기 */}
                <ReportQuestionInfoComponent quizzes={data.reports.quizzes} />
            </div>
            )}
            {data.gptSummery && data.gptSummery.summary.length > 0 && (
            <div className="section white" id="aiSection">
                {/* AI 키워드 */}
                <ReportApplicationQuestion gptSummery={data.gptSummery.summary} />
            </div>
              )}

      

        



     

        {/* <PieChartSize>
            <div id="chart">
                <PieChart response={data.reports} setstudyTime={setStudyTime} />
            </div>
        </PieChartSize>
        <ReportTextContainer>
                <ReportQuestionInfoComponent quizzes={data.reports.quizzes}/>
                <ReportApplicationQuestion gptSummery={data.gptSummery.summary} />
        </ReportTextContainer> */}
    </ReportStudentBackground>
)} 


const ReportStudentBackground = styled.div`
    width: 100%;
    margin : 10px;
    border-radius: 20px;
    background: transparent;
    overflow-y: auto;
    /* border: 1px solid red; */

    #lectureTimeInfo{
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
        width: 26%;
        justify-content: space-around;
        /* background: linear-gradient(to bottom, #c5e9f6, #b3d9f2, #a1c9ee, #8fb9ea, #7da9e6); */
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    }
    
    .section{
        margin-bottom: 20px;
        padding: 20px 0;
    }

    .section.white{
        /* border: 1px solid red; */
        /* background-color: yellow; */

        background-color: white;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    #dashBoards{
        display: flex;
        justify-content: space-between;
        /* border: 1px solid red; */
    }

    .dashBoard{
        width: 300px;
        height: 200px;
        /* background: linear-gradient(to bottom, #c5e9f6, #b3d9f2, #a1c9ee, #8fb9ea, #7da9e6); */

        position: relative;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        

        >div{
            /* border: 1px solid red; */
        }
    }

    .dashBoard > .dashBoardTitle{
        font-size: x-large;
    }

    .dashBoard > .dashBoardDesc{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: xx-large;
    }

    /* 그래프 */
    #graphs{
        /* border: 1px solid red; */
        display: flex;
        justify-content: space-around;


    }

    .graph{
        flex: 1;
        /* background-color: white; */
    }

    #graphs > #barGraph{
        /* border: 1px solid red; */

    }
 
    #labelBox{
        /* border: 1px solid red; */
        display: flex;
        justify-content: center;
    }

    .label{
        /* border: 1px solid red; */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }

    .colorBox{
        width: 10px;
        height: 10px;
        margin-right: 10px;
    }

    #greenColor{
        background-color:rgb(75, 192, 192);
    }

    #pinkColor{
        background-color: rgb(255, 99, 132);
    }



    #graphs > #circleGraph{
        display: flex;
        justify-content: center;
        /* border: 1px solid black; */
        height: 265px;
    }

    #quizSection{
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        background-color: white;
        border-radius: 20px;
        padding: 20px;

    }

    #aiSection{
        padding: 20px;
    }

`;



const ReportStudentSubTitle = styled.div`
    font-size: medium;
    font-weight: lighter;
    

`;





const ReportStudentTitle = styled.div`
    font-weight: bold; 
    font-size : xx-large;
    display: flex;

`;

const LineChartSize = styled.div`
  width:100%;
`;






const PieText = styled.div`
    font-size: larger;
    margin:30px;
    flex-direction: column;
    align-items: center;
    width : 100%;

`;

const PieTextComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    margin: 50px;
    background-color: white;
    border-radius: 5px;
    height : 40px;
    font-size: 1.0em;
`;
export default ReportpageComponent;