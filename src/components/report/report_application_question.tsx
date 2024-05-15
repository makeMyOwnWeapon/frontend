import React, { useEffect, useState } from "react";
import { Form } from '../../styles/CreateQuestion';
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
                <ApplicationQuestionTitle>AI 키워드</ApplicationQuestionTitle>
                    <Summary>
                        {data&&data.map((summary,index)=>(
                            <SummaryText key={index}>
                                <PublicTextContainer>- {summary.keyword}</PublicTextContainer> 
                            </SummaryText>
                        ))}
                    </Summary>
            </SolveAnalyzeContainer>
        </div>
    );
};

export default ReportRecommand;

const ApplicationQuestionTitle = styled.div`
    font-size: x-large;
    font-weight: bold; 
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
  min-height: 400px;
`;

const PublicTextContainer = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  color: #212529;
  font-size: 16px;
  line-height: 1.5;
`;

const SummaryText = styled.div`

`;

const SolveAnalyzeContainer = styled.div`

`;