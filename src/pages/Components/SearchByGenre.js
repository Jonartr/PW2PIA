import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ByGenre = () => {
    const [mangas, setMangas] = useState([]);
    const [genre, setGenre] = useState('');

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const genreParam = query.get('genre');

    useEffect(() => {
        if (genreParam) {
            setGenre(genreParam);
            fetchMangasByGenre(genreParam);
        }
    }, [genreParam]);

    const fetchMangasByGenre = async (genre) => {
        try {
            // Aquí usa el ID del género en lugar del nombre
            const genreId = getGenreId(genre);
            const response = await axios.get(`https://api.mangadex.org/manga/`,genreParam);
            const mangasData = response.data.data;
            setMangas(mangasData);
        } catch (error) {
            console.error('Error fetching mangas:', error);
        }
    };

    const getGenreId = (genreName) => {
        const genreMapping = {
            'Shonen': '0f26cc22-20ec-4f5c-a419-3d37f1c4a538', // Ejemplo de ID de género
            'Shojo': 'f8f3e2f0-d3a3-41cc-bb9e-50bf6f50f35e',  // Usa los IDs correctos de la API de MangaDex
            // Añade aquí los demás géneros y sus IDs correspondientes
        };
        return genreMapping[genreName] || '';
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Mangas en el género: {genre}</h1>
            <div className="list-group">
        {mangas.map(manga => {
          const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${manga.attributes.cover_art?.fileName}.256.jpg`; // URL de la carátula
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
}

export default ByGenre;
