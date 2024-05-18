import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import CreateForExtension from './pages/questSetCreateForExtension';
import { getAuthToken } from './helpers/axios_helper';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<RequireAuth><WorkBook isLoggedIn={isLoggedIn} /></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><Create isLoggedIn={isLoggedIn} /></RequireAuth>} />
        <Route path="/createforextension" element={<CreateForExtension />} />
        <Route path="/question_info/:quizSetId" element={<RequireAuth><Question_info isLoggedIn={isLoggedIn} /></RequireAuth>} />
        <Route path="/reportlist" element={<RequireAuth><ReportList isLoggedIn={isLoggedIn} /></RequireAuth>} />
        <Route path="/reportDetail/:lectureHistoryId" element={<ReportDetail isLoggedIn={isLoggedIn} />} />
        <Route path="/reportstudentforextension/:lectureHistoryId" element={<ReportStudentFroExtention />} />
        <Route path="/aicreate" element={<AiCreateLoading />} />
        <Route path="/introduce" element={<Introduce isLoggedIn={isLoggedIn} />} />
        <Route path="/404page" element={<NotFoundPage isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<Navigate to="/404page" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
