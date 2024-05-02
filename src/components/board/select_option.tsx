import React, { useState } from "react";
import { Option, SidebarBackGround } from "../../styles/WorkBook";
import { SidebarContainer } from "../../styles/WorkBook";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";


interface OptionItem {
  id: number;
  label: string;
}

const SidebarOptions = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();
  const cookies = new Cookies(); 
  const token = cookies.get('jwt');
  const options: OptionItem[] = [
    { id: 1, label: '내 인증코드 보기' },
    { id: 2, label: '내 레포트 보기' },
    { id: 3, label: '회원 탈퇴' },
    { id: 4, label: '문의 하기' },
  ];

  const handleOptionClick = async (id: number) => {
    setSelectedOption(id);
    switch (id) {
      case 1:
        navigate('/main');
        break;
      case 2:
        navigate('/reportpage');
        break;
      case 3:
        try {
          const response = await fetch('http://localhost:3000/api/member/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          });
          if (response.ok) {
          } else {
            throw new Error('회원 탈퇴에 실패했습니다.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
        navigate('/main');
        break;
      case 4:
        navigate('/main');
        break;
      default:
        break;
    }
  };

  return (
    <SidebarContainer>
      <SidebarBackGround>
        {options.map(option => (
          <Option
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            style={{ backgroundColor: selectedOption === option.id ? '#ccc' : 'transparent' }}
          >
            {option.label}
          </Option>
        ))}
        <div style={{ display: 'flex', margin: '10px', padding: '5px' }}>
        </div>
      </SidebarBackGround>
    </SidebarContainer>
  );
};

export default SidebarOptions;
