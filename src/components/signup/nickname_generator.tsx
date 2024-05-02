import React, { useState } from 'react';
import { NameGeneratorButton } from '../../styles/Public';

interface NicknameGeneratorProps {
  onNicknameGenerated: (nickname: string) => void;
}

const NicknameGenerator: React.FC<NicknameGeneratorProps> = ({ onNicknameGenerated }) => {
  const [nickname, setNickname] = useState('');

  const generateNickname = () => {
    const prefixes = [
        "멋진", "최고의", "강력한", "놀라운", "굉장한", "타오르는", "빛나는", "대담한", "영리한", "용감한",
        "눈부신", "서사적인", "화려한", "사나운", "불타는", "영광스러운", "위대한", "훌륭한",
        "반짝이는", "영웅적인", "과열된", "놀라운", "철의", "무적의", "즐거운", "재즈 스타일의", "힘찬", "왕의",
        "행운의", "빛나는", "장엄한", "기적의", "신비로운", "고귀한", "네온", "오메가", "뛰어난", "현상적인",
        "강력한", "최고의", "양자의", "빠른", "발광하는", "극단적인", "야생의", "별의", "최고의", "신속한",
        "천둥의", "최종의", "초월한", "멈출 수 없는", "생생한", "활기찬", "극한의", "절정의",
        "알파", "우주의", "우주적인", "꿈의", "메아리치는", "불꽃", "섬광", "유령",
        "헤일로", "충돌의", "충격의", "전설의", "유성의", "성운의", "궤도의", "양자의", "균열의",
        "폭풍의", "왜곡의", "소용돌이치는", "선의의", "서풍의", "눈보라치는", "폭발의",
        "돌풍의", "안개의", "눈부신", "빛나는", "불타는", "불꽃의"
    ];
    const suffixes = [
        "마법사", "레인저", "닌자", "기사", "사무라이", "해적", "로봇", "외계인", "바이킹", "검투사",
        "암살자", "구루", "예언자", "마도사", "마술사", "수도사", "성기사", "사냥꾼", "저격수", "전사",
        "야만인", "음유시인", "성직자", "드루이드", "강령술사", "도적", "샤먼", "흑마법사", "여마법사", "좀비",
        "스핑크스", "불사조", "용", "그리핀", "거인", "자이언트", "엘프", "드워프", "요정", "트롤",
        "미노타우르스", "사이클롭스", "히드라", "켄타우로스", "늑대인간", "뱀파이어", "유령", "사령", "미라", "고블린",
        "오거", "악마", "천사", "아콘", "키메라", "지니", "인어", "마녀", "예언자",
        "현자", "순례자", "탐험가", "용병", "지휘관", "족장", "대장", "조종사", "우주비행사",
        "요원", "탐정", "수호자", "유목민", "방랑자", "약탈자", "반역자", "스파이",
        "과학자", "발명가", "학자", "사서", "궁수", "명사수", "치료사", "사제", "선원",
        "모험가", "장인", "대장장이", "농부", "상인", "광대", "시인", "미스틱", "마법부여사", "조각가",
        "화가", "음악가", "역사가", "철학자", "수학자", "엔지니어", "교사", "안내자", "정원사"
    ];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const newNickname = `${randomPrefix}${randomSuffix}`;
    setNickname(newNickname);
    onNicknameGenerated(newNickname);
  };

  return (
    <div>
      <NameGeneratorButton type="button" onClick={generateNickname}>Generate Nickname</NameGeneratorButton>
      {nickname && <p>{nickname}</p>}
    </div>
  );
};

export default NicknameGenerator;