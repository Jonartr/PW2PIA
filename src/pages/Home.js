import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Landing from './img/Landing2.png';
import Landing2 from './img/MangaDDD.jpg';
import Landing3 from './img/Landing3.jpg';

const Home = () => {
  const [mangas, setMangas] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Función para obtener portadas de los mangas
    const fetchMangaCovers = async (mangasData) => {
      const coverRequests = mangasData.map(manga =>
        axios.get(`https://api.mangadex.org/cover?manga[]=${manga.id}`)
      );
      const coverResponses = await Promise.all(coverRequests);
      return coverResponses.map((res, index) => ({
        ...mangasData[index],
        coverUrl: res.data.data[0]?.attributes?.fileName
          ? `https://uploads.mangadex.org/covers/${mangasData[index].id}/${res.data.data[0].attributes.fileName}`
          : null
      }));
    };

    // Función para obtener mangas y sus portadas
    const fetchMangas = async () => {
      try {
        const response = await axios.get('https://api.mangadex.org/manga?limit=6');
        const mangasData = response.data.data;
        const mangasWithCovers = await fetchMangaCovers(mangasData);
        setMangas(mangasWithCovers);
      } catch (error) {
        console.error('Error fetching mangas or covers:', error);
      }
    };

    // Obtener mangas y comentarios al cargar el componente
    fetchMangas();
    fetchLatestComments();
  }, []);

  // Función para obtener los últimos comentarios
  const fetchLatestComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/latestComment');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching latest comments:', error);
    }
  };

  return (
    <>
      {/* Carousel */}
      <div id="carouselMangasPopulares" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Landing} className="d-block w-100" alt="Manga 1" />
          </div>
          <div className="carousel-item">
            <img src={Landing2} className="d-block w-100" alt="Manga 2" />
          </div>
          <div className="carousel-item">
            <img src={Landing3} className="d-block w-100" alt="Manga 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselMangasPopulares" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselMangasPopulares" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mangas Destacados */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Si te animas a leerlo</h2>
        <div className="row">
          {mangas.slice(0, 6).map((manga) => (
            <div className="col-md-4" key={manga.id}>
              <div className="card">
                {manga.coverUrl ? (
                  <img src={manga.coverUrl} className="card-img-top" alt={`Cover of ${manga.attributes.title.en || manga.attributes.title.jp}`} />
                ) : (
                  <p>No cover image available</p>
                )}
                <div className="card-body">
                  <h5 className="card-title">{manga.attributes.title.en || manga.attributes.title.jp || 'Título desconocido'}</h5>
                  <p className="card-text">{manga.attributes.description.en || 'No hay descripción disponible.'}</p>
                  <Link to={`/Selector/${manga.id}`} className="btn btn-primary">Leer</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Últimas Críticas Publicadas */}
      <section className="bg-dark text-white p-5 mt-5">
        <div className="container">
          <h2 className="text-center">Últimas Críticas Publicadas</h2>
          <ul className="list-unstyled">
            {comments.map(comment => {
              const coverUrl = `https://uploads.mangadex.org/covers/${comment.idmanga}/${comment.coverArtFileName}.256.jpg`; 
              return (
                <li key={comment.idcomment} className="media my-4">
                 {/* {comment.coverUrl ? (
                  <img src={comment.coverUrl} className="card-img-top" alt={`Cover of ${comment.attributes.title.en || comment.attributes.title.jp}`} />
                ) : (
                  <p>No cover image available</p>
                )} */}
                  <div className="media-body">
                    <h5 className="mt-0 mb-1">Manga: {comment.mangaTitle}</h5>
                    <p>Comentario: {comment.message} </p>
                    <p>Calificación: {comment.rating} puntos de 5</p>
                    <Link to={`/Selector/${comment.idmanga}`} className="text-primary">Leer más</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>


      {/* Sección de géneros */}
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
        </div>
      </section>

      {/* Reseñas de usuarios */}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
