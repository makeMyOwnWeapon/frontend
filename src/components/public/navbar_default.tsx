import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';

function deleteCookie(name:string){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const NavBar: React.FC = () => {

  const handleLogout = () => {
    deleteCookie('token'); // 'username'은 예시 쿠키 이름입니다.
  };

  return (
    <NavBarContainer>
      <NavLink href="/workbook">Home</NavLink>
      <NavLink href="/about">문제집 만들기</NavLink>
      <NavLink href="/services">Services</NavLink>
      <NavLink href="/" onClick={handleLogout}>로그아웃</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;