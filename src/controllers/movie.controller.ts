import express from 'express';

import * as movieService from '../services/movie.service';
import { validate as titleValidator } from '../validators/title.validator';
import { validate as genreValidator } from '../validators/genre.validator';
import { validate as sortValidator } from '../validators/sort-option.validator';

const getPageNumber = (req: express.Request): number => (req.query.page ? parseInt(req.query.page as string) || 1 : 1);
const getTitle = (req: express.Request): string => (req.query.title ? (req.query.title as string) : '');
const getGenres = (req: express.Request): string => (req.query.genres ? (req.query.genres as string) : '');
const getSortValue = (req: express.Request): string => (req.query.sort ? (req.query.sort as string) : '');

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  const title = getTitle(req);
  const genres = getGenres(req);
  const sort = getSortValue(req);

  try {
    if (genres && genreValidator(genres) && !sort) {
      res.json(await movieService.getTmdbMovies(getPageNumber(req), genres));
    } else if (title && titleValidator(title)) {
      res.json(await movieService.getMoviesByTitle(getPageNumber(req), title));
    } else if (sort && sortValidator(sort) && genres && genreValidator(genres)) {
      res.json(await movieService.getTmdbMovies(getPageNumber(req), genres, sort));
    } else if (sort && sortValidator(sort)) {
      res.json(await movieService.getTmdbMovies(getPageNumber(req), sort));
    } else {
      res.json(await movieService.getMovies(getPageNumber(req)));
    }
  } catch (err) {
    next(err);
  }
};

const getMovie = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    res.json(await movieService.getMovie(parseInt(req.params.id)));
  } catch (err) {
    next(err);
  }
};

export { getMovies, getMovie };
