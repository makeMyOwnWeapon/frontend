import styled from 'styled-components';


export const Content = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
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

