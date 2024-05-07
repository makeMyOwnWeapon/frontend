import React, { useEffect, useRef, PropsWithChildren } from 'react';
import Parallax from 'parallax-js';
import './css/background.css';

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
      <ul id="scene" ref={sceneRef}>
        <li className="layer fifth" data-depth="0.10">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li className="layer fourth" data-depth="0.20">
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li className="layer third" data-depth="0.30">
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li className="layer second" data-depth="0.50">
          <div></div>
          <div></div>
          <div></div>
        </li>
        <li className="layer front" data-depth="1.00">
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
      <div style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundAnimation;