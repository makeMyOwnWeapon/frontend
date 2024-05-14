import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const NavSectionWrapper = styled.div`

  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
  height: 15%;
  box-sizing: border-box;
  /* border: 1px solid red; */
  padding-top : 20px;


  .navbar {
    /* border: 1px solid red; */
    width: 200px;
    border-radius: 50px;
    height: 6rem;
    background: linear-gradient(270deg, #ACE1F4, #00C6FF, #0073E6);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    transition: width 0.5s, border-radius 0.5s, background-color 0.5s;

    &:hover {
      width: 400px;
      border-radius: 50px;
      background: skyblue;
      animation: none;
    }

    &:hover .menus {
      opacity: 1;
      transition: opacity 0.5s;
    }

    &:hover .current_menu {
      opacity: 0;
    }
  }

  #logo_box {
    position: absolute;
    left: 0;
    display: flex;
    width: 20%;
    height: 20%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  #logo_img {
    flex: 0.5;
  }

  #logo_img > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  #logo_title {
    flex: 1;
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
  }

  .menus {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  .menu {
    width: 100px;
    height: 50px;
    color: black;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    margin: 0 5px;
    transition: color 0.3s, background-color 0.3s, transform 0.3s;

    &:hover {
      color: white;
      font-weight: bold;
      background-color: #0073E6;
      transform: scale(1.1);
    }
  }

  .current_menu {
    position: absolute;
    opacity: 1;
    transition: opacity 0.5s;
  }

  @media (max-width: 768px) {
    #logo_box {
      width: 30%;
    }

    #logo_title {
      font-size: 1.2rem;
    }

    .navbar {
      width: 150px;

      &:hover {
        width: 350px;
      }
    }

    .menu {
      width: 80px;
      height: 40px;
      line-height: 40px;
      font-size: 0.9rem;
    }
  }
`;

const NaviSection = (path:any) => {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState('');

  const handleNavigation = (path:any) => {
    navigate(path);
  };

  return (
    <NavSectionWrapper>
      <div id="logo_box" onClick={() => handleNavigation("/")}>
        <div id="logo_img">
          <img src={`${process.env.PUBLIC_URL}/blueLoa.png`}></img>
        </div>
        <div id="logo_title">
          <h1>LOA</h1>
        </div>
      </div>

      <div className="navbar">
        <div className="current_menu">{path.currentMenuName}</div>
        <div className="menus">
          <div className="menu" onClick={() => handleNavigation("/workbook")}>문제집 조회</div>
          <div className="menu" onClick={() => handleNavigation("/create")}>문제집 만들기</div>
          <div className="menu" onClick={() => handleNavigation("/reportlist")}>레포트 조회</div>
        </div>
      </div>
    </NavSectionWrapper>
  );
};

export default NaviSection;
