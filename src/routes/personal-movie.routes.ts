import express from 'express';

import { validate } from '../commons/index';
import personalMovieRules from '../validators/movie.validator';
import savePersonalMovie from '../controllers/personal-movie.controller';
import { authenticate } from '../services/security.service';

const router = express.Router();

router.route('/').post(authenticate, validate(personalMovieRules), savePersonalMovie);

export default router;
