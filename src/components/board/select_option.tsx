import React, { useState } from "react";
import { Option, SidebarBackGround } from "../../styles/WorkBook";
import { SidebarContainer } from "../../styles/WorkBook";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/css/sidebar.css';

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('인증코드가 복사되었습니다!');
    }).catch(err => {
      toast.error('복사 중 오류가 발생했습니다.');
    });
  };

  const handleOptionClick = async (id: number) => {
    setSelectedOption(id);
    switch (id) {
      case 1:
        try {
          const response = await fetch('http://localhost:3000/api/member/oauthId', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            toast(
              <div>
                <span>인증코드: {data.oauthId}</span>
                <button 
                  className="copy-button" 
                  onClick={() => copyToClipboard(data.oauthId)}
                >
                  Copy!
                </button>
              </div>
            );
          } else {
            throw new Error('인증코드 조회에 실패했습니다.');
          }
        } catch (error) {
          toast.error('인증코드 조회 중 오류가 발생했습니다.');
        }
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
            toast.success('회원 탈퇴가 성공적으로 이루어졌습니다.');
          } else {
            throw new Error('회원 탈퇴에 실패했습니다.');
          }
        } catch (error) {
          toast.error('회원 탈퇴 중 오류가 발생했습니다.');
        }
        navigate('/main');
        break;
      case 4:
        navigate('/inquiry');
        break;
      default:
        break;
    }
  };

  return (
    <SidebarContainer>
      <SidebarBackGround>
        {options.map(option => (
          <>
            <Option
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              style={{ backgroundColor: selectedOption === option.id ? '#ccc' : 'transparent' }}
            >
              {option.label}
            </Option>
            {selectedOption === option.id && <ToastContainer position="top-center" className="custom-toast-container" />}
          </>
        ))}
        <div style={{ display: 'flex'}}>
        </div>
      </SidebarBackGround>
    </SidebarContainer>
  );
};

export default SidebarOptions;
