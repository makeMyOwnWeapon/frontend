import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import ToastModal from "../../components/public/toastModal";

interface NaviSectionProps {
  currentMenuName: string;
  isLoggedIn: boolean;
}

const NaviSection: React.FC<NaviSectionProps> = ({ currentMenuName, isLoggedIn }) => {
  const navigate = useNavigate();
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const handleNavigation = (path: any) => {
    navigate(path);
  };

  const toggleMyPage = () => {
    setIsMyPageOpen(!isMyPageOpen);
  };

  return (
    <NavSectionWrapper>
      <div id="logo_box" onClick={() => handleNavigation("/")}>
        <div id="logo_img">
          <img src={`${process.env.PUBLIC_URL}/blueLoa.png`} alt="logo" />
        </div>
        <div id="logo_title">
          <LogoTitle>LOA</LogoTitle>
        </div>
      </div>
      <NavbarWrapper>
        <div className="navbar">
          <div className="menus">
            <div className="menu" onClick={() => handleNavigation("/workbook")}>문제집 조회</div>
            <div className="menu" onClick={() => handleNavigation("/create")}>문제집 만들기</div>
            <div className="menu" onClick={() => handleNavigation("/reportlist")}>레포트 조회</div>
          </div>
        </div>
        <CurrentMenu>{currentMenuName}</CurrentMenu>
      </NavbarWrapper>
      {isLoggedIn && (
        <>
          <MyPageButton onClick={toggleMyPage}>마이페이지</MyPageButton>
          <ToastModalWrapper isVisible={isMyPageOpen}>
            <ToastModal />
          </ToastModalWrapper>
        </>
      )}
    </NavSectionWrapper>
  );
};

export default NaviSection;

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
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 30px;
  height: 190px;

  #logo_box {
    position: absolute;
    top: 5px;
    left: 10px;
    display: flex;
    width: 10%;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  #logo_img {
    flex: 0.5;
    margin-left: 5px;
  }

  #logo_img > img {
    width: 100px;
    height: auto;
    object-fit: cover;
  }

  #logo_title {
    flex: 1;
  }

  @media (max-width: 768px) {
    #logo_box {
      width: 30%;
    }
  }
`;

const LogoTitle = styled.h1`
  color: white;
  font-size: 2.4rem;
  letter-spacing: 3px;
  text-shadow: 
    -2.3px -2.3px 0 #0082CB, 2.3px -2.3px 0 #0082CB, 
    -2.3px 2.3px 0 #0082CB, 2.3px 2.3px 0 #0082CB,
    2.3px 0px 0 #0082CB, 0px 2.3px 0 #0082CB, 
    -2.3px 0px 0 #0082CB, 0px -2.3px 0 #0082CB;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .navbar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(270deg, #ACE1F4, #00C6FF, #0073E6);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.5s, height 0.5s, border-radius 0.5s;

    &:hover {
      width: 600px;
      height: 105px;
      border-radius: 65px;
    }

    &:hover .menus {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;
      transition-delay: 0.2s;
    }

    .menus {
      display: flex;
      align-items: center;
      justify-content: space-between;
      opacity: 0;
      visibility: hidden;
      width: 100%;
    }

    .menu {
      width: 200px;
      height: 10px;
      color: black;
      line-height: 15px;
      text-align: center;
      border-radius: 10px;
      transition: color 0.3s, background-color 0.3s, transform 0.2s;
      font-size: 1.6rem;

      &:hover {
        color: white;
        font-weight: bold;
      }
    }

    @media (max-width: 768px) {
      width: 100px;
      height: 100px;

      &:hover {
        width: 300px;
        height: 120px;
        border-radius: 60px;
      }

      .menu {
        width: 100px;
        height: 40px;
        line-height: 40px;
        font-size: 1.1rem;
      }
    }
  }
`;

const CurrentMenu = styled.div`
  margin-top: 20px;
  font-size: 3.5rem;
  color: white;
  letter-spacing: 8.5px;
  text-shadow: 
    -4px -4px 0 #0082CB, 4px -4px 0 #0082CB, 
    -4px 4px 0 #0082CB, 4px 4px 0 #0082CB,
    4px 0px 0 #0082CB, 0px 4px 0 #0082CB, 
    -4px 0px 0 #0082CB, 0px -4px 0 #0082CB;
  transition: opacity 0.5s;
`;

const MyPageButton = styled.button`
  position: absolute;
  right: 50px;
  top: 30px;
  font-size: 22px;
  padding: 10px 17px;
  letter-spacing: 1px;
  background-color: #008fe1;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ToastModalWrapperProps {
  isVisible: boolean;
}

const ToastModalWrapper = styled.div<ToastModalWrapperProps>`
  position: absolute;
  right: 50px;
  top: 95px;
  box-shadow: 
    -6px -6px 0 #1daafc, 6px -6px 0 #1daafc, 
    -6px 6px 0 #1daafc, 6px 6px 0 #1daafc,
    6px 0px 0 #1daafc, 0px 6px 0 #1daafc, 
    -6px 0px 0 #1daafc, 0px -6px 0 #1daafc;
  background-color: rgba(244, 254, 254, 0.8);
  border: none;
  border-radius: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  z-index: 1000;

  ${({ isVisible }) =>
    isVisible &&
    `
      transform: translateY(0);
      opacity: 1;
    `}
`;
