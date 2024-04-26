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
  // align-items: center;     /* 가로 축 중앙 정렬 */
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

export const Content = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
`;

export const ImageWithShadow = styled.img`
  /* 그림자 효과를 적용합니다. */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 수평, 수직, 퍼짐 정도, 색상을 설정합니다. */
  border-radius: 8px; /* 이미지에 둥근 모서리를 만듭니다. */
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
position: relative;
`;
