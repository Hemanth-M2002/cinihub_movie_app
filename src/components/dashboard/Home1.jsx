import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../dashboard/Navbar'; 
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import TitleCards from '../dashboard/TitleCards';
import Footer from '../dashboard/Footer';

const Home1 = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [movieId, setMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const apiKey = '32a80f61e46f1c54a60a398385989bc2'; // Replace with your TMDB API key

        // Fetch popular movies
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const movies = response.data.results;

        // Select a random movie
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${apiKey}`);
        const movieData = movieResponse.data;

        // Fetch movie videos
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${apiKey}`);
        const videoData = videoResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

        if (videoData) {
          setVideoUrl(`https://www.youtube.com/embed/${videoData.key}`);
        }

        setDescription(movieData.overview);
        setMovieId(randomMovie.id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching hero data:', error);
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home'>
      <Navbar />
      <div className="relative">
        {!isPlaying ? (
          <div>
            <iframe 
              src={videoUrl} 
              className='w-full h-screen object-cover' 
              allow="autoplay; encrypted-media" 
              frameBorder="0" 
              allowFullScreen
              title="Hero Video"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
              <div className="absolute bottom-0 w-full pl-6 pb-8">
                <p className='max-w-xl text-lg mb-5 text-white'>
                  {description}
                </p>
                <div className="flex gap-2 mb-12">
                  <button onClick={handlePlay} className='flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-md hover:bg-white/75'>
                    <img src={play} className="w-6" alt="Play Icon" /> Play
                  </button>
                  <button onClick={() => window.location.href = `/movie/${movieId}`} className='flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700'>
                    <img src={info} className="w-6" alt="Info Icon" /> More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
              <iframe 
                src={videoUrl} 
                className='w-full h-[80vh] object-cover' 
                allow="autoplay; encrypted-media" 
                frameBorder="0" 
                allowFullScreen
                title="Hero Video"
              />
              <button 
                onClick={handleClosePlayer} 
                className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      {!isPlaying && (
        <div className="pl-6">
          <TitleCards title="Blockbuster Movies" category="top_rated" />
          <TitleCards title="Only on Cinihub" category="popular" />
          <TitleCards title="Upcoming" category="upcoming" />
          <TitleCards title="Top Picks for You" category="now_playing" />
        </div>
      )}
      {!isPlaying && <Footer />}
    </div>
  );
}

export default Home1;
