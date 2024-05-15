import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/css/toastModal.css';
import { request } from "../../helpers/axios_helper";
import styled from "styled-components";

interface OptionItem {
  id: number;
  label: string;
}

const ToastModal = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const options: OptionItem[] = [
    { id: 1, label: '내 인증코드 보기' },
    { id: 2, label: '회원탈퇴' },
    { id: 3, label: '로그아웃' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("인증코드가 복사되었습니다!");
    }).catch(err => {
      toast.error("복사 중 오류가 발생했습니다.");
    });
  };

  const handleOptionClick = async (id: number) => {
    setSelectedOption(id);
    switch (id) {
      case 1:
        try {
          const response = await request("GET","/api/member/oauthId");
          if (response.status === 200) {
            const data = response.data;
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
            throw new Error("인증코드 조회에 실패했습니다.");
          }
        } catch (error) {
          toast.error("인증코드 조회 중 오류가 발생했습니다.");
        }
        break;
      case 2:
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h1>회원 탈퇴</h1>
                <p>정말로 탈퇴하시겠습니까?</p>
                <button
                  className="confirm-button"
                  onClick={async () => {
                    try {
                      const response = await request("POST","/api/member/delete");
                      if (response.status >= 200 && response.status < 300) {
                        toast.success("회원 탈퇴가 성공적으로 이루어졌습니다.");
                        removeCookie("jwt", { path: '/' });
                        navigate("/");
                        window.location.reload();
                      } else {
                        throw new Error("회원 탈퇴에 실패했습니다.");
                      }
                    } catch (error) {
                      toast.error("회원 탈퇴 중 오류가 발생했습니다.");
                    }
                    onClose();
                  }}
                >
                  네
                </button>
                <button className="cancel-button" onClick={onClose}>아니오</button>
              </div>
            );
          }
        });
        break;
      case 3:
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      removeCookie('jwt', { path: '/' });

      const jwt = cookies.jwt;
      if (jwt) {
        console.error('JWT cookie was not removed');
        toast.error('로그아웃에 실패했습니다. 다시 시도해주세요.');
        return;
      } else {
        console.log('JWT cookie removed successfully');
      }

      navigate("/");
      window.location.reload();
      console.log('Navigated to home page');

    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {options.map(option => (
        <React.Fragment key={option.id}>
          <Option
            onClick={() => handleOptionClick(option.id)}
            style={{ backgroundColor: selectedOption === option.id ? '#ccc' : 'transparent' }}
          >
            {option.label}
          </Option>
          {selectedOption === option.id && <ToastContainer position="top-center" className="custom-toast-container" />}
        </React.Fragment>
      ))}
      <div style={{ display: 'flex' }} />
    </>
  );
};

export default ToastModal;

const Option = styled.div`
  padding: 10px 15px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
`;
