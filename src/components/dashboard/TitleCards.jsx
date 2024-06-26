import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const TitleCards = ({ title, category, userId }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [myList, setMyList] = useState([]);

  const scrollLeft = () => {
    cardsRef.current.scrollBy({
      top: 0,
      left: -300,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmE4MGY2MWU0NmYxYzU0YTYwYTM5ODM4NTk4OWJjMiIsInN1YiI6IjY2NWExNDNhZGM4ZWZlZTQ2NzFkNThiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dwJzEHJaJqEsKdqY_2OJHevY-VyvSEGYoBt0Q3NaSfM'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results) {
          setApiData(response.results);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(err => console.error('API fetch error:', err));
  }, [category]);

  useEffect(() => {
    axios.get(`http://localhost:7001/api/user/list/${userId}`)
      .then(response => {
        setMyList(response.data);
      })
      .catch(error => console.error('Error fetching my list:', error));
  }, [userId]);

  const fetchTrailer = (movieId) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmE4MGY2MWU0NmYxYzU0YTYwYTM5ODM4NTk4OWJjMiIsInN1YiI6IjY2NWExNDNhZGM4ZWZlZTQ2NzFkNThiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dwJzEHJaJqEsKdqY_2OJHevY-VyvSEGYoBt0Q3NaSfM'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          const youtubeId = response.results.find(video => video.site === 'YouTube').key;
          setTrailerKey(youtubeId);
        } else {
          console.error('No trailer found for this movie');
        }
      })
      .catch(err => console.error('Failed to fetch trailer:', err));
  };

  const handlePlayTrailer = (movieId) => {
    fetchTrailer(movieId);
  };

  const handleCloseTrailer = () => {
    setTrailerKey(null);
  };

  const handleAddToList = (movieData) => {
    const moviePayload = {
      userId,
      movieId: movieData.id,
      title: movieData.original_title,
      posterUrl: movieData.backdrop_path,
    };

    axios.post('http://localhost:7001/api/user/add', moviePayload)
     .then(response => {
        console.log(response.data);
        setMyList([...myList, moviePayload]);
      })
     .catch(error => {
        console.error('Error adding movie to list:', error);
      });
  };

  return (
    <div className="m-5 relative">
      <h2 className="text-2xl font-bold mb-4">{title? title : "Popular on Netflix"}</h2>
      <div className="flex items-center relative">
        <button
          className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 cursor-pointer z-10 rounded-full left-2 hover:bg-opacity-80"
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <div className="flex overflow-x-hidden py-5 scroll-smooth w-full" ref={cardsRef}>
          {apiData.map((card, index) => (
            <div
              key={index}
              className="relative mr-4 transition-transform duration-300 transform hover:scale-105 flex-shrink-0"
              style={{ objectFit: 'contain', borderRadius: '10px', maxWidth: 'auto', width: '180px', height: '250px' }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                alt={card.original_title}
                onClick={() => handlePlayTrailer(card.id)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 rounded-lg hover:opacity-100">
                <p className="text-white text-lg mb-2 text-center px-2">{card.original_title}</p>
                <div className="flex gap-2">
                  <button onClick={() => handlePlayTrailer(card.id)} className="px-4 py-2 bg-red-600 text-white rounded">Play</button>
                  <button onClick={() => handleAddToList(card)} className="px-4 py-2 bg-gray-800 text-white rounded">Add to List</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 cursor-pointer z-10 rounded-full right-2 hover:bg-opacity-80"
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
      {trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleCloseTrailer}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="z-50"
          ></iframe>
        </div>
      )}
      {/* <h2 className="text-2xl font-bold mt-8 mb-4">My List</h2> */}
      <div className="flex overflow-x-scroll py-5 scroll-smooth w-full">
        {myList.map((movie, index) => (
          <div
            key={index}
            className="relative mr-4 transition-transform duration-300 transform hover:scale-105 flex-shrink-0"
            style={{ objectFit: 'contain', borderRadius: '10px', maxWidth: 'auto', width: '180px', height: '250px' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 rounded-lg hover:opacity-100">
              <p className="text-white text-lg mb-2 text-center px-2">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
