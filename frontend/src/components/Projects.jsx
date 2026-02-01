import React from 'react';
import '../styles/Projects.css';


//Each project variable has an id, title, description, image, and link.
const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Validador',
            description: 'esta pagina web se creo con la intencion de validar documentos pdf, convirtiendolos a escala de grises, validando que no tengan informacion dedicala o codigo malicioso incrustado, esta pagina la realize durante mi estancia en SEER Trafico S.A. de C.V..',
            image: '/src/assets/validador.png',
            link: '#',

        },
        {
            id: 2,
            title: 'Tickets',
            description: 'Este es un sistema de gestion de tickets para soporte tecnico,el desarrollado fue con React en el frontend y Node.js en el backend, permitiendo a los usuarios crear, asignar y rastrear tickets de soporte de manera eficiente, ademas los tickets tambien eran para control interno.',
            image: '/src/assets/Tickets.png',
            link: '#'
        }
    ];


    return (
        <div className="projects-container">
            <div className="projects-wrapper">
                <h2>Proyectos Actuales</h2>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image-container">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                />
                            </div>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a href={project.link} className="project-link">Ver Proyecto</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
