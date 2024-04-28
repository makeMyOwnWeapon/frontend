import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  ${tw`flex flex-col items-center justify-center min-h-screen bg-gray-100`}
  height: 100vh;
background: linear-gradient(to bottom, white, lightblue);
display: flex;
flex-direction: column;
`;

export const Form = styled.form`
  ${tw`p-10  bg-white rounded-lg shadow-md`}
`;

export const Div = styled.div`
  ${tw`p-10  bg-white rounded-lg shadow-md`}
`;

export const Button = styled.button`
  ${tw`w-full py-3 px-4 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700`}
  box-sizing: border-box; 
  border: none;            
  font-size: 16px;        
`;

export const SmallButton = styled.button<{selected: boolean }>`
padding: 8px 16px;
margin-right: 8px;
background-color: ${({ selected }) => (selected ? '#4CAF50' : '#CCCCCC')};
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
`;

export const NameContainer = styled.div`
display: flex;
aliign-items: center;
margin-top: 16px;
`;

export const NameGeneratorButton = styled.button`
padding: 8px 16px;
margin-right: 8px;
margin-top:8px;
margin-bottom:8px;
color: #000;
border: none;
border-radius: 4px;
cursor: pointer;
`;

export const Title = styled.h1`
  ${tw`text-2xl font-bold text-gray-900`}
`;