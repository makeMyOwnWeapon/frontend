import React, { useState } from "react";
import styled from "styled-components";
import LineChart from "./report_line";
import PieChart from "./report_pie";
import ReportQuestionInfoComponent from "./report_question_review";
import ReportApplicationQuestion from "./report_application_question";
import { Data } from "../reportList/reportInterface";
                
interface ReportpageProps {
    data: Data;
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



const ReportpageComponent = ({data}: ReportpageProps) => {        
    const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0', '0']);
    
    return (
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
                    <PieTextComponent>
                        자리 비운 시간: {studyTime[0]}분 {studyTime[3]}초
                    </PieTextComponent>
                    <PieTextComponent>
                        졸은  시간: {studyTime[1]}분 {studyTime[4]}초
                    </PieTextComponent>
                    <PieTextComponent>
                        총 공부 시간: {studyTime[2]}분 {studyTime[5]}초
                    </PieTextComponent>
                </PieText>
            </div>
        </PieChartSize>
        <ReportTextContainer>
                <ReportQuestionInfoComponent quizzes={data.readHistoryReport.quizzes}/>
                <ReportApplicationQuestion gptSummery={data.gptSummery.summary} />
        </ReportTextContainer>
    </ReportStudentBackground>
)} 


const ReportTextContainer = styled.div`

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

const ReportStudentSubTitle = styled.div`
    margin: 50px;
    font-size: 2em;

`;

const PieText = styled.div`
    font-size: 1.5em;
    margin:30px;
    flex-direction: column;
    align-items: center;
    width : 100%;

`;
export default ReportpageComponent;