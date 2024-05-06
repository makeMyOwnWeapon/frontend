import React, { useEffect, useRef, useState } from 'react';
import * as vision from "https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import "../styles/Public"
import { request } from '../helpers/axios_helper';
import BackgroundAnimation from '../styles/BackgroundAnimation';
import { Container } from '../styles/Public';
import NaviSection from '../components/new_components/NaviSection';
import styled from 'styled-components';

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
            if(count.current % 25 == 0){ // 프레임 수 조절
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
        sleepDurationRef.current = Math.floor((currentTime - sleepStartRef.current) / 1000);
        console.log(sleepDurationRef.current);
        if (sleepDurationRef.current >= 3) {
          setStatus('자는중');
        }
        
        
        if (sleepDurationRef.current === 5) {
          requestAlarm(sleepStartRef.current);
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
          sleepStartRef.current = formatLocalTime(sleepStartRef.current);
          sleepEndRef.current = formatLocalTime(currentTime);

          alert('서버전송 저장용');
          // 졸음 0, 자리이탈 1
          // request(
          //   "POST",
          //   "/api/analytics/occur",
          //   {
          //     startedAt: sleepStartRef.current,
          //     endedAt: sleepEndRef.current,
          //     analysisType: 0,
          //     sublectureId: 16
          //   }).then(
          //     (response) => {
          //       console.dir(response.data.message);
          //       alert(response.data.message);
          //     }).catch(
          //     (error) => {
          //       alert(error);
          //     }
          // );
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

    {/* <BackgroundAnimation> */}
    <div id="backgroundNoAnimation">
          <Container>
            <NaviSection></NaviSection>
              <InnerContentSection>
                <div id="side">
                  <div id="searchBox">1</div>
                  <div id="profileBox">2</div>
                </div>
                  
                <div id="main">
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

                </div>
              </InnerContentSection>
          </Container>
        </div>
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

function requestAlarm(startTime){
  //  졸음 0, 자리이탈 1
          request(
            "POST",
            "/api/analytics/alarm",
            {
              startedAt: startTime,
              analysisType: 0
            }).then(
              (response) => {
                console.dir(response.data.message);
                alert(response.data.message);
              }).catch(
              (error) => {
                alert(error);
              }
          );
}


const InnerContentSection = styled.div`
  /* border: 10px solid green; */
  display: flex;

  height: 85%;

>div{
  /* border: 1px solid black; */
}

#main{
  padding: 30px 100px;
  width: 100%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  /* border: 1px solid aliceblue; */
  background-color: aliceblue;
  /* opacity: 50%; */
  border-radius: 20px;
}

#main > #screen{
  /* border: 1px solid black; */
  width: 70%;
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
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 30%;
  font-size: large;
  font-weight: bold;
  padding-left: 20px;

}

#screen_info > div{
  /* border: 1px solid red; */
  margin-bottom: 10px;
  
}

#side{
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#side > div{
  border: 1px solid black;
}


#searchBox{
  height: 30%;
  margin-bottom: 100px;
  
}

#profileBox{
  height: 40%;

}

`





export default VideoComponent;

