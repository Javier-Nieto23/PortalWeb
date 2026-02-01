import React from "react";

const AboutMe = React.forwardRef((props, ref) => {
    return (
        <div className="content-section" ref={ref}>
            <div className="hero-content-scroll">
                <div className="hero-text">
                    <h1><span className="highlight">Sobre mi</span></h1>
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
    );
});

AboutMe.displayName = "AboutMe";
export default AboutMe;