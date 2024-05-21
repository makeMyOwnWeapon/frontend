import React, { useEffect, useState, Suspense } from "react";
import styled from "styled-components";
import Container from "../styles/publicStyleComponents/Container";
import "../styles/publicStyleComponents/Public";
import { useParams } from "react-router-dom";
import { Data } from "../components/reportList/reportInterface";
import { bodyRequest } from "../helpers/axios_helper";

const BackgroundAnimation = React.lazy(() => import("../components/public/BackgroundAnimation"));
const ReportpageComponent = React.lazy(() => import("../components/report/report_reportpage_component"));
const AiReportCreateLoading = React.lazy(() => import("../components/report/report_AiCreateLoading"));

const ReportStudentFroExtension = () => {
    const { lectureHistoryId } = useParams();
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bodyRequest('GET', `/api/history/extension/?lectureHistoryId=${lectureHistoryId}`, {});
                setTimeout(() => {
                    setData(response.data);
                }, 5000); // 5초 레이턴시를 만드는 함수
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [lectureHistoryId]);

    if (!data) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <AiReportCreateLoading />
            </Suspense>
        );
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <BackgroundAnimation>
                    <Container>
                        <InnerContentSection>
                            <ReportpageComponent data={data} />
                        </InnerContentSection>
                    </Container>
                </BackgroundAnimation>
            </Suspense>
        </>
    );
};

export default ReportStudentFroExtension;

const InnerContentSection = styled.div`
  display: flex;
  height: 100vh;

  > div {
    /* border: 1px solid black; */
  }

  #main {
    width: 85%;
    overflow-y: auto;
    flex-wrap: wrap;
    display: flex;
    height: 100%;
    justify-content: space-evenly;
  }
`;
