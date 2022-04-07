import axios from 'axios';
import { convertToMovie, convertToMovieDetails } from '../converters/movie.converter';
import NodeCache from 'node-cache';
import { MovieModel } from '../models/movie';

const moviesCache = new NodeCache();

const getTmdbMovies = async (page: number, genres = '', sort = 'original_title.asc'): Promise<Movies> => {
  const { data } = await axios.get<TmdbMovies>(
    `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&with_genres=${genres}&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
  );
  const results = {
    page: data.page,
    movies: data.results.map(convertToMovie),
    totalPages: data.total_pages,
  };
  return results;
};

const getMoviesByTitle = async (page: number, title: string): Promise<Movies> => {
  const { data } = await axios.get<TmdbMovies>(
    `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${process.env.API_KEY}`,
  );

  const results = {
    page: data.page,
    movies: data.results.map(convertToMovie),
    totalPages: data.total_pages,
  };
  return results;
};

const getMovies = async (page: number): Promise<Movies> => {
  const movies = moviesCache.get<Movies>(`page-${page}`);

  if (movies) {
    return movies;
  } else {
    const { data } = await axios.get<TmdbMovies>(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&vote_count.gte=1000&api_key=${process.env.API_KEY}`,
    );

    const results = {
      page: data.page,
      movies: data.results.map(convertToMovie),
      totalPages: data.total_pages,
    };

    moviesCache.set(`page-${page}`, results);
    return results;
  }
};

const getMovie = async (movieId: number): Promise<MovieDetails> => {
  const movieDetails = moviesCache.get<MovieDetails>(movieId);

  if (movieDetails) {
    return movieDetails;
  } else {
    const { data } = await axios.get<TmdbMovieDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`,
    );

    const results = convertToMovieDetails(data);

    moviesCache.set(movieId, results);

    return results;
  }
};

const personalMovies = async (movie: Movie): Promise<void> => {
  await new MovieModel(movie).save();
  return;
};

export { getMovies, getMovie, getMoviesByTitle, getTmdbMovies, personalMovies };
