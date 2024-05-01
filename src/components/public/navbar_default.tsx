import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';
import { useNavigate } from 'react-router-dom';

function deleteCookie(name:string){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const NavBar: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate("/");
  };
  const navigate = useNavigate();
  const goHome = ()=>{
    navigate('/');

  }
  const startNavigate = (location:string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert('로그인 해 주세요!')
        navigate('/');
        return;
    }

    navigate(`/${location}`);
  }
  

  return (
    <NavBarContainer>
      <NavLink href="" onClick={()=>goHome}>Home</NavLink>
      <NavLink href="" onClick={()=>startNavigate("workbook")}>workbook</NavLink>
      <NavLink href="" onClick={()=>startNavigate("create")}>Create</NavLink>
            <NavLink href="" onClick={()=>startNavigate("video")}>영상촬영</NavLink>
      <NavLink href="" onClick={handleLogout}>Logout</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;