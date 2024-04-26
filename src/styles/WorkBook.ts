import styled from 'styled-components';

export const CreateButton = styled.button`
  flex-direction: column;
  margin-top: auto; 
  margin-bottom:10px;
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #CCCCCC;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  left: 75%;
  position: relative;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  height: auto;
  background-color: #f2f2f2;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(1,1,0,);
  margin-top: 20px; // 상단에 붙임
  
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
  box-shadow: 0 2px 4px rgba(0,0,0,0);
  flex: 1;
`;

// 스타일링된 리스트 아이템
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
  background: #FFFFFF; // 배경색 없음
  color: darkgray; // 글자색
  padding: 10px 0;

`;