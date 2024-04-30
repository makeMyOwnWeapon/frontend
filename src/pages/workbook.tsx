import React, { useEffect, useState } from 'react';
import { Content, NavContainer, PageBackGround, PageFooter  } from '../styles/Public';
import NavBar from '../components/public/navbar_default'
import SidebarOptions from '../components/board/select_option';
import WorkbookCard from '../components/board/workbook_card';
import axios from 'axios';
import Pagination from '../components/board/pagenation';



const WorkBook: React.FC = () => {
    // const [cards, setCards] = useState<Card[]>([]);
    // oauth extention
  


    const cards = [
        {
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },{
          videoUrl: "https://www.inflearn.com",
          title: "인프런이에요",
          description: "인프런 썸네일 이에요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://krafton.com",
          title: "krafton이에요",
          description: "의장님 좋아요",
          readMoreUrl: "#"
        },
        {
          videoUrl: "https://i.kym-cdn.com/photos/images/original/001/389/404/a2b.jpg",
          title: "나는 람쥐썬더",
          description: "집으로 가고싶어요.",
          readMoreUrl: "#"
        },
       
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    

    
    
        // useEffect(() => {
        //   function deleteCookie(name:string){
        //     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //   }
        //   const fetchData = async () => {
        //     try {
    
        //       // 로그인 상태인 경우 GET 요청 보내기
        //       const response = await axios.get('http://192.168.0.143:3000/api/member/signin', {
        //         headers: {
        //           'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
        //         },
        //       });
    
        //       // 여기서 서버로부터 받은 데이터에 따라 필요한 처리를 수행할 수 있습니다.
        //       console.log('Server Response:', response.data);
    
        //       deleteCookie('token'); // 'username'은 예시 쿠키 이름입니다.
        //       document.cookie = `token=${response.data.token}; expires=${response.data.expire}`;
    
        //       setCards(response.data)
    
        //       // 로그인 상태를 갱신합니다.
        //     } catch (error) {
        //       console.error('Error:', error);
        //     }
        //   };
    
        //   fetchData();
        // }, [navigate]);
    // response 데이터를 잘 가져와서 아래의 const에 넣어야됨.
        // const renderWorkbookCards = () => {
        //   return cards.map((card, index) => (
        //     <WorkbookCard
        //       key={index}
        //       videoUrl={card.videoUrl}
        //       title={card.title}
        //       description={card.description}
        //       readMoreUrl={card.readMoreUrl}
        //     />
        //   ));
        // }
        
    
  return (
    
    <>
    <NavBar /> 
    <NavContainer>
    </NavContainer>
    <PageBackGround>
      <SidebarOptions/> 
      <Content>
        {currentItems.map((card, index) => (
          <WorkbookCard
            key={index}
            videoUrl={card.videoUrl}
            title={card.title}
            description={card.description}
            readMoreUrl={card.readMoreUrl}
          />
        ))}
  
      </Content>
      <PageFooter>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={cards.length}
          paginate={paginate}
          currentPage={currentPage}
        />
</PageFooter>
</PageBackGround>
    </>
  );
};

export default WorkBook;