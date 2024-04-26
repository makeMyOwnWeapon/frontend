import styled from "styled-components";

export const Info_page = styled.div`

height: 100vh;
background: white;z
display: flex;
flex-direction: column;
justify-content: center; /* 세로 축 중앙 정렬 */
align-items: center;     /* 가로 축 중앙 정렬 */
`;

export const Question = styled.div`
  flex: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc; /* 테두리 스타일 지정 */
  border-radius: 5px; /* 테두리 모서리를 둥글게 만듦 */
  padding: 10px; /* 내부 여백 추가 */
  margin: 10px; /* 외부 패딩 추가 */
`;

export const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%; /* 최대 너비 제한 */
  overflow-x: auto; /* 가로 스크롤 활성화 */
`;

export const QuestionButton = styled.button`
  flex-direction: column;
  // margin-top: auto; 
  // margin-bottom:10px;
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #CCCCCC;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  left: 75%;
  // position: relative;
`;

export const VideoThumbnailContainer = styled.div`
  text-align: center; /* 이미지를 중앙으로 정렬 */
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #000;
  z-index: 999;
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;