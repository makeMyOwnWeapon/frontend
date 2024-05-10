import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import WorkBook from './pages/workbook';
import Create from './pages/create_question';
import Question_info from './pages/question_info';
import VideoComponent from './pages/video';
import ReportList from './pages/reportlist';
import ReportStudent from './pages/reportstudent';
import ReportTeacher from './pages/reportteacher';
import Inquiry from './pages/404page';
import BackgroundAnimation from './styles/Background';
import RequireAuth from './helpers/requireauth'
import ReportStudentFroExtention from './pages/reportstudentforextention';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<RequireAuth><WorkBook/></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><Create/></RequireAuth>}/>
        <Route path="/question_info/:quizSetId" element={<RequireAuth><Question_info/></RequireAuth>}/>
        <Route path="/video" element={<VideoComponent/>}/>
        <Route path="/reportlist" element={<RequireAuth><ReportList/></RequireAuth>}/>
        <Route path="/reportstudent/" element={<ReportStudent/>}/>
        <Route path="/reportstudentforextention/:subLectureId/:lectureHistoryId" element={<ReportStudentFroExtention/>}/>
        <Route path="/reportteacher" element={<RequireAuth><ReportTeacher/></RequireAuth>}/>
        <Route path="/inquiry" element={<RequireAuth><Inquiry/></RequireAuth>}/>
        <Route path="/background" element={<BackgroundAnimation/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
