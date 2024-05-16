import styled from 'styled-components';

export const PublicTextContainer = styled.div`

`;

export const PublicSliderContainer = styled.div`
position: relative;
width: 100%;
`;

export const PublicButton = styled.button`
  font-weight: 700;
  padding: 8px 16px;
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #000;
  background-color: #ebebeb; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #79ebed; 
    color: #000; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
`;

export const PublicCardContent = styled.div`
  padding: 0.5rem 0;
  cursor: pointer;
`;


export const PublicCardTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
`;

export const PublicCardDescription = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #4b5563;
`;

export const PublicQuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
`;