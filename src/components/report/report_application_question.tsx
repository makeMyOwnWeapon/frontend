import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';

interface Summary {
    keyword: string;
    comment: string;
}

interface GptSummaryProps {
    gptSummary: Summary[];
}

const ReportRecommand = ({ gptSummary }: GptSummaryProps) => {
    const [data, setData] = useState<Summary[]>([]);
    
    useEffect(() => {
        setData(gptSummary);
    }, [gptSummary]);

    return (
        <div>
            <ApplicationQuestionTitle>AI 추천 키워드</ApplicationQuestionTitle>
            <Summary>
                {data && data.map((summary, index) => (
                    <SummaryText key={index}>
                        <KeywordTitle>{index + 1}. {summary.keyword}</KeywordTitle>
                        <KeywordComment>{summary.comment}</KeywordComment>
                    </SummaryText>
                ))}
            </Summary>
        </div>
    );
};

export default ReportRecommand;

const ApplicationQuestionTitle = styled.div`
    padding-left: 10px;
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
    flex-direction: column;
`;

const SummaryText = styled.div`
    margin-bottom: 10px;
`;

const KeywordTitle = styled.div`
    font-weight: bold;
    font-size: 1.7rem;
`;

const KeywordComment = styled.div`
    font-size: 1.5rem;
    margin-left: 20px;
`;
