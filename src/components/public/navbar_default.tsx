import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <NavLink href="/workbook">Home</NavLink>
      <NavLink href="/about">문제집 만들기</NavLink>
      <NavLink href="/services">Services</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </NavBarContainer>
  );
};

export default NavBar;