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
