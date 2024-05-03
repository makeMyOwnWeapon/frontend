import React, { useState } from "react";
import { Option, SidebarBackGround } from "../../styles/WorkBook";
import { SidebarContainer } from "../../styles/WorkBook";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
  const [_, __, removeCookie] = useCookies(['jwt']);
  const options: OptionItem[] = [
    { id: 1, label: '내 인증코드 보기' },
    { id: 2, label: '문제집 만들기' },
    { id: 3, label: '회원탈퇴' },
    { id: 4, label: '로그아웃' },
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
          const response = await fetch("http://localhost:3000/api/member/oauthId", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
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
            throw new Error("인증코드 조회에 실패했습니다.");
          }
        } catch (error) {
          toast.error("인증코드 조회 중 오류가 발생했습니다.");
        }
        break;
      case 2:
        navigate("/create");
        break;
      case 3:
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
                      const response = await fetch("http://localhost:3000/api/member/delete", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        }
                      });
                      if (response.ok) {
                        toast.success("회원 탈퇴가 성공적으로 이루어졌습니다.");
                        removeCookie("jwt");
                        navigate("/main");
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
      case 4:
        removeCookie("jwt");
        navigate("/main");
        break;
      default:
        break;
    }
  };

  return (
    <SidebarContainer>
      <SidebarBackGround>
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
      </SidebarBackGround>
    </SidebarContainer>
  );
};

export default SidebarOptions;
