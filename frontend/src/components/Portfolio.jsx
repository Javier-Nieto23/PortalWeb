import React, { useState, useEffect, useRef } from 'react';
import HeroSection from './MainScreen';
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
      <HeroSection scrollY={scrollY} isLoaded={isLoaded} />

      {/* Content Section */}
      <div className="content-section">
        <div className="hero-content-scroll">
          <div className="hero-text">
            <h1><span className="highlight">Sobre mi</span> </h1>
            <p className="description">
              Totalmente comprometido con la filosofía del aprendizaje continuo,
              soy un desarrollador full stack con una profunda pasión por JavaScript,
              React y todo lo relacionado con el desarrollo web,
              con un amor por la lógica, tecnología y la constante búsqueda de nuevas cosas por descubrir
              impulsa mi entusiasmo y pasión por el desarrollo web,
              me gusta dedicar mi tiempo a la musica, resolver puzzles y tocar la guitarra.

            </p>


          </div>
        </div>
      </div>

      <div className="container" id="skills-section">

        <div className="skill-tags">
          <h2>Tecnologías y Habilidades</h2>
          <img className="skill-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" title="Git" />
          <img className="skill-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" title="Docker" />
          <img className="skill-icon" src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML5" title="HTML5" />
          <img className="skill-icon" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS3" title="CSS3" />
          <img className="skill-icon" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" alt="JavaScript" title="JavaScript" />
          <img className="skill-icon" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" title="React" />
          <img className="skill-icon" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" title="Node.js" />
          <img className='skill-icon' src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="Express" title="Express" />
          <img className="skill-icon" src="https://cdn.worldvectorlogo.com/logos/postgresql.svg" alt="PostgreSQL" title="PostgreSQL" />
        </div>
      </div>



    </div >
  );
};

export default Portfolio;