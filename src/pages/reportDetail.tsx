import React, { useEffect, useState, Suspense } from "react";
import styled from "styled-components";
import Container from "../styles/publicStyleComponents/Container";
import "../styles/publicStyleComponents/Public";
import Main from "../styles/publicStyleComponents/Main";
import { request } from "../helpers/axios_helper";
import { useParams } from "react-router-dom";
import { Data } from "../components/reportList/reportInterface";

const BackgroundAnimation = React.lazy(() => import("../components/public/BackgroundAnimation"));
const NaviSection = React.lazy(() => import("../components/public/NaviSection"));
const ReportpageComponent = React.lazy(() => import("../components/report/report_reportpage_component"));

interface ReportDetailProps {
  isLoggedIn: boolean;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ isLoggedIn }) => {
  const { lectureHistoryId } = useParams();

  const [data, setData] = useState<Data | undefined>();
  const currentMenuName = '레포트 상세조회';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request('GET', '/api/history?lectureHistoryId=' + lectureHistoryId);
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [lectureHistoryId]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundAnimation>
          <Container>
            <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn} />
            <InnerContentSection>
              <Main>
                {data && <ReportpageComponent data={data} />}
              </Main>
            </InnerContentSection>
          </Container>
        </BackgroundAnimation>
      </Suspense>
    </>
  );
};

export default ReportDetail;

const InnerContentSection = styled.div`
  display: flex;
  height: 85%;
`;
