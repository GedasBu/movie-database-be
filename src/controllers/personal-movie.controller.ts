import express from 'express';
import * as movieService from '../services/movie.service';

const savePersonalMovie = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const movie: Movie = {
      ...req.body,
      email: req.body.currentUserEmail,
    };
    res.json(await movieService.personalMovies(movie));
  } catch (err) {
    next(err);
  }
};

export default savePersonalMovie;
