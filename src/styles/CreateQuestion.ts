import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding:0 20px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: auto;
  /* border: 1px solid red; */
  width: 70%;
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