import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ByName = () => {
  const [mangas, setMangas] = useState([]);
  const [name, setName] = useState('');

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const nameParam = query.get('name');

  useEffect(() => {
    if (nameParam) {
      setName(nameParam);
      fetchMangasByName(nameParam);
    }
  }, [nameParam]);

  const fetchMangasByName = async (name) => {
    try {
      const response = await axios.get(`https://api.mangadex.org/manga?title=${name}`);
      if (response.data.data.length === 0) {
        // Si no hay coincidencias exactas, buscar coincidencias parciales
        const partialResponse = await axios.get(`https://api.mangadex.org/manga?titleContains=${name}`);
        const mangasWithCovers = await fetchMangaCovers(partialResponse.data.data);
        setMangas(mangasWithCovers);
      } else {
        const mangasWithCovers = await fetchMangaCovers(response.data.data);
        setMangas(mangasWithCovers);
      }
    } catch (error) {
      console.error('Error fetching mangas:', error);
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
    <div className="container mt-5">
      <h1 className="mb-4">Resultados de búsqueda para: {name}</h1>
      <div className="list-group">
        {mangas.map(manga => {
          const coverUrl = manga.coverUrl || 'URL_DE_IMAGEN_POR_DEFECTO';
          return (
            <div key={manga.id} className="list-group-item d-flex align-items-center">
              <img src={coverUrl} alt={manga.attributes.title.en || manga.attributes.title.jp} className="img-thumbnail me-3" style={{ width: '100px', height: '150px' }} />
              <div>
                <h5>{manga.attributes.title.en || manga.attributes.title.jp || 'Sin título'}</h5>
                <p>{manga.attributes.description.en || 'Sin descripción'}</p>
                <a href={`/Selector/${manga.id}`} className="btn btn-primary">Leer</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ByName;
