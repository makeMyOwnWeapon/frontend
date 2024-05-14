import styled from 'styled-components';

export const CardContainer = styled.div`
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

export const CardContent = styled.div`
  padding: 0.5rem 0;
`;

export const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
`;

export const CardComponent = styled.h5`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: #6b7280;
`;

export const CardDescription = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #4b5563;
`;

export const ReadMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #3b82f6;
  border-radius: 0.375rem;
  text-decoration: none;
  margin-top: 0.5rem;

  &:hover {
    background-color: #2563eb;
  }
`;
