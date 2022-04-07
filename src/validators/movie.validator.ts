import { body } from 'express-validator';

const personalMoviesRules = [
  body('movieId').isInt().isNumeric(),
  body('title').not().isEmpty(),
  body('releaseDate').isDate(),
];

export default personalMoviesRules;
