import styled from 'styled-components';

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