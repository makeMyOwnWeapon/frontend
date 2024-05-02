import styled from 'styled-components';

export const MainImage = styled.img<{ width?: string; left?: string; top?: string }>`
  width: ${props => props.width || '100%'};
  position: relative;
  left: ${props => props.left || '0'};
  top: ${props => props.top || '0'};
`;

export const LoginButton = styled.button<{ left?: string; top?: string }>`
  position:fixed;
  top: 30%;
  left: 70%;
  top: 50%;
  border: none;
  background: transparent;
  }
`;