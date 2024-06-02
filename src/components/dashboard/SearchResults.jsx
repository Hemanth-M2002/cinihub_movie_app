import React, { useState, useEffect } from 'react';
import Loader from '../dashboard/Loader';
// import TitleCards from '../dashboard/TitleCards';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = 'a1ecd6f68859fca8868d03b1624ba92d';
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
          const data = await response.json();
          if (data.results) {
            setMovies(data.results);
          } else {
            setError(data.status_message);
          }
        } catch (error) {
          setError('Failed to fetch movies');
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    } else {
      navigate('/dashboard');
    }
  }, [query, navigate, apiKey]);

  const handleMovieClick = async (movie) => {
    const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);
    const videoData = await videoResponse.json();
    const videoKey = videoData.results.find((video) => video.type === 'Trailer').key;
    setVideoKey(videoKey);
    setTrailerPlaying(true);
  };

  const handleTrailerClose = () => {
    setTrailerPlaying(false);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded shadow-md p-4">
            <div
              className="relative"
              onMouseEnter={() => {
                // Show movie details on hover
                document.getElementById(`movie-details-${movie.id}`).style.display = 'block';
              }}
              onMouseLeave={() => {
                // Hide movie details on hover out
                document.getElementById(`movie-details-${movie.id}`).style.display = 'none';
              }}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded hover:opacity-50 transition duration-300 ease-in-out"
              />
              <div
                id={`movie-details-${movie.id}`}
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 p-4 text-white hidden"
              >
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <p className="text-gray-300">Year: {movie.release_date}</p>
                <p className="text-gray-300">Type: {movie.media_type}</p>
                <p className="text-gray-300">IMDb ID: {movie.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {trailerPlaying && (

<div

  className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center"

  onClick={handleTrailerClose}

>

  <div className="relative max-w-md mx-auto">

    <iframe

      title="Movie Trailer"

      width="800" // increased width

      height="450" // increased height

      src={`https://www.youtube.com/embed/${videoKey}`}

      frameBorder="0"

      allowFullScreen

    />

    {/* <button

      className="absolute top-0 right-0 p-2 text-white bg-red-500 hover:bg-red-700 rounded"

      onClick={handleTrailerClose}

    >

      

    </button> */}

  </div>

</div>
      )}
    </div>
  );
};

export default SearchResults