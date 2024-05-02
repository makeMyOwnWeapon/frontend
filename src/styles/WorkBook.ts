import styled from 'styled-components';

export const CreateButton = styled.button`
  flex-direction: column;
  margin-top: auto; 
  margin-bottom: 10px;
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #CCCCCC;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  left: 75%; // 수치값에서 퍼센트값으로 수정
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 25%;
  left: 4%;
  width: 250px;
  background-color: #f2f2f2;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(1, 1, 0);
`;

export const Option = styled.div`
  padding: 10px 15px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ddd;
  }
`;

export const ListContainer = styled.div`
  margin: 20px;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  flex: 1;
`;

export const ListItem = styled.div`
  padding: 8px 12px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e2e2e2;
  }
`;

export const SidebarBackGround = styled.div`
  justify-content: space-around;
  top: 0;
  width: 100%;
  background: #FFFFFF;
  color: darkgray;
  padding: 10px 0;
`;

export const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;

export const PageItem = styled.li<{ isactive: boolean }>`
  border: 1px solid #ccc;
  padding: 8px 12px;
  margin: 5px;
  background-color: ${props => (props.isactive ? '#007bff' : '#fff')};
  color: ${props => (props.isactive ? '#fff' : '#007bff')};
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;
