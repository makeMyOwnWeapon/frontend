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
color: #000;
border: none;
border-radius: 4px;
cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: inline-block;
`;


export const Title = styled.h1`
  ${tw`text-2xl font-bold text-gray-900`}
`;

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  readMoreUrl: string;
}

export const Card = styled.div<CardProps>`
  max-width: 20rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }

  .card-image {
    img {
      display: block;
      width: 100%;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }

  .card-content {
    padding: 1.25rem;
  }

  .card-title {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.5;
    color: #374151;
  }

  .card-description {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #6b7280;
  }

  .read-more-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    background-color: #3b82f6;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #2563eb;
    }
  }
`;