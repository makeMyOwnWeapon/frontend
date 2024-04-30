import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';
import { useNavigate } from 'react-router-dom';

function deleteCookie(name:string){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const NavBar: React.FC = () => {

  const handleLogout = () => {
    deleteCookie('token'); // 'username'은 예시 쿠키 이름입니다.
  };
  const navigate = useNavigate();
  const goToCreateQuestion = () => {
    navigate("/create");
  }
  const goToVideo = () => {
    navigate("/video");
  }

  return (
    <NavBarContainer>
      <NavLink href="/workbook">Home</NavLink>
      <NavLink href="/video" onClick={goToVideo}>영상촬영</NavLink>
      <NavLink href="/create" onClick={goToCreateQuestion}>문제집 만들기</NavLink>
      <NavLink href="/" onClick={handleLogout}>로그아웃</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;