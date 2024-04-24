import styled from 'styled-components';

const sizes = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};


export const MainContainer = styled.div`
height: 100vh;
background: linear-gradient(to bottom, white, lightblue);
display: flex;
flex-direction: column;

`;
// NavBar 컨테이너 스타일 정의
export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed; // 상단 고정
  top: 0;
  width: 100%;
  background: transparent; // 배경색 없음
  color: darkgray; // 글자색
  padding: 10px 0;
  z-index: 1000; // 다른 요소들 위에 위치
`;

// NavLink 스타일 정의
export const NavLink = styled.a`
  color: inherit; // 부모 컴포넌트의 색상 상속
  text-decoration: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
`;

export const NavBar = styled.nav`
display: flex;
align-items: center;
justify-content: center;
background: transparent; // 배경을 투명하게 설정
padding: 10px;
`;



export const Section = styled.section`
  flex: 1;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
`;