import React, { useState, useEffect, useRef } from 'react';
import HeroSection from './MainScreen';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Calculator from './Calculator';
import Tetris from './Tetris';
import Projects from './Projects';
import '../styles/Portfolio.css';

/* Principal component with Matrix theme */
const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const canvasRef = useRef(null);
  const aboutMeRef = useRef(null);

  // Función para scroll a la sección de About Me
  const handleScrollToAboutMe = () => {
    if (aboutMeRef.current) {
      aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    const duration = 3000; // 3 seconds loading time
    const steps = 100;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setLoadingProgress(currentStep);

      if (currentStep >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowLoading(false);
          setIsLoaded(true);
        }, 500);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="portfolio-container">
      {/* Loading Screen */}
      <div className={`loading-screen ${!showLoading ? 'hidden' : ''}`}>
        <div className="loader-content">
          <h1 className="loader-title">CARGANDO...</h1>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">{loadingProgress}%</p>
          <p className="loading-message">» Inicializando sistema...</p>
        </div>
      </div>

      <canvas ref={canvasRef} id="matrix-canvas"></canvas>

      {/* Pasar función de scroll a HeroSection */}
      <HeroSection scrollY={scrollY} isLoaded={isLoaded} onScrollToSkills={handleScrollToAboutMe} />

      {/* Sección Sobre Mi con ref para scroll */}
      <AboutMe ref={aboutMeRef} />

      {/* Sección Skills */}
      <Skills />

      {/* Sección Mis Proyectos - Calculadora */}
      <Calculator />



      {/* Sección Mis Proyectos - Tetris */}
      <Tetris />

      {/* Sección Proyectos Actuales */}
      <Projects />


    </div >
  );
};

export default Portfolio;