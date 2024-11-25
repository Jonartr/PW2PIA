import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './MangaViewer.css'; // Importar archivo CSS

const MangaViewer = () => {
  const [images, setImages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const userLogged = Cookies.get('Username');

  if (userLogged === undefined){
    alert("Debe iniciar sesión antes de continuar");
    window.location.replace('http://localhost:3000/login');
  }

  useEffect(() => {
    fetchChapterImages();
    fetchChaptersList();
  }, [chapterId]);

  const fetchChapterImages = () => {
    axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`)
      .then(response => {
        const baseUrl = response.data.baseUrl;
        const chapterData = response.data.chapter;
        const pageUrls = chapterData.data.map(page => `${baseUrl}/data/${chapterData.hash}/${page}`);
        setImages(pageUrls);
      })
      .catch(error => {
        console.error('Error fetching chapter images:', error);
      });
  };

  const fetchChaptersList = () => {
    axios.get(`https://api.mangadex.org/manga/${chapterId}/aggregate`)
      .then(response => {
        const chaptersData = response.data.volumes.flatMap(volume => Object.values(volume.chapters));
        setChapters(chaptersData);
      })
      .catch(error => {
        console.error('Error fetching chapters list:', error);
      });
  };

  const getNextChapterId = () => {
    const currentIndex = chapters.findIndex(chapter => chapter.id === chapterId);
    if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
      return chapters[currentIndex + 1].id;
    }
    return null;
  };

  const getPrevChapterId = () => {
    const currentIndex = chapters.findIndex(chapter => chapter.id === chapterId);
    if (currentIndex > 0) {
      return chapters[currentIndex - 1].id;
    }
    return null;
  };

  const nextChapterId = getNextChapterId();
  const prevChapterId = getPrevChapterId();

  return (
    <div className="comic-cascade">
      {images.map((url, index) => (
        <div key={index} className="comic-card">
          <img src={url} alt={`Cómic ${index + 1}`} className="comic-image" />
        </div>
      ))}
      <div className="navigation-buttons">
        {prevChapterId && (
          <button onClick={() => navigate(`/MangaViewer/${prevChapterId}`)} className="btn btn-primary">
            Capítulo Anterior
          </button>
        )}
        {nextChapterId && (
          <button onClick={() => navigate(`/MangaViewer/${nextChapterId}`)} className="btn btn-primary">
            Capítulo Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default MangaViewer;
