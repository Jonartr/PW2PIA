import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const SelectorChapter = () => {
  const [chapters, setChapters] = useState([]);
  const { mangaId } = useParams();

  const userLogged = Cookies.get('Username');
  
  if (userLogged === undefined){
    alert("Debe iniciar sesión antes de continuar");
    window.location.replace('http://localhost:3000/login');
  }

  useEffect(() => {
    axios.get(`https://api.mangadex.org/chapter?manga=${mangaId}`)
      .then(response => {
        const chaptersData = response.data.data;
        setChapters(chaptersData);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, [mangaId]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Seleccionar Capítulo</h1>
        <div className="list-group mb-4">
          {chapters.map(chapter => (
            <Link 
              key={chapter.id} 
              to={`/Viewer/${chapter.id}`} 
              className="list-group-item list-group-item-action"
            >
              {chapter.attributes.title || `Capítulo ${chapter.attributes.chapter}`}
            </Link>
          ))}
        </div>
        <h2 className="mb-4">Comentarios</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombreUsuario"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comentarioUsuario">Comentario</label>
            <textarea
              className="form-control"
              id="comentarioUsuario"
              rows={3}
              placeholder="Escribe tu comentario"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default SelectorChapter;
