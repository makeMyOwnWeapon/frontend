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
import Inquiry from './pages/inquiry';
import BackgroundAnimation from './styles/BackgroundAnimation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<WorkBook/>} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/question_info/:quizSetId" element={<Question_info/>}/>
        <Route path="/video" element={<VideoComponent/>}/>
        <Route path="/reportlist" element={<ReportList/>}/>
        <Route path="/reportstudent" element={<ReportStudent/>}/>
        <Route path="/reportteacher" element={<ReportTeacher/>}/>
        <Route path="/inquiry" element={<Inquiry/>}/>
        <Route path="/background" element={<BackgroundAnimation/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
