import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Incoming = () => {
  const [mangas, setMangas] = useState([]);

  const userLogged = Cookies.get('Username');

  if (userLogged === undefined) {
    alert("Debe iniciar sesión antes de continuar");
    window.location.replace('http://localhost:3000/login');
  }

  useEffect(() => {
    fetchUpcomingMangas();
  }, []);

  const fetchUpcomingMangas = async () => {
    try {
      const response = await axios.get('https://api.mangadex.org/manga?limit=9');     
       const mangasData = response.data.data;
      const mangasWithCovers = await fetchMangaCovers(mangasData);
      setMangas(mangasWithCovers);
    } catch (error) {
      console.error('Error fetching upcoming mangas:', error);
    }
  };

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

  return (
    <div className="container">
      <h1>Próximamente</h1>
      <div className="row">
        {mangas.map(manga => (
          <div className="col-md-4" key={manga.id}>
            <div className="card mb-4">
              <div className="card-body">
                {manga.coverUrl ? (
                  <img
                    className="img-fluid rounded mb-4"
                    loading="lazy"
                    src={manga.coverUrl}
                    width={245}
                    height={80}
                    alt={`Cover of ${manga.attributes.title.en || manga.attributes.title.jp}`}
                  />
                ) : (
                  <p>No cover image available</p>
                )}
                <h5 className="card-title">{manga.attributes.title.en || manga.attributes.title.jp || 'Título desconocido'}</h5>
                <p className="card-text">Género: {manga.attributes.tags.map(tag => tag.attributes.name.en).join(', ')}</p>
                <p className="card-text">Fecha de estreno: {new Date(manga.attributes.publishAt).toLocaleDateString()}</p>
                <Link to={`/Selector/${manga.id}`} className="btn btn-primary">Leer</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Incoming;
