import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Modal, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const SearchResults = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = '32a80f61e46f1c54a60a398385989bc2';
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
          const data = await response.json();
          if (response.ok) {
            setMovies(data.results);
          } else {
            setError(data.status_message || 'Unknown error');
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
    try {
      const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);
      const videoData = await videoResponse.json();
      const videoKey = videoData.results.find((video) => video.type === 'Trailer')?.key;
      if (videoKey) {
        setVideoKey(videoKey);
        setTrailerPlaying(true);
      } else {
        setError('Trailer not available');
      }
    } catch (error) {
      setError('Failed to fetch trailer');
    }
  };

  const handleTrailerClose = () => {
    setTrailerPlaying(false);
  };

  return (
    <div style={{ padding: '16px' }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card onClick={() => handleMovieClick(movie)}>
              <CardMedia
                component="img"
                alt={movie.title}
                height="500"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                title={movie.title}
                style={{ cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography color="textSecondary">Year: {movie.release_date}</Typography>
                <Typography color="textSecondary">IMDb ID: {movie.id}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={trailerPlaying} onClose={handleTrailerClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handleTrailerClose}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            title="Movie Trailer"
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videoKey}`}
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      </Modal>
    </div>
  );
};

export default SearchResults;
