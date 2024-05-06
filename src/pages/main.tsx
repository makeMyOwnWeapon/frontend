import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Account from '../components/main/account'
import image from "../images/loa2.png";
import "../styles/Public"
import BackgroundAnimation from "../styles/BackgroundAnimation"



const Main: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path); 
  };

  return (
    <BackgroundAnimation>
      <Container>
      <NavSection>
          <div id="logo_box">
            <div id="logo_img"><img src="loa.png" alt="" /></div>
            <div id="logo_title"><h1>LOA</h1></div>
          </div>
          <div className="navbar">
            <div className="menus">
              <div className="menu" onClick={() => navigate("/workbook")}>문제집 조회</div>
              <div className="menu" onClick={() => navigate("/workbook")}>문제집 만들기</div>
              <div className="menu" onClick={() => navigate("/workbook")}>영상촬영</div>
              <div className="menu" onClick={() => navigate("/workbook")}>레포트 조회</div>
            </div>
          </div>
          
      </NavSection>
        <ContentSection>
            <InnerContent>
              <div id="title">Learn On Air</div>
              <div>
                <div id="info">
                  <Account/>
                <InfoButton onClick={() => navigateTo("/info")}>
                  Info for New Users
                </InfoButton>
                  
                </div>
              </div>
            </InnerContent>
          </ContentSection>        

      </Container>
   </BackgroundAnimation>
  );
};

export default Main;

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

const Container = styled.div`


  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 10px solid purple;

`;

const NavSection = styled.div`
  border: 1px solid red;
  justify-content: center;
  display: flex;
  align-items: center;
  flex: 1;
  .navbar {
    width: 6rem;
    height: 6rem;
    background: linear-gradient(120deg, #9b59b6, #3498db);
    border-radius: 50%;
    transition: width 0.5s, border-radius 0.5s; /* 트랜지션 추가 */
    animation: ${gradientAnimation} 1.5s linear infinite;
    cursor: pointer;

    // 하위 메뉴 정렬
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

    &:hover {
      width: 400px;
      border-radius: 50px;
      animation: none;
      transition: width 0.5s, border-radius 0.5s; /* 트랜지션 추가 */
    }

    &:hover div{
      opacity: 1;
      animation: none;
    }

    &:hover .menus{
      opacity: 1;
      transition: 0.5s;
    }

   
  }

  #logo_box{
      /* border: 1px solid black; */
      position: absolute;
      left: 0;
      display: flex;
      width: 20%;
      height: 20%;
      justify-content: space-between;
      align-items: center;
      > div{
        /* border: 1px solid black; */
      }
    }

  #logo_img{
    flex: 1;  
  }

  #logo_img > img{
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  #logo_title{
    flex: 1;
    
  }




  .menus {

    /* border: 1px solid black; */
    display: flex;
    align-items: center;
    justify-content: center ;
    opacity: 0;

  }

  .menu{
    width: 100px;
    height: 50px;
    color: white;
    line-height: 50px;

    /* border: 1px solid black; */
    text-align: center;
    border-radius : 10px;

    &:hover{
      background-color: #3498db;
    }
  }
`;


const ContentSection = styled.div`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  border: 5px solid red;
  flex: 5;
`;

const InnerContent = styled.div`
  border: 3px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  > div{
    /* border: 1px solid black; */
  }

  #title{
    font-weight: bold;
    font-size: 5rem;
    margin-top: 100px;
    height: 200px;
    line-height: 200px;   
  }

  #account{
    border: 1px solid red;
  }
  #accoutn > #signInDiv{
    height: 100;
  }

  #info{

    border: 10px solid black;
    display: flex;
    justify-content:space-evenly;
    flex-direction: column;
    width: 500px;
    height: 300px;


  }  
`;

const InfoButton = styled.div`
  padding: 30px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  

  &:hover {
    background-color: #2980b9;
  }
`;
