import React, { useEffect, useState } from "react";
import { Form, QuestionContainer } from '../../styles/CreateQuestion';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/fad.css';
import Slider from "react-slick";
import { Question } from "../../styles/QuestionInfo";


interface gptSummery {
    gptSummery: summary[];
  }

  interface summary{
    reviews:string;
  }

const ReportRecommand = ({gptSummery}:gptSummery)=> {

    const [data, setData] = useState<summary[]>();
    
    useEffect(()=>{
    setData(gptSummery);
    
    },[gptSummery])


    return (
        <Form>
            
            <SolveAnalyzeContainer>
                <ApplicationQuestionTitle>추천 키워드</ApplicationQuestionTitle>
                    <Summary>
                        {data&&data.map((summary,index)=>(
                            <SummaryText key={index}>
                                <TextContainer>- {summary.reviews}</TextContainer> 
                            </SummaryText>
                        ))}


                    </Summary>

            </SolveAnalyzeContainer>
        </Form>
    );
};

export default ReportRecommand;

const ApplicationQuestionTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold; 
`;

const Summary = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc; /* 테두리 스타일 지정 */
  border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
  padding: 10px; /* 내부 여백 추가 */
  margin: 10px; /* 외부 패딩 추가 */
  flex-direction:column;
  min-height: 400px;
`;

const TextContainer = styled.div`
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
    margin-top: 100px;
    position: relative;
    width: 100%
`;