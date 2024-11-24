import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Landing from './img/Landing2.png';
import Landing2 from './img/MangaDDD.jpg';
import Landing3 from './img/Landing3.jpg';
import Manga1 from './img/MierukoManga.webp'

const Home = () => {

  const [mangas, setMangas] = useState([]);
  const [covers, setCovers] = useState([]);


  useEffect(() => {

    axios.get('https://api.mangadex.org/manga')
      .then(response => {
        const mangasData = response.data.data;
        setMangas(mangasData);

        const coverRequests = mangasData.map(manga =>
          axios.get(`https://api.mangadex.org/cover?manga[]=${manga.id}`)
        );

        return Promise.all(coverRequests);
      })
      .then(responses => {
        const coversData = responses.flatMap(response => response.data.data);
        setCovers(coversData);
      })
      .catch(error => {
        console.error('Error fetching mangas or covers:', error);
      });
  }, []);

  const getCoverImageUrl = (cover) => {
    if (!cover?.attributes?.fileName || !cover.relationships[0]?.id) return '';
    return `https://uploads.mangadex.org/covers/${cover.relationships[0].id}/${cover.attributes.fileName}`;
  };

  const MangaFirst = mangas[0];
  const MangaSecond = mangas[1];
  const allManga = mangas;
  console.log(MangaSecond);

  const firstCover = covers[0];
  const firstCoverImageUrl = firstCover ? getCoverImageUrl(firstCover) : '';
  const firstManga = firstCover ? mangas.find(manga => manga.id === firstCover.relationships[0].id) : null;
  const firstMangaTitle = firstManga?.attributes?.title?.en ?? 'Título desconocido';


  const secondCover = covers[10];
  const secondCoverImageUrl = secondCover ? getCoverImageUrl(secondCover) : '';
  const secondManga = secondCover ? mangas.find(manga => manga.id === secondCover.relationships[0].id) : null;
  const secondMangaTitle = secondManga?.attributes?.title?.en ?? 'Título desconocido';



  console.log(firstCoverImageUrl);
  console.log(secondCoverImageUrl);


  return (
    <>
      {/* {console.log(mangas[0])} {covers[0] ? (console.log(covers[0])):(console.log("no carga"))} */}
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
            <img src={Landing2} className="d-block w-100" alt="Manga 2" />
            {/* 
      <div class="carousel-caption d-none d-md-block">
          <h5>Manga 2</h5>
          <p>Una descripción breve o enlace a la crítica</p>
      </div>
    */}
          </div>
          <div className="carousel-item">
            <img src={Landing3} className="d-block w-100" alt="Manga 3" />
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
        <div className="row col">
          {firstCover && (
            <div className="col-md-4">
              <div className="card">
                {firstCoverImageUrl ? (
                  <img
                    src={firstCoverImageUrl}
                    className="card-img-top"
                    alt={`Cover of ${firstMangaTitle}`}
                  />
                ) : (
                  <p>No cover image available</p> // Mensaje en caso de que no haya imagen
                )}
                <div className="card-body">
                  <h5 className="card-title">{firstMangaTitle}</h5>
                  <p className="card-text">{MangaFirst.attributes.description.en || 'No hay descripción disponible.'}</p>
                  <Link to={`/Selector/${firstCover.relationships[0].id}`} className="btn btn-primary"> Leer </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          {secondCover && (
            <div className="col-md-4">
              <div className="card">
                {secondCoverImageUrl ? (
                  <img
                    src={secondCoverImageUrl}
                    className="card-img-top"
                    alt={`Cover of ${secondMangaTitle}`}
                  />
                ) : (
                  <p>No cover image available</p> // Mensaje en caso de que no haya imagen
                )}
                <div className="card-body">
                  <h5 className="card-title">{secondMangaTitle}</h5>
                  <p className="card-text">{MangaSecond.attributes.description.en || 'No hay descripción disponible.'}</p>
                  <Link to={`/Selector/${secondCover.relationships[0].id}`} className="btn btn-primary"> Leer </Link>
                </div>
              </div>
            </div>
          )}
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
                width={256}
              />
              <div className="media-body">
                <h5 className="mt-0 mb-1">DanDaDan volumen#7</h5>
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
          <Link to="/ByGenre?genre=Action" className="btn btn-secondary">
            Acción
          </Link>
          <Link to="/ByGenre?genre=Romance" className="btn btn-secondary">
            Romance
          </Link>
          <Link to="/ByGenre?genre=Slice of Life" className="btn btn-secondary">
            Slice of Life
          </Link>
          <Link to="/ByGenre?genre=Thriller" className="btn btn-secondary">
          Thriller
          </Link>
          <Link to="/ByGenre?genre=Sports" className="btn btn-secondary">
            Deportes
          </Link>
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
                  Nicolas Maduro
                </p>
                <footer className="blockquote-footer"></footer>
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