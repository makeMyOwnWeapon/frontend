import React from 'react';
import { NavBarContainer , NavLink } from '../../styles/Public';

const NavBar_main_jsx = () => {
  return (
    <NavBarContainer>
      <NavLink href="/main">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/services">Services</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </NavBarContainer>
  );
};

export default NavBar_main_jsx;