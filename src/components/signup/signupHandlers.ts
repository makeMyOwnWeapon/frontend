import { Cookies } from 'react-cookie';
import { tempRequest } from '../../helpers/axios_helper';

interface HandleSubmitArgs {
  event: React.FormEvent<HTMLFormElement>;
  credential: string | null;
  nickname: string;
  selectedButton: number | null;
  navigate: (path: string) => void;
}

export async function handleSubmit({
  event,
  credential,
  nickname,
  selectedButton,
  navigate
}: HandleSubmitArgs) {
  event.preventDefault();
  try {
    if (nickname === '' || selectedButton === null || credential === null){
        return alert('회원가입 에러!');
    }

    const response = await tempRequest('POST', 'api/member/signup', {
      authorizationCode: selectedButton === 1 ? 0 : 1,
      nickname: nickname
    });
    if (response.data !== 'Invalid token') {
      const cookies = new Cookies();
      const expireTimeUTC = Date.now() + response.data.expire * 1000;
      const expireTimeKST = expireTimeUTC + (9 * 60 * 60 * 1000);
      const expireDateKST = new Date(expireTimeKST).toUTCString();
      
      cookies.set('jwt', response.data.token, { expires: new Date(expireDateKST) });
      cookies.remove('tempGoogleToken');
      navigate('/');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


interface HandleButtonClickArgs {
  buttonIndex: number;
  selectedButton: number | null;
  setSelectedButton: (value: number | null) => void;
}

export function handleButtonClick({
  buttonIndex,
  selectedButton,
  setSelectedButton
}: HandleButtonClickArgs) {
  if (selectedButton === buttonIndex) {
    setSelectedButton(null);
  } else {
    setSelectedButton(buttonIndex);
  }
}
