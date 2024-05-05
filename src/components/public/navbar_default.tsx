import React from 'react';
import { NavBarContainer, NavLink } from '../../styles/Public';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/main');
  }

  return (
    <NavBarContainer>
      <NavLink href="" onClick={goHome}>Home</NavLink>
      <NavLink href="" onClick={() => navigate("/workbook")}>Workbook</NavLink>
      <NavLink href="" onClick={() => navigate("/create")}>Create</NavLink>
      <NavLink href="" onClick={() => navigate("/video")}>Video</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;