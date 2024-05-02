import React from 'react';

const NavBar_main: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px', backgroundColor: '#333' }}>
      <a href="/main" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Home</a>
      <a href="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>About</a>
      <a href="/services" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Services</a>
      <a href="/contact" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Contact</a>
    </div>
  );
};

export default NavBar_main;
