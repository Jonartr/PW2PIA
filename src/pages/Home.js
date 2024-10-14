import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './img/Landing2.png';
import Landing2 from './img/Landing1.png';

const Home = () => {
    return (
      <>
  <div
    id="carouselMangasPopulares"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={Landing} className="d-block w-100" alt="Manga 1" />
        {/*
      <div class="carousel-caption d-none d-md-block">
          <h5>Manga 1</h5>
          <p>Una descripción breve o enlace a la crítica</p>
      </div>
    */}
      </div>
      <div className="carousel-item">
        <img src={Landing} className="d-block w-100" alt="Manga 2" />
        {/* 
      <div class="carousel-caption d-none d-md-block">
          <h5>Manga 2</h5>
          <p>Una descripción breve o enlace a la crítica</p>
      </div>
    */}
      </div>
      <div className="carousel-item">
        <img src="img/Landing3.png" className="d-block w-100" alt="Manga 3" />
        {/*
    <div class="carousel-caption d-none d-md-block">
        <h5>Manga 2</h5>
        <p>Una descripción breve o enlace a la crítica</p>
    </div>
  */}
      </div>
      {/* Más mangas */}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselMangasPopulares"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselMangasPopulares"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  {/*Sección mangas destacados*/}
  <div className="container mt-5">
    <h2 className="text-center mb-4">Mangas Destacados</h2>
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <img
            src="img/MierukoManga.webp"
            className="card-img-top"
            alt="Manga Critica"
          />
          <div className="card-body">
            <h5 className="card-title">Manga nuevo</h5>
            <p className="card-text">Mieruko ve fantasmas y así.</p>
            <a href="#" className="btn btn-primary">
              Criticar
            </a>
          </div>
        </div>
      </div>
      {/* Más mangas en tarjetas */}
    </div>
  </div>
  {/*Sección Lo Último de las obras publicadas*/}
  <section className="bg-dark text-white p-5 mt-5">
    <div className="container">
      <h2 className="text-center">Últimas Críticas Publicadas</h2>
      <ul className="list-unstyled">
        <li className="media my-4">
          <img
            src={Landing2}
            className="mr-3"
            alt="Manga critica"
            width={64}
          />
          <div className="media-body">
            <h5 className="mt-0 mb-1">Dan Da Dan: 7</h5>
            El nuevo tomo de Dandadan me encantó, Momo ayase y Okarun siguen
            pareciendo geniales.{" "}
            <a href="#" className="text-primary">
              Leer más
            </a>
          </div>
        </li>
        {/* Más críticas recientes */}
      </ul>
    </div>
  </section>
  {/*Sección de géneros*/}
  <section className="text-center p-5">
    <h2>Explora por Géneros</h2>
    <div className="btn-group" role="group">
      <a href="#" className="btn btn-secondary">
        Shonen
      </a>
      <a href="#" className="btn btn-secondary">
        Shojo
      </a>
      <a href="#" className="btn btn-secondary">
        Seinen
      </a>
      <a href="#" className="btn btn-secondary">
        Furry
      </a>
      <a href="#" className="btn btn-secondary">
        BL/GL
      </a>
      {/* Más géneros */}
    </div>
  </section>
  {/*Reseñas de usuarios*/}
  <section className="p-5 bg-light">
    <div className="container">
      <h2 className="text-center mb-4">Lo que dicen nuestros usuarios</h2>
      <div className="row">
        <div className="col-md-4">
          <blockquote className="blockquote">
            <p>
              "MangaCritics es mi lugar favorito para descubrir mangas nuevos,
              sus reseñas son de alta calidad."
            </p>
            <footer className="blockquote-footer">Nicolas Maduro</footer>
          </blockquote>
        </div>
        {/* Más testimonios */}
      </div>
    </div>
  </section>
</>



    );
  };
  
  export default Home;