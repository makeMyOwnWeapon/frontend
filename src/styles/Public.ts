import styled from 'styled-components';

// NavBar 컨테이너 스타일 정의
export const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed; // 상단 고정
  top: 0;
  width: 100%;
  background: #FFFFFF; // 배경색 없음
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

export const MainBackGround = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, white, lightblue);
  display: flex;
  flex-direction: column;
`;

export const PageBackGround = styled.div`
  height: 100vh;
  width: 100%;
  background: #F2F2F2;
  display: flex;
  flex-direction: row;
  justify-content: center; /* 세로 축 중앙 정렬 */
  align-items: center;     /* 가로 축 중앙 정렬 */
  flex-wrap: wrap;
`;

export const NavContainer = styled.div`
  height: 200px;
  background: #F2F2F2;
  display: flex;
  flex-direction: row;
  justify-content: start; /* 세로 축 중앙 정렬 */
  align-items: start;     /* 가로 축 중앙 정렬 */
  flex-wrap: wrap;
`;