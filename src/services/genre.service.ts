import axios from 'axios';
import NodeCache from 'node-cache';

const genreCache = new NodeCache();

const getGenres = async (): Promise<Genre[]> => {
  const genre = genreCache.get<Genres>('genre');

  if (genre) {
    return genre.genres;
  } else {
    const { data } = await axios.get<Genres>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`,
    );

    genreCache.set('genre', data);
    return data.genres;
  }
};

export { getGenres };
