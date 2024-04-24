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

export const Input = styled.input`
  ${tw`w-full py-3 px-4 mt-4 border rounded-md`}
  box-sizing: border-box;  
  border: 1px solid #ccc;  
  font-size: 16px;         
`;

export const Button = styled.button`
  ${tw`w-full py-3 px-4 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700`}
  box-sizing: border-box; 
  border: none;            
  font-size: 16px;        
`;

export const Title = styled.h1`
  ${tw`text-2xl font-bold text-gray-900`}
`;
