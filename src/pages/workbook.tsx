import React from 'react';
import { PageContainer, NavContainer , Title_text} from '../styles/MainStyles'; // MainContainer 스타일 가져오기
import NavBar from '../components/public/navbar'
import SidebarOptions from '../components/board/select_option';
import ListComponent from '../components/board/workbook_list';
import workbook_card from '../components/board/workbook_card';
import { Card } from '../styles/SignupStyles';
import WorkbookCard from '../components/board/workbook_card';

  



const WorkBook: React.FC = () => {
    interface Item{
        id: number;
        name: string;
    }

    const items = [
        { id: 1, name: '항목 1' },
        { id: 2, name: '항목 2' },
        { id: 3, name: '항목 3' }
    ];
    
    const handleItemSelect = (item: Item) => {
        console.log('Selected Item:', item);
    };

    const cards = [
        {
          imageUrl: "https://i.namu.wiki/i/7SO2FDuNnzmK_kE68K_wceSKJqoW8-E4vQnJE3uAItSdqFbjbwHMgITRfWLnssiT7MLWzTz3n6nBedGTFFC1EA.webp",
          title: "Noteworthy technology acquisitions 2021",
          description: "집에가고싶어요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "https://i.namu.wiki/i/9aUQQ4YjU9vmKuHT_cZAL61VKpKsLolynnI46BhOZQuKxGJygZ6BJK2zTHoX3pcNQmmcfzcVEZQcythY1lRXBQ.webp",
          title: "Noteworthy technology acquisitions 2021",
          description: "집으로 보내주세요.",
          readMoreUrl: "#"
        },
    ]


  return (
    
    <>
    <NavBar /> 
    <NavContainer>
      <Title_text>

    </Title_text>
    </NavContainer>
    
    <PageContainer>
      
      <SidebarOptions/> 
      {cards.map((card, index) => (
          <WorkbookCard
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
            readMoreUrl={card.readMoreUrl}
          />
        ))}
      {/* <ListComponent items={items} onItemSelect={handleItemSelect} /> */}
    </PageContainer>
    </>
  );
};

export default WorkBook;
