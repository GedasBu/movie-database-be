import axios from 'axios';
import httpStatus from 'http-status';
import supertest from 'supertest';

import app from '../../src/app';

jest.mock('axios');
const mockedAxios = axios.get as jest.Mock;

const mockedTMDBResponse = {
  page: 1,
  results: [
    {
      id: 524434,
      title: 'Eternals',
      release_date: '2021-11-03',
      backdrop_path: '/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
      poster_path: '/b6qUu00iIIkXX13szFy7d0CyNcg.jpg',
      vote_average: 7.2,
    },
    {
      id: 634649,
      title: 'Spider-Man: No Way Home',
      release_date: '2021-12-15',
      backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
      poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      vote_average: 8.4,
    },
  ],
  total_pages: 164,
};

const expectedResult = {
  page: 1,
  movies: [
    {
      movieId: 524434,
      title: 'Eternals',
      releaseDate: '2021-11-03',
      backdropPath: 'https://image.tmdb.org/t/p/w500/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/b6qUu00iIIkXX13szFy7d0CyNcg.jpg',
      voteAverage: 7.2,
    },
    {
      movieId: 634649,
      title: 'Spider-Man: No Way Home',
      releaseDate: '2021-12-15',
      backdropPath: 'https://image.tmdb.org/t/p/w500/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      voteAverage: 8.4,
    },
  ],
  totalPages: 164,
};

const mockedMovieDetailsTMDBresponse = {
  adult: false,
  backdrop_path: '/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
  belongs_to_collection: null,
  budget: 200000000,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
  ],
  homepage: 'https://www.marvel.com/movies/the-eternals',
  id: 524434,
  imdb_id: 'tt9032400',
  original_language: 'en',
  original_title: 'Eternals',
  overview:
    'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.',
  popularity: 5574.43,
  poster_path: '/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
  production_companies: [
    {
      id: 420,
      logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
      name: 'Marvel Studios',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2021-11-03',
  revenue: 402027582,
  runtime: 156,
  spoken_languages: [
    {
      english_name: 'Arabic',
      iso_639_1: 'ar',
      name: 'العربية',
    },
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
    {
      english_name: 'Hindi',
      iso_639_1: 'hi',
      name: 'हिन्दी',
    },
    {
      english_name: 'Latin',
      iso_639_1: 'la',
      name: 'Latin',
    },
    {
      english_name: 'Spanish',
      iso_639_1: 'es',
      name: 'Español',
    },
  ],
  status: 'Released',
  tagline: 'In the beginning...',
  title: 'Eternals',
  video: false,
  vote_average: 7.2,
  vote_count: 4075,
};

const expectedMovieDetailsResult = {
  movieId: 524434,
  title: 'Eternals',
  releaseDate: '2021-11-03',
  backdropPath: 'https://image.tmdb.org/t/p/original/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg',
  posterPath: 'https://image.tmdb.org/t/p/original/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
  voteAverage: 7.2,
  productionCompanies: [
    {
      id: 420,
      logoPath: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
      name: 'Marvel Studios',
      originCountry: 'US',
    },
  ],
  budget: 200000000,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
  ],
  homepage: 'https://www.marvel.com/movies/the-eternals',
  originalLanguage: 'en',
  originalTitle: 'Eternals',
  overview:
    'The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.',
  productionCountries: [
    {
      iso: 'US',
      name: 'United States of America',
    },
  ],
  revenue: 402027582,
  runtime: 156,
  spokenLanguages: [
    {
      englishName: 'Arabic',
      iso: 'ar',
      name: 'العربية',
    },
    {
      englishName: 'English',
      iso: 'en',
      name: 'English',
    },
    {
      englishName: 'Hindi',
      iso: 'hi',
      name: 'हिन्दी',
    },
    {
      englishName: 'Latin',
      iso: 'la',
      name: 'Latin',
    },
    {
      englishName: 'Spanish',
      iso: 'es',
      name: 'Español',
    },
  ],
  status: 'Released',
  tagline: 'In the beginning...',
  voteCount: 4075,
};

describe('Movies API', () => {
  const request = supertest(app);

  it('should return list of movies', (done) => {
    mockedAxios.mockResolvedValue({ data: mockedTMDBResponse });
    mockedAxios.mockClear();

    request
      .get('/movies')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual(expectedResult);
        expect(axios.get).toHaveBeenCalledTimes(1);

        request
          .get('/movies')
          .expect(httpStatus.OK)
          .then((res2) => {
            expect(res2.body).toEqual(expectedResult);
            expect(axios.get).toHaveBeenCalledTimes(1);

            request
              .get('/movies?title=F9')
              .expect(httpStatus.OK)
              .then((res3) => {
                expect(res3.body).toEqual(expectedResult);
                expect(axios.get).toHaveBeenCalledTimes(2);
                done();
              })
              .catch(done);
          })
          .catch(done);
      })
      .catch(done);
  });

  it('should return movie details', (done) => {
    mockedAxios.mockResolvedValue({ data: mockedMovieDetailsTMDBresponse });
    mockedAxios.mockClear();

    request
      .get('/movies/:id')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual(expectedMovieDetailsResult);
        expect(axios.get).toHaveBeenCalledTimes(1);

        request
          .get('/movies/:id')
          .expect(httpStatus.OK)
          .then((res2) => {
            expect(res2.body).toEqual(expectedMovieDetailsResult);
            expect(axios.get).toHaveBeenCalledTimes(1);
            done();
          });
      })
      .catch(done);
  });
});
