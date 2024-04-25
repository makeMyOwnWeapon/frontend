import React, { useEffect } from 'react';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'default_client_id';

const Account: React.FC = () => {
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google?.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }  // 버튼 옵션
    );

    window.google?.accounts.id.prompt(); // 세션 종료 시 자동 로그인 프롬프트
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log('인증 데이터:', response);
    // 여기서 response를 사용하여 사용자 로그인 처리
  };

  return (
    <div>
      <div id="signInDiv"></div> {/* 로그인 버튼이 렌더링될 위치 */}
    </div>
  );
};

export default Account;
