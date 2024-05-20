import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LineChart from "./report_line";
import PieChart from "./report_pie";
import ReportQuestionInfoComponent from "./report_question_review";
import ReportApplicationQuestion from "./report_application_question";
import { Data } from "../reportList/reportInterface";

interface ReportpageProps {
  data: Data;
}

function formatUTCDateTime(utcDateTimeString: string) {
  const date = new Date(utcDateTimeString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
}

function convertSecondsToMinutesAndSeconds(seconds: string) {
  const minutes = Math.floor(parseInt(seconds) / 60);
  const remainingSeconds = parseInt(seconds) % 60;
  return `${minutes.toString().padStart(2, '0')}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
}

const ReportpageComponent = ({ data }: ReportpageProps) => {
  const [studyTime, setStudyTime] = useState<string[]>(['0', '0', '0']);

  useEffect(() => {
    // 계산 로직 추가
    const totalStudyTime = (new Date(data.reports.studyEndTime).getTime() - new Date(data.reports.studyStartTime).getTime()) / 1000;
    const distractionTime = data.reports.sleepinessAndDistraction.reduce((acc, cur) => {
      const distractionDuration = (cur.distractionEnd ? new Date(cur.distractionEnd).getTime() : 0) - (cur.distractionStart ? new Date(cur.distractionStart).getTime() : 0);
      const sleepinessDuration = (cur.sleepinessEnd ? new Date(cur.sleepinessEnd).getTime() : 0) - (cur.sleepinessStart ? new Date(cur.sleepinessStart).getTime() : 0);
      return acc + (distractionDuration + sleepinessDuration) / 1000;
    }, 0);

    const effectiveStudyTime = totalStudyTime - distractionTime;
    setStudyTime([
      totalStudyTime.toString(),
      distractionTime.toString(),
      effectiveStudyTime.toString()
    ]);
  }, [data]);

  return (
    <ReportStudentBackground>
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
              <div className="colorBox" id="pinkColor"></div>
              <div className="colorDesc">졸은 시간</div>
            </div>
            <div className="label">
              <div className="colorBox" id="greenColor"></div>
              <div className="colorDesc">자리 비움</div>
            </div>
          </div>
          <LincharContainer>
            <LineChartSize>
              <LineChart response={data.reports} />
            </LineChartSize>
          </LincharContainer>
        </div>
        <div className="graph" id="circleGraph">
          <PieChart response={data.reports} setstudyTime={setStudyTime} />
        </div>
      </div>
      {data.reports.quizzes.length > 0 && (
        <div className="section white" id="quizSection">
          <ReportQuestionInfoComponent quizzes={data.reports.quizzes} />
        </div>
      )}
      {data.gptSummary && data.gptSummary.summary.length > 0 && (
        <div className="section white" id="aiSection">
          <ReportApplicationQuestion gptSummary={data.gptSummary.summary} />
        </div>
      )}
    </ReportStudentBackground>
  );
};

const ReportStudentBackground = styled.div`
  width: 100%;
  margin: 10px;
  background: transparent;
  overflow-y: auto;

  #lectureTimeInfo {
    display: flex;
    flex-direction: column;
    border: 4px solid #0076B8;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
  
  .section {
    
    margin-bottom: 20px;
    padding: 20px 0;
  }

  .section.white {
    background-color: white;
    border-radius: 20px;
    border: 4px solid #0076B8;
  }

  #dashBoards {
    display: flex;
    justify-content: space-between;
  }

  .dashBoard {
    width: 300px;
    height: 200px;
    position: relative;
    background-color: white;
    border-radius: 20px;
    border: 4px solid #0076B8;
    padding: 20px;

    > div {
    }
  }

  .dashBoard > .dashBoardTitle {
    font-size: 1.8rem;
  }

  .dashBoard > .dashBoardDesc {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
  }

  #graphs {
    display: flex;
    justify-content: space-around;
  }

  .graph {
    flex: 1;
  }

  #labelBox {
    font-size: 20px;
    color: #4e4e4e;
    display: flex;
    justify-content: center;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  .colorBox {
    width: 10px;
    height: 10px;
    margin-right: 10px;
  }

  #greenColor {
    background-color: rgb(75, 192, 192);
  }

  #pinkColor {
    background-color: rgb(255, 99, 132);
  }

  #circleGraph {
    display: flex;
    justify-content: center;
    height: 265px;
  }

  #quizSection {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 20px;
    padding: 20px;
  }

  #aiSection {
    padding: 20px;
  }
`;

const ReportStudentSubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: lighter;
`;

const LineChartSize = styled.div`
  width: 100%;
`;

const LincharContainer = styled.div`
  margin-top: 10%;
  margin-left: 15%;
`;
export default ReportpageComponent;
