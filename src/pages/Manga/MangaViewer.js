import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const MangaViewer = () => {
  const [images, setImages] = useState([]);
  const { chapterId } = useParams();

  const userLogged = Cookies.get('Username');

  if (userLogged === undefined){
    alert("Debe iniciar sesión antes de continuar");
    window.location.replace('http://localhost:3000/login');
  }

  useEffect(() => {
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
  }, [chapterId]);

  return (
    <div className="comic-cascade">
      {images.map((url, index) => (
        <div key={index} className="comic-card">
          <img src={url} alt={`Cómic ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default MangaViewer;
