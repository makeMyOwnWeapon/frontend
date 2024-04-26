import styled from "styled-components";

// 스타일드 컴포넌트를 사용하여 스타일링된 입력란과 이미지 컨테이너를 생성합니다.
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  margin-right: 10px;
`;

export const Image = styled.img`
max-width: 200px;
max-height: 150px;
`;

export const QuestionContainer = styled.div`
  margin-bottom: 10px; /* 각 문제 컴포넌트 간의 간격 조절 */
`;


export const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Label = styled.label`
margin-bottom: 5px;
font-weight: bold;
`;

export const Input_text = styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 16px;
outline: none;

&:focus {
  border-color: #007bff;
}
`;
