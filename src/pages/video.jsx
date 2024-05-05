import React, { useEffect, useRef, useState } from 'react';
import * as vision from "https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import "../styles/css/video.css";
import { request } from '../helpers/axios_helper';
import { useNavigate } from 'react-router-dom';
import NavBar_main_jsx from '../components/public/navbar_main_jsx';
import { Cookies } from 'react-cookie';


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


const Video = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    
    const token = cookies.jwt;    
    if (!token) {
      alert('로그인 해 주세요!')
      navigate('/main');
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
          blendShapes = faceLandmarker.current.detectForVideo(videoRef.current, performance.now()).faceBlendshapes;

          if (blendShapes) {
            if(count.current % 10 == 0){ // 프레임 수 조절
              checkBlinks(blendShapes);
            }
            count.current+=1;

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
    console.log('check');
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
        sleepDurationRef.current = (currentTime - sleepStartRef.current) / 1000;
        if (sleepDurationRef.current >= 3) {
          setStatus('자는중');
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
          sleepStartRef.current = formatLocalTime(sleepStartRef.current);
          sleepEndRef.current = formatLocalTime(currentTime);
          request(
            "POST",
            "/api/analytics/occur",
            {
              startedAt: sleepStartRef.current,
              endedAt: sleepEndRef.current,
              analysisType: 0,
              sublectureId: 16
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
      <div id="container">
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
      </div>
    </>
  );
};

function formatLocalTime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
}

export default VideoComponent;
