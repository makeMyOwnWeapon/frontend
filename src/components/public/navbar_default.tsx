import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';
import { useNavigate } from 'react-router-dom';

function deleteCookie(name:string){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const NavBar: React.FC = () => {

  const handleLogout = () => {
    deleteCookie('token'); // 'username'은 예시 쿠키 이름입니다.
    navigate("/");
  };
  const navigate = useNavigate();
  const startNavigate = (location:string) => {
    navigate(`/${location}`);
  }

  return (
    <NavBarContainer>
      <NavLink href="" onClick={()=>startNavigate("workbook")}>Home</NavLink>
      <NavLink href="" onClick={()=>startNavigate("workbook")}>about</NavLink>
      <NavLink href="" onClick={()=>startNavigate("create")}>Create</NavLink>
      <NavLink href="" onClick={handleLogout}>Logout</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;