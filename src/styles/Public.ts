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
  background: linear-gradient(to bottom, white, #55CCCA);
  display: flex;
  flex-direction: column;
  bottom: 0px;
`;

export const PageBackGround = styled.div`
  height: auto;
  width: 100%;
  background: #F2F2F2;
  display: flex;
  // flex-direction: row;
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 섀딩 추가 */
`;

export const Content = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
   margin-left: 400px; /* 왼쪽에 고정된 컴포넌트의 너비에 맞춰 조정 */
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
  background-color: #FFFFFF; // 배경색은 원하는 대로 조정 가능
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
`;
