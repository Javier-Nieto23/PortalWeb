import React from 'react';

/*modulo para habilidades y tecnologias*/
const Skills = () => {
  return (
    <section className="skills">
      <div className="container">
        <h2>Tecnologías y Habilidades</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">TypeScript</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">MySQL</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Herramientas</h3>
            <div className="skill-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">VS Code</span>
              <span className="skill-tag">Figma</span>
              <span className="skill-tag">Postman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;