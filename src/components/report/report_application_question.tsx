import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';

interface gptSummery {
    gptSummery: summary[];
  }

  interface summary{
    keyword:string;
  }

const ReportRecommand = ({gptSummery}:gptSummery)=> {

    const [data, setData] = useState<summary[]>();
    useEffect(()=>{
    setData(gptSummery);
    },[gptSummery])


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
    font-weight: bold; 
    font-size: 2rem;
`;

const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  flex-direction:column;
`;

const SummaryText = styled.div`

`;

const SolveAnalyzeContainer = styled.div`
  font-size: 1.5rem;
`;