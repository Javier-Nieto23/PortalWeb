import React, { } from 'react';

const HeroSection = ({ onScrollToSkills }) => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-name">Hola! soy Javier Nieto</h1>

        <p className="hero-description">
          Ingeniero en Desarrollo de Software,
          especializado en bases de datos y desarrollo de páginas web,
          Me especializo en crear soluciones web innovadoras y funcionales.
          <br /><br />
          <button className="Work-button" onClick={onScrollToSkills}>Ver mi trabajo!</button>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;