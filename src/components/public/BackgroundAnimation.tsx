import React, { useEffect, useRef, PropsWithChildren } from 'react';
import Parallax from 'parallax-js';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const bubbleColor = '#ACE1F4';

const blink = keyframes`
  50% {
    opacity: 0.4;
  }
`;

const blurIntro = keyframes`
  0% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0);
  }
`;

const GlobalStyle = createGlobalStyle`
  :root {
    --bubble-color: ${bubbleColor};
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    background: linear-gradient(to bottom, #FFFFFF, #DBFDFC);
  }

  ul {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  ul li {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${blurIntro} 3s;
  }

  ul li div {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
  }
`;

const FrontDiv1 = styled.div`
  width: 120px;
  height: 120px;
  background-color: var(--bubble-color);
  top: 10%;
  left: 40%;
  animation: ${blink} 5s infinite 0.5s;
`;

const FrontDiv2 = styled.div`
  width: 110px;
  height: 110px;
  background-color: var(--bubble-color);
  top: 50%;
  left: 80%;
  animation: ${blink} 5s infinite 2s;
`;

const FrontDiv3 = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--bubble-color);
  top: 30%;
  left: 10%;
  animation: ${blink} 5s infinite 1s;
`;

const SecondDiv1 = styled.div`
  width: 70px;
  height: 70px;
  background-color: var(--bubble-color);
  top: 60%;
  left: 40%;
  animation: ${blink} 5s infinite 0.3s;
`;

const SecondDiv2 = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--bubble-color);
  top: 80%;
  left: 60%;
  animation: ${blink} 5s infinite 1.2s;
`;

const SecondDiv3 = styled.div`
  width: 55px;
  height: 55px;
  background-color: var(--bubble-color);
  top: -90;
  left: 20%;
  animation: ${blink} 5s infinite 1.4s;
`;

const ThirdDiv1 = styled.div`
  width: 45px;
  height: 45px;
  background-color: var(--bubble-color);
  top: 25%;
  left: 18%;
  animation: ${blink} 5s infinite 0.8s;
`;

const ThirdDiv2 = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--bubble-color);
  top: 75%;
  left: 35%;
  animation: ${blink} 5s infinite 1.6s;
`;

const ThirdDiv3 = styled.div`
  width: 55px;
  height: 55px;
  background-color: var(--bubble-color);
  top: 10%;
  left: 80%;
  animation: ${blink} 5s infinite 1s;
`;

const FourthDiv1 = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--bubble-color);
  top: 45%;
  left: 68%;
  animation: ${blink} 5s infinite 0.4s;
`;

const FourthDiv2 = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--bubble-color);
  top: 77%;
  left: 25%;
  animation: ${blink} 5s infinite 0.9s;
`;

const FourthDiv3 = styled.div`
  width: 90px;
  height: 90px;
  background-color: var(--bubble-color);
  top: 94%;
  left: 40%;
  animation: ${blink} 5s infinite 1.6s;
`;

const FifthDiv1 = styled.div`
  width: 30px;
  height: 30px;
  background-color: var(--bubble-color);
  top: 90%;
  left: 28%;
  animation: ${blink} 5s infinite 0.4s;
`;

const FifthDiv2 = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--bubble-color);
  top: 57%;
  left: 55%;
  animation: ${blink} 5s infinite 0.9s;
`;

const FifthDiv3 = styled.div`
  width: 35px;
  height: 35px;
  background-color: var(--bubble-color);
  top: 24%;
  left: 70%;
  animation: ${blink} 5s infinite 0.2s;
`;

const FifthDiv4 = styled.div`
  width: 35px;
  height: 35px;
  background-color: var(--bubble-color);
  top: 1%;
  left: 25%;
  animation: ${blink} 5s infinite 1s;
`;

const FifthDiv5 = styled.div`
  width: 35px;
  height: 35px;
  background-color: var(--bubble-color);
  top: 0%;
  left: 0%;
  animation: ${blink} 5s infinite 0.6s;
`;

const BackgroundAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  const sceneRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scene = sceneRef.current!;
    const parallaxInstance = new Parallax(scene, {
      frictionX: 0.1,
      frictionY: 0.1,
    });

    const bubbles = scene.querySelectorAll<HTMLDivElement>('li div');

    const randomPosition = (maxWidth: number, maxHeight: number) => {
      const randomX = Math.random() * maxWidth - maxWidth / 2;
      const randomY = (Math.random() - 0.5) * maxHeight / 2 + maxHeight / 2;
      return `translate(${randomX}px, ${randomY}px)`;
    };

    const moveBubbles = (speed: number) => {
      bubbles.forEach((bubble: HTMLDivElement) => {
        const newTransform = randomPosition(window.innerWidth, window.innerHeight);
        bubble.style.transition = `transform ${speed}s linear`;
        bubble.style.transform = newTransform;
      });
    };

    moveBubbles(2);
    setTimeout(() => {
      moveBubbles(8);
      const interval = setInterval(() => moveBubbles(8), 8000);
      return () => clearInterval(interval);
    }, 2000);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <GlobalStyle />
      <ul id="scene" ref={sceneRef}>
        <li className="layer fifth" data-depth="0.10">
          <FifthDiv1 />
          <FifthDiv2 />
          <FifthDiv3 />
          <FifthDiv4 />
          <FifthDiv5 />
        </li>
        <li className="layer fourth" data-depth="0.20">
          <FourthDiv1 />
          <FourthDiv2 />
          <FourthDiv3 />
        </li>
        <li className="layer third" data-depth="0.30">
          <ThirdDiv1 />
          <ThirdDiv2 />
          <ThirdDiv3 />
        </li>
        <li className="layer second" data-depth="0.50">
          <SecondDiv1 />
          <SecondDiv2 />
          <SecondDiv3 />
        </li>
        <li className="layer front" data-depth="1.00">
          <FrontDiv1 />
          <FrontDiv2 />
          <FrontDiv3 />
        </li>
      </ul>
      <div style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundAnimation;