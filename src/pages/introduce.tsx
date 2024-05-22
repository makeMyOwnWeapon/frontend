import React, { useState } from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../components/public/NaviSection";

interface IntroduceProps {
  isLoggedIn: boolean;
}

const Introduce: React.FC<IntroduceProps> = ({ isLoggedIn }) => {
  const currentMenuName = '소개 페이지';

  const images = [
    "introduce0.png",
    "introduce2.png",
    "introduce3.png",
    "introduce4.png",
    "introduce5.png",
    "introduce6.png",
    "introduce7.png",
    "introduce8.png"
  ];

  const descriptions = [
    "1. 구글 계정으로 로그인을 진행합니다.",
    "2. 닉네임을 랜덤으로 설정하여 회원가입을 해줍니다.",
    "3. 마이페이지에서 인증코드를 복사합니다.",
    "4. 복사한 인증코드를 LOA Extension에 붙여 넣어 준 뒤, 인프런에 접속하여 강의를 들어줍니다. 유튜브 강의는 지원이 안돼요!",
    "5. 귀여운 LOA 아이콘을 누른 뒤, 문제집을 클릭하고 학습을 시작합니다. 만약 문제가 없다면 AI로 문제집을 만들어 주세요!",
    "6. 나를 찍는 캠화면은 정중앙을 바라보게 해야 합니다. 학습 도중 문제출제, 졸음감지, 자리이탈감지 기능이 있습니다. 갑자기 나오는 알림음에 유의해 주세요!",
    "7. 학습종료버튼을 눌러 해당 강의에 대한 레포트를 확인해 보세요!",
    "8. LOA 홈페이지에서 문제집을 만들 수도 있고, 이미 만들어진 문제집과 레포트를 다시 볼 수 있어요!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <BackgroundAnimation>
      <Container>
        <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn} />
        <InnerContentSection>
          <ImageContainer>
            <img src={`${process.env.PUBLIC_URL}/${images[currentIndex]}`} alt={`introduce${currentIndex + 1}`} />
          </ImageContainer>
          <DescriptionContainer>
            <p>{descriptions[currentIndex]}</p>
            <ButtonContainer>
              <NavButton onClick={handlePrev}>이전</NavButton>
              <NavButton onClick={handleNext}>다음</NavButton>
            </ButtonContainer>
          </DescriptionContainer>
        </InnerContentSection>
      </Container>
    </BackgroundAnimation>
  );
};

export default Introduce;

const InnerContentSection = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  height: 100%;
  justify-content: center;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ImageContainer = styled.div`
  margin-top: 3%;
  flex: 0 0 60%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 3%;
  flex: 0 0 40%;
  height: 400px;
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;

const NavButton = styled.button`
  padding: 10px;
  width: 80px;
  font-size: 1.1rem;
  background-color: #0076B8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005f8a;
  }
`;
