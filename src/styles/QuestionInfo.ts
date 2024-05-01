import styled from "styled-components";
import { FaArrowAltCircleLeft } from "react-icons/fa";

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
  flex-direction:column;
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

export const SliderContainer = styled.div`
    margin: 0px 200px;
    border: solid 1px black;
    .slick-prev:before,
    .slick-next:before {
        display: none;	
    }
`;


export const NextTo = styled.div`
    background-image: {FaArrowAltCircleLeft};
    background-size: contain;
    height: 20px;
    width: 20px;
`

export const Prev = styled.div`
    transform: rotate(180deg);
    background-image: {FaArrowAltCircleLeft};
    background-size: contain;
    height: 20px;
    width: 20px;
`