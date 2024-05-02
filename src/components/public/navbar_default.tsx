import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
    <div className="nav-bar-container">
      <a href="" onClick={e => { e.preventDefault(); goHome(); }}>Home</a>
      <a href="" onClick={e => { e.preventDefault(); startNavigate("workbook"); }}>Workbook</a>
      <a href="" onClick={e => { e.preventDefault(); startNavigate("create"); }}>Create</a>
      <a href="" onClick={e => { e.preventDefault(); startNavigate("video"); }}>Videography</a>
      <a href="" onClick={e => { e.preventDefault(); handleLogout(); }}>Logout</a>
    </div>
  );
};

export default NavBar;