import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import WorkBook from './pages/workbook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<WorkBook/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
