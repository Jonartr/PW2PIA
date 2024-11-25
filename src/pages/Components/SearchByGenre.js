import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ByGenre = () => {
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState({});
    const [genre, setGenre] = useState('');

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const genreParam = query.get('genre');

    useEffect(() => {
        // Obtener la lista de géneros
        fetchGenres();
    }, []);

    useEffect(() => {
        if (genreParam) {
            setGenre(genreParam);
            fetchMangasByGenre(genreParam);
        }
    }, [genreParam, genres]);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('https://api.mangadex.org/manga/tag');
            const genresData = response.data.data;
            const genresMapping = {};
            genresData.forEach(genre => {
                genresMapping[genre.attributes.name.en] = genre.id;
            });
            setGenres(genresMapping);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const fetchMangasByGenre = async (genre) => {
        try {
            const genreId = genres[genre];
            if (!genreId) {
                console.error('Invalid genre:', genre);
                return;
            }
            const response = await axios.get(`https://api.mangadex.org/manga?includedTags[]=${genreId}`);
            const mangasData = response.data.data;
            const mangasWithCovers = await fetchMangaCovers(mangasData);
            setMangas(mangasWithCovers);
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
            <h1 className="mb-4">Mangas en el género: {genre}</h1>
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
}

export default ByGenre;
