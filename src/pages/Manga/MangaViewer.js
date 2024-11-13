import React, { useState } from 'react';
import Cookies from 'js-cookie';


const MangaViewer = () => {

  const userLogged = Cookies.get('Username');

  if (userLogged === undefined){
    alert("Debe iniciar sesion antes de continuar");
    window.location.replace('http://localhost:3000/login')
  }
  

  const [comments, setComments] = useState([]);
  const comicImages = [
    '../Mangaimg/1.jpg',
    '../Mangaimg/2.jpg',
    '../Mangaimg/3.jpg',
    // ... Agrega más URLs aquí
  ];

  return (
    <div className="comic-cascade">
      {comicImages.map((url, index) => (
        <div key={index} className="comic-card">
          <img src={url} alt={`Cómic ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default MangaViewer;
