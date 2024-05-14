import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import WorkBook from './pages/quizSet';
import Create from './pages/quizSetCreate';
import Question_info from './pages/quizSetDetail';
import NotFoundPage from './pages/404page';
import RequireAuth from './helpers/requireauth'
import ReportStudentFroExtention from './pages/reportstudentforextention';
import ReportList from './pages/reportList';
import ReportDetail from './pages/reportDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<RequireAuth><WorkBook/></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><Create/></RequireAuth>}/>
        <Route path="/question_info/:quizSetId" element={<RequireAuth><Question_info/></RequireAuth>}/>
        <Route path="/reportlist" element={<RequireAuth><ReportList/></RequireAuth>}/>
        <Route path="/reportDetail/:lectureHistoryId" element={<ReportDetail/>}/>
        <Route path="/reportstudentforextension/:lectureHistoryId" element={<ReportStudentFroExtention/>}/>
        <Route path="/404page" element={<RequireAuth><NotFoundPage/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
