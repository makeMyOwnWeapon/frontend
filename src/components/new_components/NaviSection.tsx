import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Styled-components에서 사용할 키프레임 애니메이션 정의
const gradientAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled-components를 사용하여 스타일을 정의한 NavSection 컴포넌트
const NavSectionWrapper = styled.div`
  /* border: 15px solid red; */
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
  height: 15%;
  box-sizing: border-box;

  .navbar {
    width: 6rem;
    height: 6rem;
    background: linear-gradient(120deg, #9b59b6, #3498db);
    border-radius: 50%;
    transition: width 0.5s, border-radius 0.5s;
    animation: ${gradientAnimation} 1.5s linear infinite;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

    &:hover {
      width: 400px;
      border-radius: 50px;
      animation: none;
      transition: width 0.5s, border-radius 0.5s;
    }

    &:hover div {
      opacity: 1;
      animation: none;
    }

    &:hover .menus {
      opacity: 1;
      transition: 0.5s;
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
    flex: 1;
  }

  #logo_img > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  #logo_title {
    flex: 1;
    font-weight: bold;
    background: linear-gradient(120deg, #9b59b6, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
    color: white;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;

    &:hover {
      background-color: #3498db;
    }
  }
`;

// NaviSection 컴포넌트 정의
const NaviSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path:any) => {
    navigate(path);
  };
  return (
    <NavSectionWrapper>
      <div id="logo_box" onClick={() => handleNavigation("/")}>
        <div id="logo_img">
          <img src="loa.png" alt="" />
        </div>
        <div id="logo_title">
          <h1>LOA</h1>
        </div>
      </div>
      <div className="navbar">
        <div className="menus">
          <div className="menu" onClick={() => handleNavigation("/workbook")}>문제집 조회</div>
          <div className="menu" onClick={() => handleNavigation("/create")}>문제집 만들기</div>
          <div className="menu" onClick={() => handleNavigation("/video")}>영상촬영</div>
          <div className="menu" onClick={() => handleNavigation("/reportlist")}>레포트 조회</div>
        </div>
      </div>
    </NavSectionWrapper>
  );
}

export default NaviSection;
