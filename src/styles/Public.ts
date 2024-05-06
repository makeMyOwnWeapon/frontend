import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
;
`

export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  width: 100%;
  background: #FFFFFF;
  color: darkgray;
  padding: 10px 0;
  z-index: 1000;
`;

export const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

export const MainBackGround = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, white, #55CCCA);
  display: flex;
  flex-direction: column;
  bottom: 0px;
`;

export const PageBackGround = styled.div`
  background-color: #f2f2f2;
  display: flex;
`;

export const NavContainer = styled.div`
  height: 70px;
  background: #F2F2F2;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
/* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;  padding-left: 300px;
  height: 100%;

`;

export const ImageWithShadow = styled.img`
  /* border: 1px solid red; */
  object-fit: cover;
`;

export const TextContainer = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  color: #212529;
  font-size: 16px;
  line-height: 1.5;
`;

export const ListContainer = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  color: #212529;
  font-size: 16px;
  line-height: 1.5;
`;

export const SliderContainer = styled.div`
margin-top: 100px;
position: relative;
width: 100%

`;


export const NameGeneratorButton = styled.button`
padding: 8px 16px;
margin-right: 8px;
margin-top:8px;
margin-bottom:8px;
color: #000;
border: none;
border-radius: 4px;
cursor: pointer;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 20px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
  }
`;

export const PageFooter = styled.footer`
  width: 100%;
  border: 1px solid #dee2e6;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
`;
