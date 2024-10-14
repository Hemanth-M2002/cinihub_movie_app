import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from './constants';

const store = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [email, setEmail] = useState(''); // User email state for liked movies

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      setGenres(genres);
    };

    fetchGenres();
  }, []);

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      const { data: { results } } = await axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
      const moviesArray = createArrayFromRawData(results, genres);
      setMovies(moviesArray);
    };

    fetchMovies();
  }, [genres]);

  const createArrayFromRawData = (array, genres) => {
    return array.map((movie) => {
      const movieGenres = movie.genre_ids.map((genreId) => {
        const genre = genres.find(({ id }) => id === genreId);
        return genre ? genre.name : null;
      }).filter(Boolean);

      return {
        id: movie.id,
        name: movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      };
    });
  };

  // Fetch user's liked movies
  const fetchLikedMovies = async () => {
    const { data: { movies } } = await axios.get(`http://localhost:3001/api/user/liked/${email}`);
    setMovies(movies);
  };

  // Add movie to liked movies
  const addToLikedMovies = async (movie) => {
    const moviePayload = {
      email,
      data: movie
    };

    axios.post('http://localhost:3001/api/user/add', moviePayload)
      .then(response => {
        console.log(response.data);
        fetchLikedMovies();
      })
      .catch(error => {
        console.error('Error adding movie to list:', error);
      });
  };

  // Remove movie from liked movies
  const removeFromLikedMovies = async (movieId) => {
    axios.put('http://localhost:3001/api/user/remove', { email, movieId })
      .then(response => {
        console.log(response.data);
        fetchLikedMovies();
      })
      .catch(error => {
        console.error('Error removing movie from list:', error);
      });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <button onClick={fetchLikedMovies}>Fetch Liked Movies</button>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.name}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.name} />
            <p>{movie.genres.join(', ')}</p>
            <button onClick={() => addToLikedMovies(movie)}>Add to Liked</button>
            <button onClick={() => removeFromLikedMovies(movie.id)}>Remove from Liked</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default store;
