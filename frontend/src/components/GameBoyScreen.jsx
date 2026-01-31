import React, { useState, useEffect } from 'react';

const HeroSection = ({ scrollY, isLoaded }) => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-name">JAVIER NIETO</h1>
        <h2 className="hero-title">Desarrollador Web Full Stack</h2>
        <p className="hero-description">
          Ingeniero en Desarrollo de Software,
          especializado en bases de datos y desarrollo de páginas web,
          Me especializo en crear soluciones web innovadoras y funcionales.
          <br /><br />
          
          
        </p>
      </div>
    </div>
  );
};

export default HeroSection;