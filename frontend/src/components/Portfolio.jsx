import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import HeroSection from './GameBoyScreen';
import Skills from './Skills';
import '../styles/Portfolio.css';

/* Principal component with Matrix theme */
const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const canvasRef = useRef(null);

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
      <Header />
      <HeroSection scrollY={scrollY} isLoaded={isLoaded} />
      
      {/* Content Section */}
      <div className="content-section">
        <div className="hero-content-scroll">
          <div className="hero-text">
            <h1>¡Hola! Soy <span className="highlight">Javier Nieto</span></h1>
            <h2 className="subtitle">Desarrollador Web Full Stack</h2>
            <p className="description">
              
              <br />•Realizacion de aplicaciones moviles.
              <br />•Realizacion de bases de datos.
              <br />•Implementacion de bases de datos en visual basic.
              <br />•Realizacion de paginas web.
              <br />•Implementacion de API para bases de datos.
              <br />•Manejo de tecnologias frontend y backend.
            </p>

              
            
            <div className="info-cards">
              <div className="info-card">
                <h3>📧 Email</h3>
                <p>javier.nietomancians@cesunbc.edu.mx</p>
              </div>
              <div className="info-card">
                <h3>📱 Teléfono</h3>
                <p>+52 664 369 6554</p>
              </div>
              <div className="info-card">
                <h3>📍 Dirección</h3>
                <p>Lomas conj. Residencial, calle montes escandinavos 115, 22116</p>
              </div> 
              <div className="info-card"> 
                <h3>Github</h3>
                <p><a href="https://github.com/Javier-Nieto23" target="_blank" rel="noopener noreferrer">https://github.com/Javier-Nieto23</a></p>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="btn primary">Ver Proyectos</button>
              <button className="btn secondary">Descargar CV</button>
            </div>
          </div>
        </div>
      </div>
      
      <Skills />
    </div>
  );
};

export default Portfolio;