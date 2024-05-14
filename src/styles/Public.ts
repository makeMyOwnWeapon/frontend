import styled from 'styled-components';



export const PublicTextContainer = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  color: #212529;
  font-size: 16px;
  line-height: 1.5;
`;

export const PublicSliderContainer = styled.div`
margin-top: 100px;
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

export const PublicCardContainer = styled.div`
  max-width: 20rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.3s ease-in-out;
  margin: 10px;
  cursor: pointer;
  padding: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .cardImg {
    object-fit: cover;
    width: 100%;
    height: 150px;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  
`;

export const PublicCardContent = styled.div`
  padding: 0.5rem 0;
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
  max-width: 100%; /* 최대 너비 제한 */
  overflow-x: auto; /* 가로 스크롤 활성화 */
  
`;