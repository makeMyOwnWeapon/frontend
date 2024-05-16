import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import WorkBook from './pages/quizSet';
import Create from './pages/quizSetCreate';
import Question_info from './pages/quizSetDetail';
import NotFoundPage from './pages/404page';
import RequireAuth from './helpers/requireauth';
import ReportStudentFroExtention from './pages/reportstudentforextention';
import ReportDetail from './pages/reportDetail';
import ReportList from './pages/reportlist';
import Introduce from './pages/introduce';
import AiCreateLoading from './components/report/report_AiCreateLoading';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<RequireAuth><WorkBook /></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><Create /></RequireAuth>} />
        <Route path="/question_info/:quizSetId" element={<RequireAuth><Question_info /></RequireAuth>} />
        <Route path="/reportlist" element={<RequireAuth><ReportList /></RequireAuth>} />
        <Route path="/reportDetail/:lectureHistoryId" element={<ReportDetail />} />
        <Route path="/reportstudentforextension/:lectureHistoryId" element={<ReportStudentFroExtention />} />
        <Route path="/aicreate" element={<AiCreateLoading />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/404page" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
