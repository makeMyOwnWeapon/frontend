import NavBar_main_jsx from '../components/public/navbar_main_jsx';
import { Mission1 } from '../components/video/Mission1';
import "../styles/css/video.css"
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Video = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/main');
    }

    // 컴포넌트가 마운트된 후 실행될 코드
    Mission1();

    console.log('컴포넌트가 마운트되었습니다.');
    const video_box = document.querySelector('#video_box');
    const containers = document.querySelector('#containers');
    video_box.appendChild(containers);

    const webcamButton = document.querySelector('#webcamButton');
    const video_footer = document.querySelector('#video_footer');
    video_footer.appendChild(webcamButton);

    // 선택적으로 컴포넌트가 언마운트될 때 실행될 코드를 반환할 수 있습니다.
    return () => {
      console.log('컴포넌트가 언마운트되었습니다.');
    }
  }, [navigate]); // navigate가 변경될 때마다 실행

  return (
    <>
      <NavBar_main_jsx />
      <div id="container">
        <div id="nav_copy">네비게이션 높이만큼 밀어내기용</div>

        <div id="align">
          <div id='title'>제목</div>
          <div id='video_box'></div>
          <div id="video_footer">

            <div>상태 : <span id="status">학습중 / 자는중 / 자리이탈</span></div>
            <div>현재 듣고 있는 강의 : <span id="lecture">운영체제</span></div>
            <div>현재 재생 시간 : <span id="playTime">13:20?</span></div>

            <div>[개발자] 눈감은 상태 : <span id="dev_eye_status"></span></div>
            <div>[개발자] 전송내역 <dev id="dev_submit_history"></dev></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Video;
