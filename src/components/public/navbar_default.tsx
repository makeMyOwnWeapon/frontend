import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const NavBar: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const handleLogout = () => {
    removeCookie('jwt');
    navigate("/");
  };
  const navigate = useNavigate();
  const goHome = ()=>{
    navigate('/');

  }
  const startNavigate = (location:string) => {
    const token = cookies.jwt;
    if (!token) {
        alert('로그인 해 주세요!')
        navigate('/');
        return;
    }

    navigate(`/${location}`);
  }
  

  return (
    <NavBarContainer>
      <NavLink href="" onClick={goHome}>Home</NavLink>
      <NavLink href="" onClick={()=>startNavigate("workbook")}>Workbook</NavLink>
      <NavLink href="" onClick={()=>startNavigate("create")}>Create</NavLink>
      <NavLink href="" onClick={()=>startNavigate("video")}>Videography</NavLink>
      <NavLink href="" onClick={handleLogout}>Logout</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;