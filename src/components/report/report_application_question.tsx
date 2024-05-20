import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';

interface gptSummary {
    gptSummary: summary[];
  }

  interface summary{
    keyword:string;
  }

const ReportRecommand = ({gptSummary}:gptSummary)=> {

    const [data, setData] = useState<summary[]>();
    useEffect(()=>{
    setData(gptSummary);
    },[gptSummary])


    return (
        <div>
            <SolveAnalyzeContainer>
                <ApplicationQuestionTitle>AI 추천 키워드</ApplicationQuestionTitle>
                    <Summary>
                        {data&&data.map((summary,index)=>(
                            <SummaryText key={index}>
                                - {summary.keyword}
                            </SummaryText>
                        ))}
                    </Summary>
            </SolveAnalyzeContainer>
        </div>
    );
};

export default ReportRecommand;

const ApplicationQuestionTitle = styled.div`
    padding-left: 10px;
    font-weight: bold; 
    font-size: 2rem;
`;

const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  border: 2px solid #0076B8;
  padding: 22px;
  padding-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  flex-direction:column;
`;

const SummaryText = styled.div`
    
`;

const SolveAnalyzeContainer = styled.div`
  font-size: 1.5rem;
  
`;