import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
    align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 800px;
  margin: auto;
`;

export const Formdiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  min-height:100vh;
  max-width: 800px;
  margin: auto;
    overflow-y: scroll;
  
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding:20px;
  justify-content: space-between;
  margin-bottom: 20px;
`;



export const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
`;

export const QuestionContainer = styled.div`
  width: 50%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  display:flex;
  justify-content: center; /* 세로 축 중앙 정렬 */
  align-items: center; 
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

export const InputBoxWrapper = styled.div`
  display: block;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  min-width: 80px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const Input_text = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #0056b3;
  }
`;

export const StyledText = styled.p`
font-size: 24px;
color: black;
margin-top: 70px;
margin-bottom: 30px;
text-align:left;
`;

export const SelectOption = styled.select`
padding: 8px 16px;
margin-right: 8px;
margin-top:8px;
margin-bottom:8px;
color: #000;
border: 1px solid #ccc;
border-radius: 4px;
cursor: pointer;
`;

export const ButtonContainer = styled.div`
  position: fixed;    // 위치를 화면에 고정
  top: 20px;          // 상단에서 20px 떨어진 위치
  right: 20px;        // 우측에서 20px 떨어진 위치
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;