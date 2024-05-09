import React, { useEffect, useRef, useState } from 'react';
import * as vision from "https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import "../styles/Public";
import { request } from '../helpers/axios_helper';
import { Container } from '../styles/Public';
import NaviSection from '../components/new_components/NaviSection';
import styled from 'styled-components';
import { Side } from '../components/new_components/Side';
import SidebarOptions from '../components/board/select_option';
import { Main } from '../components/new_components/Main';

const VideoComponent = () => {
  const [status, setStatus] = useState('초기값');
  const [eyeStatus, setEyeStatus] = useState('초기값');
  const [webcamRunning, setWebcamRunning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceLandmarker = useRef(null);
  const isSleepingRef = useRef(false);
  const sleepStartRef = useRef(null);
  const sleepEndRef = useRef(null);
  const sleepDurationRef = useRef(0);
  const sleepCountRef = useRef(0);
  const faceNotRecognizedStartRef = useRef(null);
  const faceNotRecognizedTimeRef = useRef(null);
  const count = useRef(0);
  const sleep = 0;
  const exit = 1;

  useEffect(() => {
    async function createFaceLandmarker() {
      const { FaceLandmarker, FilesetResolver } = vision;
      const filesetResolver = await FilesetResolver.forVisionTasks("https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
      faceLandmarker.current = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
      });
    }

    createFaceLandmarker();
  }, []);

  useEffect(() => {
    if (!webcamRunning || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Webcam is not active or getUserMedia() is not supported by your browser');
      return;
    }

    const enableCam = async () => {
      if (!faceLandmarker.current) {
        console.log("Wait! faceLandmarker not loaded yet.");
        return;
      }

      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadeddata", predictWebcam);
    };

    enableCam();

    let lastVideoTime = -1;
    let blendShapes = undefined;

    async function predictWebcam() {
      if (faceLandmarker.current && webcamRunning) {
        if (lastVideoTime !== videoRef.current.currentTime) {
          lastVideoTime = videoRef.current.currentTime;
          blendShapes = await faceLandmarker.current.detectForVideo(videoRef.current, performance.now());

          if (blendShapes && blendShapes.faceBlendshapes) {
            if(count.current % 25 === 0){ // 프레임 수 조절
              checkBlinks(blendShapes.faceBlendshapes);
            }
            count.current += 1;
          }
        }
        window.requestAnimationFrame(predictWebcam);
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamRunning]);

  function checkBlinks(blendShapes) {
    const currentTime = new Date();

    if (!blendShapes[0]) {
      if (!faceNotRecognizedStartRef.current) {
        faceNotRecognizedStartRef.current = currentTime;
      }
      faceNotRecognizedTimeRef.current = (currentTime - faceNotRecognizedStartRef.current) / 1000;
      if (isSleepingRef.current) {
        setStatus('졸다가 인식 안됨');
      } else if (!isSleepingRef.current && faceNotRecognizedTimeRef.current > 3) {
        setStatus('자리이탈');
      }
      return;
    }

    faceNotRecognizedStartRef.current = null;
    setStatus('학습중');

    if (blendShapes[0].categories[9].score > 0.4500 && blendShapes[0].categories[10].score > 0.4500) {
      setEyeStatus('눈감음');
      if (isSleepingRef.current) {
        sleepDurationRef.current = Math.floor((currentTime - sleepStartRef.current) / 1000);
        if (sleepDurationRef.current >= 3) {
          setStatus('자는중');
        }
        
        if (sleepDurationRef.current === 5) {
          requestAlarm(formatUTCDate(sleepStartRef.current), sleep);
          console.log('알람 보내기');
        }
      }
      if (!isSleepingRef.current) {
        isSleepingRef.current = true;
        sleepStartRef.current = currentTime;
        setEyeStatus('눈감음');
      }
    } else {
      setEyeStatus('눈뜸');
      if (isSleepingRef.current) {
        sleepDurationRef.current = (currentTime - sleepStartRef.current) / 1000;
        if (sleepDurationRef.current >= 3) {
          sleepStartRef.current = formatUTCDate(sleepStartRef.current);
          sleepEndRef.current = formatUTCDate(currentTime);

          request(
            "POST",
            "/api/analytics/save",
            {
              startedAt: sleepStartRef.current,
              endedAt: sleepEndRef.current,
              analysisType: 0,
            }).then(
              (response) => {
                console.dir(response.data.message);
                alert(response.data.message);
              }).catch(
              (error) => {
                alert(error);
              }
          );
          sleepCountRef.current++;
          console.log("잔 시각 : " + sleepStartRef.current + "깬 시각 : " + sleepEndRef.current);
        } else {
          setStatus('학습중');
        }
        isSleepingRef.current = false;
      }
    }
  }

  const updateStatus = (temp) => {
    setStatus(temp);
  };

  const updateEyeStatus = (temp) => {
    setEyeStatus(temp);
  };

  return (
    <>
      <div id="backgroundNoAnimation">
        <Container>
          <NaviSection></NaviSection>
          <InnerContentSection>
            <Side>
              <SidebarOptions></SidebarOptions>
            </Side>
            <Main>
              <div id="screen">
                <div id='video_box'>
                  <video ref={videoRef} id="webcam" autoPlay playsInline></video>
                  <canvas ref={canvasRef} id="output_canvas"></canvas>
                </div>
              </div>
              <div id="screen_info">
                <div>
                  <button onClick={() => setWebcamRunning(!webcamRunning)} id="webcamButton">
                    {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE WEBCAM"}
                  </button>
                </div>
                <div>현재 듣고 있는 강의 : <span></span></div>
                <div>상태 : <span id="status">{status}</span></div>
                <div>잔 횟 수 : {sleepCountRef.current}</div>
                <div id="eyestatus">[개발자] 눈감은 상태 : <span id="dev_eye_status">{eyeStatus}</span></div>
                <div>캠 시작 시간 : <span>13:33</span></div>
                <div>잔 이력 : </div>
                <button onClick={() => {updateStatus('업데이트')}}>상태 업데이트</button>
                <button onClick={() => {updateEyeStatus('업데이트')}}>눈 상태 업데이트</button>
              </div>
            </Main>
          </InnerContentSection>
        </Container>
      </div>
    </>
  );
};
 {/* </BackgroundAnimation> */}
      {/* <div id="container">
        <div id="align">
          <div id='title'>제목</div>
          <div id='video_box'>
            <video ref={videoRef} id="webcam" autoPlay playsInline></video>
            <canvas ref={canvasRef} id="output_canvas"></canvas>
          </div>
          <div id="video_footer">
            <button onClick={() => setWebcamRunning(!webcamRunning)} id="webcamButton">
              {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE WEBCAM"}
            </button>
            <div>
              <div>상태 : <span id="status">{status}</span></div>
              <div>잔 횟 수 : {sleepCountRef.current}</div>
              <div>현재 듣고 있는 강의 : <span id="lecture">운영체제</span></div>
              <div>현재 재생 시간 : <span id="playTime">13:20?</span></div>
              <div id="eyestatus">[개발자] 눈감은 상태 : <span id="dev_eye_status">{eyeStatus}</span></div>
              <div>[개발자] 전송내역 <dev id="dev_submit_history"></dev></div>
              <div>잔 이력 : </div>
              <button onClick={() => {updateStatus('업데이트')}}>상태 업데이트</button>
              <button onClick={() => {updateEyeStatus('업데이트')}}>눈 상태 업데이트</button>
            </div>
          </div>
        </div>
      </div> */}
    function formatUTCDate(date) {
      if (!(date instanceof Date)) {
        date = new Date(date); // 입력이 Date 객체가 아니라면 Date 객체로 변환
      }
      return date.toISOString();
    }
    

function requestAlarm(startTime, type){
  // 졸음 0, 자리이탈 1
  request(
    "POST",
    "/api/analytics/alarm",
    {
      startedAt: startTime,
      analysisType: type
    }).then(
      (response) => {
        console.dir(response.data.message);
        alert(response.data.message);
      }).catch(
      (error) => {
        alert(error.message);
      }
  );
}

const InnerContentSection = styled.div`
  display: flex;
  height: 85%;
  >div{
  }
  #screen{
    background-color: black;
    border-radius: 30px;
    overflow: hidden;
  }
  #video_box{
    width: 100%;
    height: 100%;
  }
  #webcam{
    width: 100%;
  }
  #main > #screen_info{
    display: flex;
    flex-direction: column;
    width: 30%;
    font-size: large;
    font-weight: bold;
    padding-left: 20px;
  }
  #screen_info > div{
    margin-bottom: 10px;
  }
  #side > div{
    border: 1px solid black;
  }
  #profileBox{
    height: 40%;
  }
`

export default VideoComponent;
