import React, { useState } from 'react';
import styled from 'styled-components';

interface NicknameGeneratorProps {
  onNicknameGenerated: (nickname: string) => void;
}

const NicknameGenerator: React.FC<NicknameGeneratorProps> = ({ onNicknameGenerated }) => {
  const [nickname, setNickname] = useState('');

  const generateNickname = () => {
    const prefixes = [
      "귀여운", "깜찍한", "예쁜", "멋진", "대단한", "매혹적인", "흥미로운", "유쾌한", "매력적인", "사랑스러운",
      "상냥한", "밝은", "화사한", "즐거운", "따뜻한", "설레는", "신비로운", "아름다운", "찬란한", "활기찬",
      "아기자기한", "유니크한", "마법의", "빛나는", "화려한", "멋스러운", "유망한", "환상적인", "꿈같은",
      "화려한", "반짝이는", "신나는", "동화 속의", "무지개처럼", "행복한", "관능적인", "상상력 있는",
      "자유로운", "신선한", "활발한", "도전적인", "자신감 넘치는", "인상적인", "도발적인", "빠른", "유별난",
      "희망적인", "진지한", "평화로운", "안전한", "힐링하는", "귀감 있는", "지혜로운", "친근한",
      "영감을 주는", "창조적인", "칭찬받는", "자의적인", "상쾌한", "고급스러운", "스타일리시한",
      "헌신적인", "진실한", "감동적인", "섬세한", "가슴 뭉클한", "긍정적인", "열정적인", "감사한",
      "희망찬", "신뢰할 수 있는", "가슴 따뜻한", "친절한", "존경받는", "충분한", "인기 있는"
  ];
    const suffixes = [
      "스위트하트", "플로럴", "버터플라이", "선샤인", "비비드", "스프링", "프레시", "허니", "러블리", "허그",
      "프렌들리", "반딧불", "코지", "캔디", "핑크", "하트", "로즈", "데이지", "코랄", "스파클", "패스텔",
      "퍼플", "뮤즈", "글로우", "글리터", "슈가", "버블", "페어리", "루비", "베리", "헤이즐", "포니",
      "마법소녀", "스노우", "토이", "팝", "팝핀", "빅토리", "마카롱", "러시아", "캘리", "라비", "차차",
      "리버", "버니", "퀸", "마린", "토니", "블러썸", "제니", "버터", "마시멜로", "버디", "소피아",
      "비비드", "바니", "카페", "케이크", "프라임", "리플렉트", "라이트", "로아", "세이지", "데일리",
      "베일", "비젼", "스프라우트", "윈터", "테일", "캣", "슈트", "리프", "버드", "메들리", "마음"
  ];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const newNickname = `${randomPrefix} ${randomSuffix}`;
    setNickname(newNickname);
    onNicknameGenerated(newNickname);
  };

  return (
    <div>
      <GenerateButton type="button" onClick={generateNickname}>Generate Nickname</GenerateButton>
      {nickname && <p>{nickname}</p>}
    </div>
  );
};

export default NicknameGenerator;

const GenerateButton = styled.button`
  font-weight: 700;
  padding: 8px 16px;
  margin-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #000;
  background-color: #ebebeb; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #79ebed; 
    color: #000; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
`;