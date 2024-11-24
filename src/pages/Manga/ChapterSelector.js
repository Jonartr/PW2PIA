import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const SelectorChapter = () => {
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState('asc'); // 'asc' para más antiguo primero, 'desc' para más nuevo primero
  const { mangaId } = useParams();
  const userLogged = Cookies.get('Username');
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');

  if (userLogged === undefined) {
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

    fetchComments(order);
  }, [mangaId, order]);

  const fetchComments = async (order) => {
    try {
      const response = await axios.get(`http://localhost:3001/Comment?idmanga=${mangaId}&order=${order}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/Comment', {
        nombre: userLogged,
        comentario: comentario,
        idmanga: mangaId
      });
      if (response.data.status) {
        alert('Comentario realizado');
        fetchComments(order);
      }
    } catch (error) {
      console.error('Error enviando el comentario:', error);
    }
  };

  const toggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

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
        <button className="btn btn-secondary mb-4" onClick={toggleOrder}>
          Ordenar por {order === 'asc' ? 'más reciente' : 'más antiguo'}
        </button>
        <div className="list-group mb-4">
          {comments.map(comment => (
            <div key={comment.idcomment} className="list-group-item">
              <h5>{comment.iduser}</h5>
              <p>{comment.message}</p>
              <small>{new Date(comment.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 htmlFor="nombreUsuario">{userLogged}</h2>
           
          </div>
          <div className="form-group">
            <label htmlFor="comentarioUsuario">Comentario</label>
            <textarea
              className="form-control"
              id="comentarioUsuario"
              rows={3}
              placeholder="Escribe tu comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
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
