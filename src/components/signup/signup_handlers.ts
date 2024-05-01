import axios from 'axios';
import { AxiosResponse } from 'axios';

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
    const response: AxiosResponse = await axios.post('http://localhost:3000/api/member/signup', {
      authorizationCode: selectedButton === 1 ? 0 : 1,
      nickname: nickname
    }, {
      headers: {
        'Authorization': `Bearer ${credential}`
      }
    });
    if (response.data !== 'Invalid token') {
      // 쿠키에 토큰과 만료일자 저장
      localStorage.removeItem('token');
      localStorage.setItem('jwt', response.data.token);
      console.log('response.data:', response.data);
      navigate('/workbook');
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
