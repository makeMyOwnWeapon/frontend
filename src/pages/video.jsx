import React, { useEffect, useRef, useState } from 'react';
import * as vision from "https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import "../styles/css/video.css";
import { request } from '../helpers/axios_helper';

function formatLocalTime(date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
}


const VideoComponent = () => {
  // mediaLogic 변수
  const isSleepingRef = useRef(false);
  const sleepStartRef = useRef(null);
  const sleepEndRef = useRef(null);
  const sleepDurationRef = useRef(0);
  const sleepCountRef = useRef(0);
  const faceNotRecognizedStartRef = useRef(null);
  const faceNotRecognizedTimeRef = useRef(null);

  // mediaLogic 함수
  function checkBlinks(blendShapes){

    const currentTime = new Date();
              // title.innerText = currentTime.toLocaleTimeString();
              // 얼굴 인식이 안되는 경우
              if (!blendShapes[0]){
                  if (faceNotRecognizedStartRef.current === null) {
                    faceNotRecognizedStartRef.current = currentTime;
                  }
                  // 얼굴 인식이 실패한 시간 계산
                  // 얼굴 인식이 안되고 2초 이상 지났을 때                // const faceNotRecognizedDuration = (currentTime - faceNotRecognizedStart) / 1000;
                  faceNotRecognizedTimeRef.current = (currentTime - faceNotRecognizedStartRef.current) / 1000;
                      if (isSleepingRef.current){
                          // console.log('졸다가 인식 안됨');
                          setStatus('졸다가 인식 안됨');
  
                      } else if (!isSleepingRef.current && faceNotRecognizedTimeRef.current > 3) {
                          // console.log('자리이탈');
                          setStatus('자리이탈');
                      }
                  return;
              }
              // 얼굴 인식이 되는 경우, 얼굴 인식이 안됐던 시간 초기화
              faceNotRecognizedStartRef.current = null;
              setStatus('학습중');
  
  
              if (blendShapes[0].categories[9].score > 0.4500 && blendShapes[0].categories[10].score > 0.4500) {
                  // 눈을 감았을 경우
                  setEyeStatus('눈감음');
                  if(isSleepingRef.current){
                      sleepDurationRef.current = (currentTime - sleepStartRef.current) / 1000;
                      if(sleepDurationRef.current >= 3){
                          // console.log('자는중');
                          setStatus('자는중');
  
                      }
                  }
  
                  if (!isSleepingRef.current) {
                      // 자는 상태가 아니라면 자는 상태로 변경하고 현재 시간 기록
                      isSleepingRef.current = true;
                      sleepStartRef.current = currentTime;
                      setEyeStatus('눈감음');                    
                  }
              } else {
                  // 눈을 뜬 경우
                  setEyeStatus('눈뜸');
  
                  if (isSleepingRef.current) {
                    sleepDurationRef.current = (currentTime - sleepStartRef.current) / 1000;
                      if (sleepDurationRef.current >= 3) {
                          // 3초 이상 눈을 감았다면, 잔 것으로 간주
                          sleepStartRef.current = formatLocalTime(sleepStartRef.current);
                          sleepEndRef.current = formatLocalTime(currentTime);
  
                          // let str = `시작 시간: ${sleepStart}, 종료 시간: ${sleepEnd}`;
                          // alert(getAuthToken('jwt'));
                          
                          // 자고 일어나면 데이터 저장.
                          request(
                              "POST",
                              "/api/analytics/occur",
                              {
                                  startAt : sleepStartRef.current,
                                  endAt : sleepEndRef.current,
                                  analysisType : "0",
                                  sublectureId : "16"
                              }).then(
                                  (response) => {
                                      console.dir(response.data.message);
                                      alert(response.data.message);
                                  }).catch(
                                  (error) => {
                                      alert(error);
                                  }
                          )
                          
                          sleepCountRef.current++;
                          console.log(`잔 횟수: ${sleepCountRef.current}`);
                          // document.querySelector('#dev_submit_history').innerHTML += ` <li> 시작 시간 : ${sleepStartRef.current} 종료 시간 :  ${sleepEndRef.current} </li>`;
                      }
                      else {
                          // 3초 미만으로 눈을 감았다면, '학습중'으로 유지
                          setStatus('학습중');
                      }
  
                      isSleepingRef.current = false;
  
      }
      }
  }


  // 전역변수
  // status 상태를 생성하고 초기값을 'inactive'로 설정합니다.
  const [status, setStatus] = useState('초기값');

  // eyeStatus 상태를 생성하고 초기값을 'open'으로 설정합니다.
  const [eyeStatus, setEyeStatus] = useState('초기값');

  // status 상태를 업데이트하는 함수 예제
  const updateStatus = (temp) => {
    setStatus(temp); 
  };

  // eyeStatus 상태를 업데이트하는 함수 예제
  const updateEyeStatus = (temp) => {
    setEyeStatus(temp); 
  };

  const [webcamRunning, setWebcamRunning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let faceLandmarker = useRef(null);

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
          blendShapes = faceLandmarker.current.detectForVideo(videoRef.current, performance.now()).faceBlendshapes;
          
          if (blendShapes){
            // console.dir(blendShapes[0].categories[9].score);
            // Add your logic to handle results here            
            checkBlinks(blendShapes);
          }
          
        }
        window.requestAnimationFrame(predictWebcam);
      }
    }
    // Clean up function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamRunning]); // webcamRunning을 의존성 배열에 추가하여 webcamRunning 상태가 변경될 때만 이 useEffect가 실행되도록 함
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

              <div>상태 : <span id="status">{eyeStatus}</span></div>
              <div>현재 듣고 있는 강의 : <span id="lecture">운영체제</span></div>
              <div>현재 재생 시간 : <span id="playTime">13:20?</span></div>

              <div id="eyestatus">[개발자] 눈감은 상태 : <span id="dev_eye_status">{status}</span></div>
              <div>[개발자] 전송내역 <dev id="dev_submit_history"></dev></div>
              
              <button onClick={() => {updateStatus('업데이트')}}>상태 업데이트</button>
              <button onClick={() => {updateEyeStatus('업데이트')}}>눈 상태 업데이트</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoComponent;

