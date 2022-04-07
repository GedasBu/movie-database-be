export const mockedTMDBResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/k2SY15W9QXH9qL8f4a4BbytV1BE.jpg',
      genre_ids: [28, 27, 53],
      id: 614696,
      original_language: 'ko',
      original_title: '#살아있다',
      overview:
        'As a grisly virus rampages a city, a lone man stays locked inside his apartment, digitally cut off from seeking help and desperate to find a way out.',
      popularity: 26.623,
      poster_path: '/zqf711LsnQ5CcW3rISFw2t7OYzb.jpg',
      release_date: '2020-06-24',
      title: '#Alive',
      video: false,
      vote_average: 7.3,
      vote_count: 1191,
    },
    {
      adult: false,
      backdrop_path: '/etBZfuOie3uODTKTV5xnbAKB4Fr.jpg',
      genre_ids: [35, 18, 10749],
      id: 19913,
      original_language: 'en',
      original_title: '(500) Days of Summer',
      overview:
        'Tom, greeting-card writer and hopeless romantic, is caught completely off-guard when his girlfriend, Summer, suddenly dumps him. He reflects on their 500 days together to try to figure out where their love affair went sour, and in doing so, Tom rediscovers his true passions in life.',
      popularity: 63.162,
      poster_path: '/f9mbM0YMLpYemcWx6o2WeiYQLDP.jpg',
      release_date: '2009-07-17',
      title: '(500) Days of Summer',
      video: false,
      vote_average: 7.3,
      vote_count: 8156,
    },
  ],
  total_pages: 166,
};

export const expectedResult = {
  page: 1,
  movies: [
    {
      movieId: 614696,
      title: '#Alive',
      releaseDate: '2020-06-24',
      backdropPath: 'https://image.tmdb.org/t/p/w500/k2SY15W9QXH9qL8f4a4BbytV1BE.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/zqf711LsnQ5CcW3rISFw2t7OYzb.jpg',
      voteAverage: 7.3,
    },
    {
      movieId: 19913,
      title: '(500) Days of Summer',
      releaseDate: '2009-07-17',
      backdropPath: 'https://image.tmdb.org/t/p/w500/etBZfuOie3uODTKTV5xnbAKB4Fr.jpg',
      posterPath: 'https://image.tmdb.org/t/p/w500/f9mbM0YMLpYemcWx6o2WeiYQLDP.jpg',
      voteAverage: 7.3,
    },
  ],
  totalPages: 166,
};
