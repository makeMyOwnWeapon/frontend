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

export const PageContainer = styled.div`
  height: 100vh;
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
export const UpPadding = styled.div`
height:300px;
  padding-left: 500000px; /* 좌측 패딩 */
  padding-right: 50000px; /* 우측 패딩 */
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


export const Title_text = styled.div`
  margin-top: 10px;
  padding: 100px;
  font-size: 24px;  /* 글꼴 크기 증가 */
  color: #333;      /* 글꼴 색상 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

export const SidebarContainer = styled.div`
  width: 250px;
  height: auto;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-top: 20px; // 상단에 붙임
`;

export const Option = styled.div`
  padding: 10px 15px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ddd;
  }
`;

export const ListContainer = styled.div`
  margin: 20px;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
`;

// 스타일링된 리스트 아이템
export const ListItem = styled.div`
  padding: 8px 12px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e2e2e2;
  }
`;

export const MainImage = styled.img<{ width?: string; left?: string; top?: string }>`
  width: ${props => props.width || '100%'};
  position: relative;
  left: ${props => props.left || '0'};
  top: ${props => props.top || '0'};
`;

export const LoginButton = styled.button<{ left?: string; top?: string }>`
  display: flex; 
  position: relative;
  left: ${props => props.left || '0px'}; // 왼쪽 여백
  top: ${props => props.top || '0px'}; // 상단 여백
  border: none;
  background: transparent;

  }
`;

