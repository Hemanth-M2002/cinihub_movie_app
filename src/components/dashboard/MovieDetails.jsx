import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from '../dashboard/Footer';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '32a80f61e46f1c54a60a398385989bc2'; // Replace with your TMDB API key
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`);
        setMovieData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movie details: {error.message}</div>;
  }

  return (
    <div className='movie-details'>
      {movieData && (
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{movieData.title}</h1>
          <p className="text-lg mb-4">{movieData.overview}</p>
          <div className="mb-4">
            <strong>Release Date:</strong> {movieData.release_date}
          </div>
          <div className="mb-4">
            <strong>Rating:</strong> {movieData.vote_average}
          </div>
          <div className="mb-4">
            <strong>Genres:</strong> {movieData.genres.map(genre => genre.name).join(', ')}
          </div>
          <div className="mb-4">
            <strong>Runtime:</strong> {movieData.runtime} minutes
          </div>
          {movieData.videos && movieData.videos.results && movieData.videos.results.length > 0 && (
            <iframe 
              src={`https://www.youtube.com/embed/${movieData.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')?.key}`} 
              className='w-full h-96 object-cover mb-4' 
              allow="autoplay; encrypted-media" 
              frameBorder="0" 
              allowFullScreen
              title="Movie Trailer"
            />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MovieDetails;
