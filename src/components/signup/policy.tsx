import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Policy: React.FC = () => {
  return (
    <PrivacyPolicy>
      <PrivacyTitle>개인정보보호정책</PrivacyTitle>
      <PrivacyText>
        최종 업데이트 날짜: 2024년 5월 22일
        <br /><br />
        1. 개요
        <br />
        우리 Learn On-Air은 사용자의 개인정보를 보호하는 데 최선을 다하고 있습니다. 본 개인정보보호정책은 당사가 수집하는 정보, 그 정보의 사용 방법 및 사용자의 개인정보 보호를 위한 당사의 조치에 대해 설명합니다.
        <br /><br />
        2. 수집하는 개인정보의 항목
        <br />
        우리는 다음과 같은 개인정보를 수집할 수 있습니다:
        <br />
        구글 이메일 주소
        <br />
        서비스 이용 기록 및 로그 데이터
        <br />
        쿠키 및 유사한 기술을 통한 정보
        <br /><br />
        3. 개인정보의 수집 방법
        <br />
        당사는 다음과 같은 방법으로 개인정보를 수집합니다:
        <br />
        사용자가 서비스에 가입하거나 이용할 때 제공하는 정보
        <br />
        서비스 이용 과정에서 자동으로 수집되는 정보
        <br />
        사용자와의 통신을 통해 수집되는 정보
        <br /><br />
        4. 개인정보의 이용 목적
        <br />
        수집된 개인정보는 다음과 같은 목적으로 사용됩니다:
        <br />
        서비스 제공 및 운영
        <br />
        <br />
        5. 개인정보의 공유 및 제공
        <br />
        당사는 사용자의 개인정보를 제3자에게 판매하거나 대여하지 않습니다. 다만, 다음과 같은 경우에 한해 개인정보를 제3자와 공유할 수 있습니다:
        <br />
        사용자의 동의가 있는 경우
        <br />
        법적 요구가 있는 경우
        <br />
        서비스 제공을 위해 필요한 경우 (예: 호스팅 서비스 제공자)
        <br /><br />
        6. 개인정보의 보안
        <br />
        당사는 사용자의 개인정보를 보호하기 위해 합리적인 보안 조치를 취하고 있습니다. 하지만 인터넷을 통한 정보 전송의 특성상 완전한 보안을 보장할 수 없음을 유의하시기 바랍니다.
        <br /><br />
        7. 개인정보의 보유 기간
        <br />
        당사는 수집된 개인정보를 이용 목적이 달성될 때까지 보유합니다. 다만, 법적 의무가 있는 경우에는 해당 법률에 따라 개인정보를 보유합니다.
        <br /><br />
        8. 사용자의 권리
        <br />
        사용자는 언제든지 자신의 개인정보에 접근하거나 삭제를 요청할 수 있습니다. 또한 개인정보 처리에 대한 동의를 철회할 수 있습니다. 이러한 요청은 dev.jungle.dtcsj@gmail.com로 문의해 주시기 바랍니다.
        <br /><br />
        9. 쿠키 사용
        <br />
        당사는 서비스 제공을 위해 쿠키를 사용합니다. 쿠키는 사용자의 컴퓨터에 저장되는 작은 텍스트 파일로, 서비스 이용의 편리성을 높이고 사용자 경험을 개선하는 데 사용됩니다. 사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있습니다.
        <br /><br />
        10. 개인정보보호정책의 변경
        <br />
        당사는 개인정보보호정책을 변경할 수 있으며, 변경 사항은 본 페이지에 게시됩니다. 중요한 변경 사항이 있을 경우, 홈페이지에 별도로 고지할 것입니다.
        <br /><br />
        11. 문의
        <br />
        개인정보보호정책에 대한 질문이나 우려사항이 있는 경우, 아래의 연락처로 문의해 주시기 바랍니다:
        <br />
        이메일: dev.jungle.dtcsj@gmail.com
      </PrivacyText>
    </PrivacyPolicy>
  );
};

export default Policy;

const PrivacyPolicy = styled.div`
  ${tw`mt-8 p-4 bg-gray-100 rounded-lg w-full max-w-md`}
  background-color: rgba(255, 255, 255, 0.7);
  height: 500px;
  margin-right: 60px;
  overflow-y: scroll;
`;

const PrivacyTitle = styled.h2`
  ${tw`text-2xl font-bold mb-4`}
`;

const PrivacyText = styled.p`
  ${tw`text-sm leading-relaxed`}
`;
