import React from 'react';

/*modulo para la cabecera de la pagina*/
const Header = () => {
  return (
    <header className="header">
      <nav className="nav">

        <ul className="nav-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;