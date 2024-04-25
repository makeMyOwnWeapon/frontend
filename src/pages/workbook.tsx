import React from 'react';
import {  Content} from '../styles/MainStyles'; // MainContainer 스타일 가져오기
import { NavContainer } from '../styles/Public';
import { PageBackGround } from '../styles/Public';
import { CreateButton } from '../styles/WorkBook';
import NavBar from '../components/public/navbar'
import SidebarOptions from '../components/board/select_option';
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
          title: "나는 우는 고양이",
          description: "집에가고싶어요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "https://i.namu.wiki/i/9aUQQ4YjU9vmKuHT_cZAL61VKpKsLolynnI46BhOZQuKxGJygZ6BJK2zTHoX3pcNQmmcfzcVEZQcythY1lRXBQ.webp",
          title: "나는 슬픈 고양이",
          description: "집으로 보내주세요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 무너진 고양이",
          description: "집으로 보내주세요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "https://i.namu.wiki/i/Va3Dy_3qFHvGQS4qwv0oCvFySbT1DXJkK0zfMosd2UK6Jun8Zucb796VLJzLL4A40e5P4dgbBPT4da2Bv_S50Q.webp",
          title: "나는 아기고양이",
          description: "집으로 보내주세요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "https://pbs.twimg.com/media/Df6Sc5sVMAA0c-7.jpg",
          title: "나는 놀라는원숭이",
          description: "집으로 보내주세요.",
          readMoreUrl: "#"
        },
        {
          imageUrl: "data:image/jpeg;base64,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",
          title: "나는 원숭이",
          description: "코딩중이에요.",
          readMoreUrl: "#"
        },
    ]

  return (
    
    <>
    <NavBar /> 
    <NavContainer>
    <CreateButton>문제집 만들기</CreateButton>
    </NavContainer>
    
    <PageBackGround>
      
      <SidebarOptions/> 
      <Content>
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

      </Content>
    </PageBackGround>
    </>
  );
};

export default WorkBook;